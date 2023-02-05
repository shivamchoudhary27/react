import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./events.js";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState(events);

  const handleSelect = ({ start, end }) => {
    console.log(start);
    console.log(end);
    const title = window.prompt("New Event name");
    console.log(start);
    console.log(end);
    console.log(title);
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
console.log(localizer);
  return (
    <div className="App">
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
  );
}

//----------------------------------------------------
// import "./styles.css";
// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// export default function ReactBigCalendar() {
//   const [value, onChange] = useState(new Date());
//   return (
//     <div className="App">
//       <Calendar onChange={onChange} value={value} />
//     </div>
//   );
// }
//-------------------------------------------------------------
// import React, { useCallback, useRef } from "react";
// import { render } from "react-dom";

// import TUICalendar from "@toast-ui/react-calendar";
// import { ISchedule, ICalendarInfo } from "tui-calendar";

// import "tui-calendar/dist/tui-calendar.css";
// import "tui-date-picker/dist/tui-date-picker.css";
// import "tui-time-picker/dist/tui-time-picker.css";

// import "./styles.css";

// const start = new Date();
// const end = new Date(new Date().setMinutes(start.getMinutes() + 30));
// const schedules = [
//   {
//     calendarId: "1",
//     category: "time",
//     isVisible: true,
//     title: "Study",
//     id: "1",
//     body: "Test",
//     start,
//     end
//   },
//   {
//     calendarId: "2",
//     category: "time",
//     isVisible: true,
//     title: "Meeting",
//     id: "2",
//     body: "Description",
//     start: new Date(new Date().setHours(start.getHours() + 1)),
//     end: new Date(new Date().setHours(start.getHours() + 2))
//   }
// ];

// const calendars = [
//   {
//     id: "1",
//     name: "My Calendar",
//     color: "#ffffff",
//     bgColor: "#9e5fff",
//     dragBgColor: "#9e5fff",
//     borderColor: "#9e5fff"
//   },
//   {
//     id: "2",
//     name: "Company",
//     color: "#ffffff",
//     bgColor: "#00a9ff",
//     dragBgColor: "#00a9ff",
//     borderColor: "#00a9ff"
//   }
// ];

// export default function ReactBigCalendar() {
//   const cal = useRef(null);

//   const onClickSchedule = useCallback((e) => {
//     const { calendarId, id } = e.schedule;
//     const el = cal.current.calendarInst.getElement(id, calendarId);

//     console.log(e, el.getBoundingClientRect());
//   }, []);

//   const onBeforeCreateSchedule = useCallback((scheduleData) => {
//     console.log(scheduleData);

//     const schedule = {
//       id: String(Math.random()),
//       title: scheduleData.title,
//       isAllDay: scheduleData.isAllDay,
//       start: scheduleData.start,
//       end: scheduleData.end,
//       category: scheduleData.isAllDay ? "allday" : "time",
//       dueDateClass: "",
//       location: scheduleData.location,
//       raw: {
//         class: scheduleData.raw["class"]
//       },
//       state: scheduleData.state
//     };

//     cal.current.calendarInst.createSchedules([schedule]);
//   }, []);

//   const onBeforeDeleteSchedule = useCallback((res) => {
//     console.log(res);

//     const { id, calendarId } = res.schedule;

//     cal.current.calendarInst.deleteSchedule(id, calendarId);
//   }, []);

//   const onBeforeUpdateSchedule = useCallback((e) => {
//     console.log(e);

//     const { schedule, changes } = e;

//     cal.current.calendarInst.updateSchedule(
//       schedule.id,
//       schedule.calendarId,
//       changes
//     );
//   }, []);

//   function _getFormattedTime(time) {
//     const date = new Date(time);
//     const h = date.getHours();
//     const m = date.getMinutes();

//     return `${h}:${m}`;
//   }

//   function _getTimeTemplate(schedule, isAllDay) {
//     var html = [];

//     if (!isAllDay) {
//       html.push("<strong>" + _getFormattedTime(schedule.start) + "</strong> ");
//     }
//     if (schedule.isPrivate) {
//       html.push('<span class="calendar-font-icon ic-lock-b"></span>');
//       html.push(" Private");
//     } else {
//       if (schedule.isReadOnly) {
//         html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
//       } else if (schedule.recurrenceRule) {
//         html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
//       } else if (schedule.attendees.length) {
//         html.push('<span class="calendar-font-icon ic-user-b"></span>');
//       } else if (schedule.location) {
//         html.push('<span class="calendar-font-icon ic-location-b"></span>');
//       }
//       html.push(" " + schedule.title);
//     }

//     return html.join("");
//   }

//   const templates = {
//     time: function (schedule) {
//       console.log(schedule);
//       return _getTimeTemplate(schedule, false);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Welcome to TOAST Ui Calendar</h1>

//       <TUICalendar
//         ref={cal}
//         height="1000px"
//         view="week"
//         useCreationPopup={true}
//         useDetailPopup={true}
//         template={templates}
//         calendars={calendars}
//         schedules={schedules}
//         onClickSchedule={onClickSchedule}
//         onBeforeCreateSchedule={onBeforeCreateSchedule}
//         onBeforeDeleteSchedule={onBeforeDeleteSchedule}
//         onBeforeUpdateSchedule={onBeforeUpdateSchedule}
//       />
//     </div>
//   );
// }
