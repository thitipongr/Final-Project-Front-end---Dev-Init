"use client";

import FullCalendar from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid";

const page = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      height={"100%"}
      events={[
        { title: "event 1", date: "2024-01-01" },
        { title: "event 2", date: "2024-01-01" },
      ]}
    />
  );
};

export default page;
