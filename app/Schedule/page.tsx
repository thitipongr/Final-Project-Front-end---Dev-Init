"use client";

import FullCalendar from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid";

const page = () => {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={[
          { title: "event 1", date: "2019-04-01" },
          { title: "event 2", date: "2019-04-02" },
        ]}
      />
    </div>
  );
};

export default page;
