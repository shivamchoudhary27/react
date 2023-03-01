import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { getCalendarEvents } from "../../adapters";
import moment from "moment";
import events from "./events.js";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Header from "../header/";
import Sidebar from "../sidebar/";
import { Container } from "react-bootstrap";
import { getEventColor, initialColors} from "./utils";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState(events);

  useEffect(() => {
    //get all the enroled courses ids from localstorage
    const enroled_courses = JSON.parse(localStorage.getItem("enroled_courses"));
    
    let dataParam = '';
    Object.keys(enroled_courses).map((item, index) => {
      dataParam += `events[courseids][${item}]=${enroled_courses[index].id}&`;
    });

    const query = {
      wsfunction: 'core_calendar_get_calendar_events',
      dataParam
    };
    getCalendarEvents(query)
      .then(res => {
        if (res.status === 200 && res.data) {
          if (res.data.errorcode) {
            console.log('Something went wrong');
          } else {
            let calEvents = res.data.events;

            const colorConfig =
              (localStorage.getItem("event-colors") !== null)
                ? JSON.parse(localStorage.getItem("event-colors"))
                : JSON.parse(initialColors);

            calEvents.map((i, index) => {
              calEvents[index].title = calEvents[index].name;
              let timeStart = calEvents[index].timestart * 1000;
              let timeEnd = (calEvents[index].timestart + calEvents[index].timeduration) * 1000;
              calEvents[index].start = new Date(timeStart);
              calEvents[index].end = new Date(timeEnd);

              if (calEvents[index].modulename !== null) {
                calEvents[index].colorEvento = getEventColor(calEvents[index].modulename, colorConfig);
              } else {
                calEvents[index].colorEvento = getEventColor(calEvents[index].eventtype, colorConfig);
              }
            });
            setEventsData(calEvents);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");

    if (title)
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title
        }
      ]);
  };

  return (
    <>
      <Sidebar />
      <Header pageHeading="Calendar" welcomeIcon={false} />
      <Container fluid>
          <div style={{paddingLeft: '270px', marginTop: '70px'}}>
            <div>
              <Calendar
                views={["day", "agenda", "work_week", "month"]}
                selectable
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={eventsData}
                style={{ height: "100vh" }}
                BackgroundWrapper = "red"
                onSelectEvent={(event) => console.log(event)}
                // onSelectSlot={handleSelect}
                eventPropGetter={(myEventsList) => {
                  const backgroundColor = myEventsList.colorEvento ? myEventsList.colorEvento : 'blue';
                  const color = myEventsList.color ? myEventsList.color : 'white';
                  return { style: { backgroundColor ,color}}
                }}
              />
            </div>
          </div>
      </Container>
    </>
  );
}