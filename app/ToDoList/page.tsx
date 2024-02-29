"use client";

import React, { useEffect, useState } from "react";
import AddEventModal from "../components/AddEventModal";
import clsx from "clsx";
import ShowToDoEventModal from "../components/ToDoList/ShowToDoEventModal";
import ToDoCard from "../components/ToDoList/ToDoCard";

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
  const [toDoTesks, setToDoTesks] = useState([{}]);

  useEffect(() => {
    setToDoTesks(JSON.parse(localStorage.getItem("toDoEvents") || "[{}]"));
  }, []);

  const [SendDataToShowModal, setSendDataToShowModal] = useState({
    id: "",
    title: "",
    dueDateState: false,
    dueDate: "",
    description: "",
    teskState: "",
    archive: false,
  });

  return (
    <>
      <div className="flex flex-col h-full space-y-2">
        <button
          className="w-full bg-gray-200 rounded-lg p-2 font-bold"
          onClick={() => setShowAddingModal(true)}
        >
          Add ToDo
        </button>
        <div className="flex h-full justify-between space-x-2">
          <div className="w-1/3 rounded-lg border h-[calc(100vh-(61px+8px+16px+20px+40px+8px))]">
            <div className="flex-initial border-b px-2 py-2 bg-gray-100 font-bold text-center ">
              ToDo
            </div>
            <div className="p-2 space-y-2 overflow-y-auto h-[calc(100%-41px)]">
              {Object.keys(toDoTesks[0] || {}).length
                ? toDoTesks.map(
                    (
                      toDoTesks: {
                        id?: string;
                        title?: string;
                        dueDateState?: boolean;
                        dueDate?: string;
                        description?: string;
                        teskState?: string;
                        archive?: boolean;
                      },
                      index: number
                    ) => {
                      if (toDoTesks.teskState === "ToDo")
                        return (
                          <ToDoCard
                            key={index}
                            toDoTesks={toDoTesks}
                            setState={{
                              setSendDataToShowModal,
                              setShowDetailModal,
                            }}
                          />
                        );
                    }
                  )
                : null}
            </div>
          </div>
          <div className="w-1/3 rounded-lg border h-[calc(100vh-(61px+8px+16px+20px+40px+8px))]">
            <div className="border-b px-2 py-2 bg-gray-100 font-bold text-center">
              Doing
            </div>
            <div className="p-2 space-y-2 overflow-y-auto h-[calc(100%-41px)]">
              {Object.keys(toDoTesks[0] || {}).length
                ? toDoTesks.map(
                    (
                      toDoTesks: {
                        id?: string;
                        title?: string;
                        dueDateState?: boolean;
                        dueDate?: string;
                        description?: string;
                        teskState?: string;
                        archive?: boolean;
                      },
                      index: number
                    ) => {
                      if (toDoTesks.teskState === "Doing")
                        return (
                          <ToDoCard
                            key={index}
                            toDoTesks={toDoTesks}
                            setState={{
                              setSendDataToShowModal,
                              setShowDetailModal,
                            }}
                          />
                        );
                    }
                  )
                : null}
            </div>
          </div>
          <div className="w-1/3 rounded-lg border h-[calc(100vh-(61px+8px+16px+20px+40px+8px))]">
            <div className="border-b px-2 py-2 bg-gray-100 font-bold text-center">
              Done
            </div>
            <div className="p-2 space-y-2 overflow-y-auto h-[calc(100%-41px)]">
              {Object.keys(toDoTesks[0] || {}).length
                ? toDoTesks.map(
                    (
                      toDoTesks: {
                        id?: string;
                        title?: string;
                        dueDateState?: boolean;
                        dueDate?: string;
                        description?: string;
                        teskState?: string;
                        archive?: boolean;
                      },
                      index: number
                    ) => {
                      if (toDoTesks.teskState === "Done")
                        return (
                          <ToDoCard
                            key={index}
                            toDoTesks={toDoTesks}
                            setState={{
                              setSendDataToShowModal,
                              setShowDetailModal,
                            }}
                          />
                        );
                    }
                  )
                : null}
            </div>
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

      {showDetailModal ? (
        <ShowToDoEventModal
          setShowDetailModal={setShowDetailModal}
          getDataToModal={SendDataToShowModal}
          defaultCheckId={"ToDo"}
          toDoTesks={toDoTesks}
          setToDoTesks={setToDoTesks}
        />
      ) : null}
    </>
  );
};

export default Page;
