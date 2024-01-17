"use client";

import FullCalendar from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

const Page = () => {
  const handleDateClick = (args: any) => {
    console.log(args);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
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
    />
  );
};

export default Page;
