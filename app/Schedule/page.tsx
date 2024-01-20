"use client";

import FullCalendar from "@fullcalendar/react";
import React, { useEffect, useRef, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

const Page = () => {
  const [defaultView, setDefaultView] = useState("");
  const calendarRef = useRef<FullCalendar>(null!);

  useEffect(() => {
    setDefaultView(window.innerWidth <= 768 ? "timeGridDay" : "dayGridMonth");
  }, []);

  const handleDateClick = (args: any) => {
    console.log(args);
  };

  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
      initialView={defaultView}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      buttonText={{
        today: "TODAY",
        month: "MONTH",
        week: "WEEK",
        day: "DAY",
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
      windowResize={(x) => {
        let calendarApi = calendarRef.current.getApi();
        window.innerWidth <= 768
          ? calendarApi.changeView("timeGridDay")
          : calendarApi.changeView("dayGridMonth");
      }}
    />
  );
};

export default Page;
