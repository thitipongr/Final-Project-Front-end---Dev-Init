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

  const [toDoExpand, setToDoExpand] = useState(true);
  const [doingExpand, setDoingExpand] = useState(false);
  const [doneExpand, setDoneExpand] = useState(false);

  return (
    <>
      <div className="flex flex-col h-full space-y-2">
        <button
          className="w-full bg-gray-200 rounded-lg p-2 font-bold"
          onClick={() => setShowAddingModal(true)}
        >
          Add ToDo
        </button>
        <div className="flex flex-col lg:flex-row justify-between space-y-2 lg:space-y-0 lg:space-x-2 select-none">
          <div
            className={clsx(
              "lg:w-1/3 rounded-lg border lg:h-[calc(100vh-(61px+8px+16px+20px+40px+8px))]",
              {
                "h-[calc(100vh-(61px+8px+16px+20px+40px+8px+40px+8px+40px+8px+10px))] ":
                  toDoExpand,
              }
            )}
          >
            <div
              className={clsx(
                "border-none px-2 py-2 bg-gray-100 font-bold text-center rounded-lg relative",
                {
                  "rounded-b-none border-b": toDoExpand,
                }
              )}
              onClick={() => {
                setToDoExpand(true),
                  setDoingExpand(false),
                  setDoneExpand(false);
              }}
            >
              ToDo
              {Object.keys(toDoTesks[0] || {}).length ? (
                <div className="border rounded-full px-2 py-1 absolute bg-yellow-200 border-yellow-500 right-1 bottom-1">
                  {
                    toDoTesks.filter((toDoTesks: { teskState?: string }) => {
                      return toDoTesks.teskState === "ToDo";
                    }).length
                  }
                </div>
              ) : (
                <div className="border rounded-full px-2 py-1 absolute bg-yellow-200 border-yellow-500 right-1 bottom-1">
                  ...
                </div>
              )}
            </div>
            <div
              className={clsx(
                "p-2 space-y-2 overflow-y-auto h-[calc(100%-41px)]",
                {
                  "hidden lg:block": !toDoExpand,
                }
              )}
            >
              {Object.keys(toDoTesks[0] || {}).length ? (
                toDoTesks.map(
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
              ) : (
                <div className="border rounded-full px-2 py-1 absolute bg-yellow-200 border-yellow-500 right-1 bottom-1">
                  ...
                </div>
              )}
            </div>
          </div>
          <div
            className={clsx(
              "lg:w-1/3 rounded-lg border lg:h-[calc(100vh-(61px+8px+16px+20px+40px+8px))]",
              {
                "h-[calc(100vh-(61px+8px+16px+20px+40px+8px+40px+8px+40px+8px+10px))] ":
                  doingExpand,
              }
            )}
          >
            <div
              className={clsx(
                "border-none px-2 py-2 bg-gray-100 font-bold text-center rounded-lg relative",
                {
                  "rounded-b-none border-b": doingExpand,
                }
              )}
              onClick={() => {
                setToDoExpand(false),
                  setDoingExpand(true),
                  setDoneExpand(false);
              }}
            >
              Doing
              {Object.keys(toDoTesks[0] || {}).length ? (
                <div className="border rounded-full px-2 py-1 absolute bg-yellow-200 border-yellow-500 right-1 bottom-1">
                  {
                    toDoTesks.filter((toDoTesks: { teskState?: string }) => {
                      return toDoTesks.teskState === "Doing";
                    }).length
                  }
                </div>
              ) : (
                <div className="border rounded-full px-2 py-1 absolute bg-yellow-200 border-yellow-500 right-1 bottom-1">
                  ...
                </div>
              )}
            </div>
            <div
              className={clsx(
                "p-2 space-y-2 overflow-y-auto h-[calc(100%-41px)]",
                {
                  "hidden lg:block": !doingExpand,
                }
              )}
            >
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
          <div
            className={clsx(
              "lg:w-1/3 rounded-lg border lg:h-[calc(100vh-(61px+8px+16px+20px+40px+8px))]",
              {
                "h-[calc(100vh-(61px+8px+16px+20px+40px+8px+40px+8px+40px+8px+10px))] ":
                  doneExpand,
              }
            )}
          >
            <div
              className={clsx(
                "border-none px-2 py-2 bg-gray-100 font-bold text-center rounded-lg relative",
                {
                  "rounded-b-none border-b": doneExpand,
                }
              )}
              onClick={() => {
                setToDoExpand(false),
                  setDoingExpand(false),
                  setDoneExpand(true);
              }}
            >
              Done
              {Object.keys(toDoTesks[0] || {}).length ? (
                <div className="border rounded-full px-2 py-1 absolute bg-yellow-200 border-yellow-500 right-1 bottom-1">
                  {
                    toDoTesks.filter((toDoTesks: { teskState?: string }) => {
                      return toDoTesks.teskState === "Done";
                    }).length
                  }
                </div>
              ) : (
                <div className="border rounded-full px-2 py-1 absolute bg-yellow-200 border-yellow-500 right-1 bottom-1">
                  ...
                </div>
              )}
            </div>
            <div
              className={clsx(
                "p-2 space-y-2 overflow-y-auto h-[calc(100%-41px)]",
                {
                  "hidden lg:block": !doneExpand,
                }
              )}
            >
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
