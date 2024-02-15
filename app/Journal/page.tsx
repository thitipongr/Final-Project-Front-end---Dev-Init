"use client";

import React, { useState } from "react";
import AddEventModal from "../components/AddEventModal";
const mockJournal = [
  {
    title: "1",
    date: 1707350400000,
    description: "des#1",
  },
  {
    title: "2",
    date: 1707350400000,
    description: "des#2",
  },
];

const Page = () => {
  const [showAddingModal, setShowAddingModal] = useState(false);
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

  return (
    <div>
      <div id="add-journal">
        <button
          className="w-full bg-gray-100 rounded-lg p-2 font-bold"
          onClick={() => setShowAddingModal(true)}
        >
          Add Journal
        </button>
      </div>
      <div id="list-journal">
        {mockJournal.map((object, index) => {
          return (
            <div
              key={index}
              className="w-full rounded-lg py-2 mt-1 border space-y-1"
            >
              <div className="border-b px-2 pb-2">
                {`${new Date(object.date).toDateString()} - ${new Date(
                  object.date
                ).toTimeString()}`}
              </div>
              <div className="w-full p-2">
                <div className="font-bold">{object.title}</div>
                <div className="">{object.description}</div>
              </div>
            </div>
          );
        })}
      </div>
      {showAddingModal ? (
        <AddEventModal
          setShowModal={setShowAddingModal}
          getDataToModal={sendDataToAddingModal}
          defaultCheckId={"Journal"}
          calendarEvents={calendarEvents}
          setCalendarEvents={setCalendarEvents}
        />
      ) : null}
    </div>
  );
};

export default Page;
