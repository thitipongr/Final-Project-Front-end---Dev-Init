"use client";

import React, { useEffect, useState } from "react";
import AddEventModal from "../components/AddEventModal";

const Page = () => {
  // Schedule
  const [showAddingModal, setShowAddingModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const sendDataToAddingModal = {
    allDay: true,
    startStr: new Date().toLocaleDateString("en-CA"),
    endStr: new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toLocaleDateString("en-CA"),
  };
  const [calendarEvents, setCalendarEvents] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("calendarEvents") || "[{}]")
      : [{}]
  );

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
    <div className="flex flex-col h-full space-y-2">
      <button
        className="w-full bg-gray-200 rounded-lg p-2 font-bold"
        onClick={() => setShowAddingModal(true)}
      >
        Add ToDo
      </button>
      <div className="flex h-full justify-between space-x-2">
        <div className="w-full rounded-lg border">
          <div className="border-b px-2 py-2 bg-gray-100 font-bold text-center">
            ToDo
          </div>
          <div className="p-2"></div>
        </div>
        <div className="w-full rounded-lg border">
          <div className="border-b px-2 py-2 bg-gray-100 font-bold text-center">
            Doing
          </div>
        </div>
        <div className="w-full rounded-lg border">
          <div className="border-b px-2 py-2 bg-gray-100 font-bold text-center">
            Done
          </div>
        </div>
      </div>

      {showAddingModal ? (
        <AddEventModal
          setShowModal={setShowAddingModal}
          getDataToModal={sendDataToAddingModal}
          defaultCheckId={"ToDo"}
          calendarEvents={calendarEvents}
          setCalendarEvents={setCalendarEvents}
          journalEvents={journalEvents}
          setJournalEvents={setJournalEvents}
          toDoTesks={toDoTesks}
          setToDoTesks={setToDoTesks}
        />
      ) : null}
    </div>
  );
};

export default Page;
