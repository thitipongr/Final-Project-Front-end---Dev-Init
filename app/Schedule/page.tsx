"use client";

import FullCalendar from "@fullcalendar/react";
import React, { useEffect, useRef, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import AddEventModal from "../components/AddEventModal";
import ShowScheduleEventModal from "../components/ShowScheduleEventModal";

const Page = () => {
  // Schedule
  const calendarRef = useRef<FullCalendar>(null!);

  let defaultView = "";
  if (typeof window !== "undefined") {
    defaultView = window.innerWidth <= 768 ? "timeGridDay" : "dayGridMonth";
  }

  const [showAddingModal, setShowAddingModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [sendDataToAddingModal, setSendDataToAddingModal] = useState({
    allDay: false,
    startStr: "",
    endStr: "",
  });

  const handleDateSelect = (args: any) => {
    const packData = {
      allDay: args.allDay,
      startStr: args.startStr,
      endStr: args.endStr,
    };
    setSendDataToAddingModal(packData);
    setShowAddingModal(true);
  };
  const [calendarEvents, setCalendarEvents] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("calendarEvents") || "[{}]")
      : [{}]
  );

  const [SendDataToShowModal, setSendDataToShowModal] = useState({
    id: "",
    allDay: false,
    startStr: "",
    endStr: "",
    title: "",
    description: "",
  });

  const handleEventSelect = (args: any) => {
    const packData = {
      id: args.event.id,
      allDay: args.event.allDay,
      startStr: args.event.startStr,
      endStr: args.event.endStr,
      title: args.event.title,
      description: args.event.extendedProps.description,
    };

    setSendDataToShowModal(packData);
    setShowDetailModal(true);
  };

  //Journal
  const [journalEvents, setJournalEvents] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("journalEvents") || "[{}]")
      : [{}]
  );

  //ToDoList
  const [toDoTesks, setToDoTesks] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("toDoEvents") || "[{}]")
      : [{}]
  );

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
        selectable={true}
        height={"100%"}
        windowResize={() => {
          let calendarApi = calendarRef.current.getApi();
          window.innerWidth <= 768
            ? calendarApi.changeView("timeGridDay")
            : calendarApi.changeView("dayGridMonth");
          calendarApi.view.calendar;
        }}
        dayMaxEvents
        eventClick={handleEventSelect}
      />
      {showAddingModal ? (
        <AddEventModal
          setShowModal={setShowAddingModal}
          getDataToModal={sendDataToAddingModal}
          defaultCheckId={"Schedule"}
          calendarEvents={calendarEvents}
          setCalendarEvents={setCalendarEvents}
          journalEvents={journalEvents}
          setJournalEvents={setJournalEvents}
          toDoTesks={toDoTesks}
          setToDoTesks={setToDoTesks}
        />
      ) : null}
      {showDetailModal ? (
        <ShowScheduleEventModal
          setShowDetailModal={setShowDetailModal}
          getDataToModal={SendDataToShowModal}
          defaultCheckId={"Schedule"}
          calendarEvents={calendarEvents}
          setCalendarEvents={setCalendarEvents}
        />
      ) : null}
    </div>
  );
};

export default Page;
