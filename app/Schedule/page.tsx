"use client";

import FullCalendar from "@fullcalendar/react";
import React, { useRef, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import AddEventModal from "../components/AddEventModal";

const Page = () => {
  const calendarRef = useRef<FullCalendar>(null!);

  let defaultView = "";
  if (typeof window !== "undefined") {
    defaultView = window.innerWidth <= 768 ? "timeGridDay" : "dayGridMonth";
  }

  const [showModal, setShowModal] = useState(false);
  const [sendDateStr, setSendDateStr] = useState("");

  const handleDateClick = (args: any) => {
    setSendDateStr(args.dateStr);
    showModal ? setShowModal(false) : setShowModal(true);
  };

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
        dateClick={handleDateClick}
        events={[
          { title: "event 1", date: "2024-01-01" },
          { title: "event 2", date: "2024-01-01" },
        ]}
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
      />
      {showModal ? (
        <AddEventModal
          setShowModal={setShowModal}
          sendDateStr={sendDateStr}
          defaultCheckId={"Schedule"}
        />
      ) : null}
    </div>
  );
};

export default Page;
