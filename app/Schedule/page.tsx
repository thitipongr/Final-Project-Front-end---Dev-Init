"use client";

import FullCalendar from "@fullcalendar/react";
import React, { useRef, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import AddEventModal from "../components/modal/AddEventModal";
import Modal from "../components/modal/Modal";

const Page = () => {
  const calendarRef = useRef<FullCalendar>(null!);

  let defaultView = "";
  if (typeof window !== "undefined") {
    defaultView = window.innerWidth <= 768 ? "timeGridDay" : "dayGridMonth";
  }

  const [showModal, setShowModal] = useState(false);

  const [sendDataToModal, setSendDataToModal] = useState({
    allDay: false,
    startStr: "",
    endStr: "",
  });

  const handleDateSelect = (args: any) => {
    const rewriteEndStr = new Date(args.endStr);
    rewriteEndStr.setDate(rewriteEndStr.getDate() - 1);

    const packData = {
      allDay: args.allDay,
      startStr: args.startStr,
      endStr: args.endStr,
    };
    setSendDataToModal(packData);
    setShowModal(true);
  };

  const [calendarEvents, setCalendarEvents] = useState([{}]);

  return (
    <div className="inline">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView={defaultView}
        headerToolbar={{
          left: "title",
          center: "",
          right: "today",
        }}
        footerToolbar={{
          left: "dayGridMonth,timeGridWeek,timeGridDay",
          center: "",
          right: "prev,next",
        }}
        titleFormat={{
          year: "2-digit",
          month: "short",
          day: "2-digit",
        }}
        buttonText={{
          today: "TODAY",
          month: "Month",
          week: "Week",
          day: "Day",
        }}
        select={handleDateSelect}
        events={calendarEvents}
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        }}
        nowIndicator={true}
        editable={true}
        droppable={true}
        selectable={true}
        selectMirror={true}
        height={"100%"}
        windowResize={() => {
          let calendarApi = calendarRef.current.getApi();
          window.innerWidth <= 768
            ? calendarApi.changeView("timeGridDay")
            : calendarApi.changeView("dayGridMonth");
          calendarApi.view.calendar;
        }}
        dayMaxEvents
        eventClick={(event) => {
          alert(
            `${event.event.start} - ${event.event.end} - ${event.event.extendedProps.description}`
          );
        }}
      />
      {showModal ? (
        <Modal
          setShowModal={setShowModal}
          getDataToModal={sendDataToModal}
          defaultCheckId={"Add_Schedule"}
          calendarEvents={calendarEvents}
          setCalendarEvents={setCalendarEvents}
        />
      ) : null}
    </div>
  );
};

export default Page;
