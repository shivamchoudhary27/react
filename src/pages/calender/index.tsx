import "./style.scss";
import View from "./view";
import events from "./events.js";
import HeirarchyFilter from "./filters";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getCalendarEvents, getData } from "../../adapters";
import { getData as getCourses } from "../../adapters/microservices";
import { getEventColor, initialColors } from "./local/utils";

export default function ReactBigCalendar() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [eventsData, setEventsData] = useState(events);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const enroled_courses = JSON.parse(localStorage.getItem("enroled_courses"));
  const colorConfig =
    localStorage.getItem("event-colors") !== null
      ? JSON.parse(localStorage.getItem("event-colors"))
      : JSON.parse(initialColors);
  const [coursesList, setCoursesList] = useState<any>([]);
  const currentUserRole = useSelector(
    (state) => state.globalFilters.currentUserRole
  );

  useEffect(() => {
    let endPoint = `/${currentUserRole.id}/dashboard`;
    getCourses(endPoint, {})
      .then((result) => {
        if (result.data !== "" && result.status === 200) {
          setCoursesList(result.data.courses);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUserRole.id]);

  useEffect(() => {
    setFilteredEvents(eventsData);
  }, [eventsData]);

  useEffect(() => {
    let dataParam = "";
    coursesList.map((item, index) => {
      dataParam += `events[courseids][${index}]=${
        item.idNumber !== null ? item.idNumber : 0
      }&`;
    });

    // Object.keys(enroled_courses).map((item, index) => {
    //   console.log(item, enroled_courses[index].id)
    //   dataParam += `events[courseids][${item}]=${enroled_courses[index].id}&`;
    // });

    const query = {
      wsfunction: "core_calendar_get_calendar_events",
      dataParam,
    };
    getCalendarEvents(query)
      .then((res) => {
        if (res.status === 200 && res.data) {
          if (res.data.errorcode) {
            console.log("Something went wrong");
          } else {
            let calEvents = res.data.events;

            calEvents.map((i, index) => {
              calEvents[index].title = calEvents[index].name;
              calEvents[index].url = "";
              let timeStart = calEvents[index].timestart * 1000;
              let timeEnd =
                (calEvents[index].timestart + calEvents[index].timeduration) *
                1000;
              calEvents[index].start = new Date(timeStart);
              calEvents[index].end = new Date(timeEnd);

              const hours = calEvents[index].start
                .getHours()
                .toString()
                .padStart(2, "0");
              const minutes = calEvents[index].start
                .getMinutes()
                .toString()
                .padStart(2, "0");
              calEvents[index].startingTime = `${hours}:${minutes}`;
              if (calEvents[index].modulename !== null) {
                calEvents[index].colorEvento = getEventColor(
                  calEvents[index].modulename,
                  colorConfig
                );
              } else {
                calEvents[index].colorEvento = getEventColor(
                  calEvents[index].eventtype,
                  colorConfig
                );
              }
            });
            setEventsData(calEvents);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [coursesList]);

  const handleSelectEvent = (event) => {
    if (event.url === "") {
      const query = {
        wsfunction: "core_calendar_get_calendar_event_by_id",
        eventid: event.id,
      };
      getData(query)
        .then((res) => {
          if (res.status === 200 && res.data.event.url !== undefined) {
            for (let i = 0; i < eventsData.length; i++) {
              if (eventsData[i].id === event.id) {
                eventsData[i].url = res.data.event.url;
                break;
              }
            }
            setEventsData([...eventsData]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setSelectedEvent(event);
    setShowModal(true);
  };

  const filterEvents = (eventChecked) => {
    let newEvents = [];
    newEvents = eventsData.filter((el) => {
      if (
        eventChecked.includes(el.modulename) ||
        eventChecked.includes(el.eventtype)
      ) {
        return true;
      }
    });
    setFilteredEvents(newEvents);
  };

  const showAllNone = (value) => {
    if (value === true) setFilteredEvents(eventsData);
    else setFilteredEvents([]);
  };

  const CustomEventTitle = ({ event }) => (
    <React.Fragment>
      <span style={{ backgroundColor: event.colorEvento }}>
        {event.startingTime}
      </span>
      {event.title}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <View
        showModal={showModal}
        colorConfig={colorConfig}
        selectedEvent={selectedEvent}
        filteredEvents={filteredEvents}
        showAllNone={showAllNone}
        filterEvents={filterEvents}
        setShowModal={setShowModal}
        CustomEventTitle={CustomEventTitle}
        handleSelectEvent={handleSelectEvent}
      />
    </React.Fragment>
  );
}
