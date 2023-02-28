import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { getData } from "../../adapters";
import moment from "moment";
import events from "./events.js";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Header from "../header/";
import Sidebar from "../sidebar/";
import { Container } from "react-bootstrap";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState(events);

  // useEffect(() => {
  //   const query = {
  //     wsfunction: 'core_calendar_get_calendar_events',
  //   };
  //   getData(query)
  //     .then(res => {
  //       if (res.status === 200 && res.data) {
  //         if (res.data.errorcode) {
  //           console.log('Something went wrong');
  //         } else {
  //           let calEvents = res.data.events;

  //           calEvents.map((i, index) => {
  //             calEvents[index].title = calEvents[index].name;
  //             let timeStart = calEvents[index].timestart * 1000;
  //             let timeEnd = (calEvents[index].timestart + calEvents[index].timeduration) * 1000;
  //             calEvents[index].start = new Date(timeStart);
  //             calEvents[index].end = new Date(timeEnd);
  //           });
  //           setEventsData(calEvents);
  //         }
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);

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
              onSelectEvent={(event) => console.log(event)}
              onSelectSlot={handleSelect}
            />
          </div>
        </div>
    </Container>
  </>
  );
}