"use client";

import FullCalendar from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid";

const page = () => {
  return (
    <div className="h-full py-4">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height={"100%"}
        events={[
          { title: "event 1", date: "2023-12-01" },
          { title: "event 2", date: "2023-12-02" },
        ]}
      />
    </div>
  );
};

export default page;
