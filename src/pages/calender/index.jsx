import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
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
  console.log(eventsData);
  const handleSelect = ({ start, end }) => {
    console.log(eventsData);
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