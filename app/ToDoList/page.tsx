"use client";

import React, { useEffect, useState } from "react";
import AddEventModal from "../components/AddEventModal";
import clsx from "clsx";
import ShowToDoEventModal from "../components/ShowToDoEventModal";

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
          <div className="w-full rounded-lg border">
            <div className="border-b px-2 py-2 bg-gray-100 font-bold text-center">
              ToDo
            </div>
            <div className="p-2 space-y-2">
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
                          <div
                            key={index}
                            className="w-full rounded-lg border"
                            onClick={() => {
                              const packData = {
                                id: toDoTesks.id || "",
                                title: toDoTesks.title || "",
                                dueDateState: toDoTesks.dueDateState || false,
                                dueDate: toDoTesks.dueDate || "",
                                description: toDoTesks.description || "",
                                teskState: toDoTesks.teskState || "",
                                archive: toDoTesks.archive || false,
                              };

                              setSendDataToShowModal(packData);
                              setShowDetailModal(true);
                            }}
                          >
                            <div
                              className={clsx(
                                "rounded-lg p-2 bg-gray-100 font-bold truncate",
                                {
                                  "border-b rounded-b-none":
                                    toDoTesks.description !== "" ||
                                    toDoTesks.dueDateState,
                                }
                              )}
                            >
                              {toDoTesks.title}
                            </div>
                            <div
                              className={clsx("w-full space-y-2", {
                                "p-2":
                                  toDoTesks.description !== "" ||
                                  toDoTesks.dueDateState,
                              })}
                            >
                              {toDoTesks.description !== "" ? (
                                <div className="truncate">
                                  {toDoTesks.description}
                                </div>
                              ) : null}
                              {toDoTesks.dueDateState ? (
                                <div
                                  className={clsx(
                                    "truncate p-2 w-min rounded-lg",
                                    {
                                      "bg-red-300 border-red-600":
                                        new Date(
                                          toDoTesks.dueDate || 0
                                        ).getTime() <= new Date().getTime(),
                                      "bg-yellow-200 border-yellow-500":
                                        new Date(
                                          toDoTesks.dueDate || 0
                                        ).getTime() > new Date().getTime() &&
                                        new Date(
                                          toDoTesks.dueDate || 0
                                        ).getTime() <
                                          new Date().getTime() + 86400000,
                                      "bg-green-200 border-green-500":
                                        new Date(
                                          toDoTesks.dueDate || 0
                                        ).getTime() >
                                        new Date().getTime() + 86400000,
                                    }
                                  )}
                                >
                                  {new Date(toDoTesks.dueDate || 0)
                                    .toLocaleString("en-US")
                                    .replace(":00", "")}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        );
                    }
                  )
                : null}
            </div>
          </div>
          <div className="w-full rounded-lg border">
            <div className="border-b px-2 py-2 bg-gray-100 font-bold text-center">
              Doing
            </div>
            <div className="p-2 space-y-2">
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
                          <div className="" key={index}>
                            {toDoTesks.title}
                          </div>
                        );
                    }
                  )
                : null}
            </div>
          </div>
          <div className="w-full rounded-lg border">
            <div className="border-b px-2 py-2 bg-gray-100 font-bold text-center">
              Done
            </div>
            <div className="p-2 space-y-2">
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
                          <div className="" key={index}>
                            {toDoTesks.title}
                          </div>
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
