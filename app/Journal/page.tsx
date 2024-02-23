"use client";

import React, { useEffect, useState } from "react";
import AddEventModal from "../components/AddEventModal";
import ShowJournalEventModal from "../components/ShowJournalEventModal";

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
  const [journalEvents, setJournalEvents] = useState([{}]);

  useEffect(() => {
    setJournalEvents(
      JSON.parse(localStorage.getItem("journalEvents") || "[{}]")
    );
  }, []);

  const [SendDataToShowModal, setSendDataToShowModal] = useState({
    id: "",
    title: "",
    date: "",
    description: "",
  });

  //ToDoList
  const [toDoTesks, setToDoTesks] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("toDoEvents") || "[{}]")
      : [{}]
  );

  return (
    <div>
      <div id="add-journal">
        <button
          className="w-full bg-gray-200 rounded-lg p-2 font-bold"
          onClick={() => setShowAddingModal(true)}
        >
          Add Journal
        </button>
      </div>

      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 grid-rows-4 gap-2">
        {Object.keys(journalEvents[0] || {}).length
          ? journalEvents.map(
              (
                object: {
                  id?: string;
                  date?: string;
                  title?: string;
                  description?: string;
                },
                index?: number
              ) => {
                return (
                  <div
                    key={index}
                    className="w-full rounded-lg pb-2 border space-y-1"
                    onClick={() => {
                      const packData = {
                        id: object.id || "",
                        title: object.title || "",
                        date: object.date || "",
                        description: object.description || "",
                      };

                      setSendDataToShowModal(packData);
                      setShowDetailModal(true);
                    }}
                  >
                    <div className="border-b px-2 py-2 bg-gray-100">
                      {new Date(object.date || 0).toLocaleString("en-US")}
                    </div>
                    <div className="w-full p-2">
                      <div className="font-bold truncate">{object.title}</div>
                      <div className="truncate">{object.description}</div>
                    </div>
                  </div>
                );
              }
            )
          : null}
      </div>

      {showAddingModal ? (
        <AddEventModal
          setShowModal={setShowAddingModal}
          getDataToModal={sendDataToAddingModal}
          defaultCheckId={"Journal"}
          calendarEvents={calendarEvents}
          setCalendarEvents={setCalendarEvents}
          journalEvents={journalEvents}
          setJournalEvents={setJournalEvents}
          toDoTesks={toDoTesks}
          setToDoTesks={setToDoTesks}
        />
      ) : null}

      {showDetailModal ? (
        <ShowJournalEventModal
          setShowDetailModal={setShowDetailModal}
          getDataToModal={SendDataToShowModal}
          defaultCheckId={"Journal"}
          journalEvents={journalEvents}
          setJournalEvents={setJournalEvents}
        />
      ) : null}
    </div>
  );
};

export default Page;
