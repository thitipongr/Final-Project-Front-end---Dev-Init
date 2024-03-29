import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";

const pageList = [
  {
    displayName: "Schedule",
  },
  {
    displayName: "Journal",
  },
  {
    displayName: "ToDo",
  },
];

type AddEventModal = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  getDataToModal: { allDay: boolean; startStr: string; endStr: string };
  defaultCheckId: string;
  calendarEvents: {}[];
  setCalendarEvents: Dispatch<SetStateAction<{}[]>>;
  journalEvents: {}[];
  setJournalEvents: Dispatch<SetStateAction<{}[]>>;
  toDoTesks: {}[];
  setToDoTesks: Dispatch<SetStateAction<{}[]>>;
};

const AddEventModal = ({
  setShowModal,
  getDataToModal,
  defaultCheckId,
  calendarEvents,
  setCalendarEvents,
  journalEvents,
  setJournalEvents,
  toDoTesks,
  setToDoTesks,
}: AddEventModal) => {
  const [addingType, setAddingType] = useState(defaultCheckId);
  const router = useRouter();

  // Schedule
  const [startPeriod_allDay, setStartPeriod_allDay] = useState(
    getDataToModal.allDay
      ? getDataToModal.startStr
      : getDataToModal.startStr.split("T")[0]
  );
  const [endPeriod_allDay, setEndPeriod_allDay] = useState(
    getDataToModal.allDay
      ? new Date(
          new Date(getDataToModal.endStr).setDate(
            new Date(getDataToModal.endStr).getDate() - 1
          )
        ).toLocaleDateString("en-CA")
      : getDataToModal.endStr.split("T")[0]
  );
  const [startPeriod_subDay, setStartPeriod_subDay] = useState(
    getDataToModal.allDay
      ? getDataToModal.startStr + "T00:00"
      : getDataToModal.startStr.replace(":00+07:00", "")
  );
  const [endPeriod_subDay, setEndPeriod_subDay] = useState(
    getDataToModal.allDay
      ? new Date(
          new Date(getDataToModal.endStr).setDate(
            new Date(getDataToModal.endStr).getDate() - 1
          )
        ).toLocaleDateString("en-CA") +
          (getDataToModal.startStr ===
          new Date(
            new Date(getDataToModal.endStr).setDate(
              new Date(getDataToModal.endStr).getDate() - 1
            )
          ).toLocaleDateString("en-CA")
            ? "T00:30"
            : "T00:00")
      : getDataToModal.endStr.replace(":00+07:00", "")
  );

  const [allDayState, setAllDayState] = useState(getDataToModal.allDay);

  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  // Journal
  const prepDate = new Date().toLocaleString("sv-SE").replace(" ", "T");
  const [journalDate, setJournalDate] = useState(prepDate);

  // ToDoList
  const [toDoDueDateState, setToDoDueDateState] = useState(false);

  const [toDoDueDate, setToDoDueDate] = useState(
    prepDate.split(":")[0] + ":" + prepDate.split(":")[1]
  );

  const [toDoState, setToDoState] = useState("ToDo");

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-[315px]">
          <div className="border-0 rounded-lg relative flex flex-col w-full h-[400px] bg-white dark:bg-slate-900 dark:text-white outline-none focus:outline-none">
            <div className="relative p-2 flex flex-col space-y-2 h-full">
              <div className="flex flex-col space-y-2">
                <input
                  autoFocus
                  type="text"
                  placeholder="Add title"
                  className={clsx(
                    "w-full py-1 border-b focus:outline-none focus:border-cyan-900 px-1 dark:bg-slate-900",
                    {
                      "border-red-500 focus:border-red-500": eventTitle === "",
                    }
                  )}
                  value={eventTitle}
                  onChange={(e) => {
                    setEventTitle(e.target.value);
                  }}
                />

                <div className="flex space-x-2">
                  {pageList.map((list, key) => {
                    return (
                      <button
                        key={key}
                        className={clsx(
                          "h-9 px-2 border-0 rounded-lg bg-slate-100 dark:bg-slate-800 w-full",
                          {
                            "bg-bg-slate-400 dark:bg-slate-950":
                              addingType === list.displayName,
                          }
                        )}
                        onClick={() => {
                          setAddingType(list.displayName);
                        }}
                      >
                        {list.displayName}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex-1">
                <div className="space-y-2 flex flex-col h-full ">
                  {
                    {
                      Schedule: (
                        <div>
                          {allDayState ? (
                            <div className="space-y-2">
                              <input
                                className="px-3 py-2 w-full border rounded-xl focus:outline-none focus:border-cyan-900 dark:bg-slate-900"
                                type="date"
                                value={startPeriod_allDay}
                                onChange={(e) => {
                                  setStartPeriod_allDay(e.target.value);
                                  if (
                                    new Date(e.target.value).getTime() >
                                      new Date(endPeriod_allDay).getTime() ||
                                    endPeriod_allDay.length === 0
                                  )
                                    setEndPeriod_allDay(e.target.value);
                                }}
                              />
                              <input
                                className={clsx(
                                  "px-3 py-2 w-full border rounded-xl focus:outline-none focus:border-cyan-900 dark:bg-slate-900",
                                  {
                                    "border-red-500 focus:border-red-500":
                                      startPeriod_allDay > endPeriod_allDay,
                                  }
                                )}
                                type="date"
                                value={endPeriod_allDay}
                                onChange={(e) => {
                                  setEndPeriod_allDay(e.target.value);
                                }}
                                min={startPeriod_allDay}
                              />
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <input
                                className="px-3 py-2 w-full border rounded-xl focus:outline-none focus:border-cyan-900 dark:bg-slate-900"
                                type="datetime-local"
                                value={startPeriod_subDay}
                                onChange={(e) => {
                                  setStartPeriod_subDay(e.target.value);
                                  if (
                                    new Date(e.target.value).getTime() >
                                      new Date(endPeriod_allDay).getTime() ||
                                    endPeriod_allDay.length === 0
                                  )
                                    setEndPeriod_subDay(e.target.value);
                                }}
                              />
                              <input
                                className={clsx(
                                  "px-3 py-2 w-full border rounded-xl focus:outline-none focus:border-cyan-900 dark:bg-slate-900",
                                  {
                                    "border-red-500 focus:border-red-500":
                                      startPeriod_subDay >= endPeriod_subDay,
                                  }
                                )}
                                type="datetime-local"
                                value={endPeriod_subDay}
                                onChange={(e) => {
                                  setEndPeriod_subDay(e.target.value);
                                }}
                                min={startPeriod_subDay}
                              />
                            </div>
                          )}
                          <input
                            className="mt-3 mr-1"
                            type="checkbox"
                            id="allDayState"
                            defaultChecked={allDayState}
                            onChange={(e) => {
                              setAllDayState(e.target.checked);
                            }}
                          />
                          <label htmlFor="allDayState">ALL DAY</label>
                        </div>
                      ),
                      Journal: (
                        <div>
                          <input
                            type="datetime-local"
                            className="px-3 py-2 w-full border rounded-xl focus:outline-none focus:border-cyan-900 dark:bg-slate-900"
                            value={journalDate}
                            onChange={(e) => {
                              setJournalDate(e.target.value);
                            }}
                          />
                        </div>
                      ),
                      ToDo: (
                        <div className="flex flex-col space-y-2">
                          <div className="flex">
                            <div className="flex flex-col mr-1 h-[44px] relative">
                              <input
                                className="mt-1"
                                type="checkbox"
                                id="dueDateState"
                                defaultChecked={toDoDueDateState}
                                onChange={(e) => {
                                  setToDoDueDateState(e.target.checked);
                                }}
                              />
                              <label
                                htmlFor="dueDateState"
                                className="h-full flex"
                              >
                                <div className="self-end">Due Date</div>
                              </label>
                            </div>
                            <input
                              type="datetime-local"
                              className="px-3 py-2 border rounded-xl flex-1 focus:outline-none focus:border-cyan-900 disabled:text-gray-400 dark:bg-slate-900"
                              disabled={!toDoDueDateState}
                              value={toDoDueDate}
                              onChange={(e) => {
                                setToDoDueDate(e.target.value);
                              }}
                            />
                          </div>
                          <div className="flex space-x-2">
                            <button
                              className={clsx(
                                "h-9 px-2 border-0 rounded-lg bg-slate-100 w-full dark:bg-slate-800",
                                {
                                  "bg-slate-400 dark:bg-slate-950":
                                    toDoState === "ToDo",
                                }
                              )}
                              onClick={() => setToDoState("ToDo")}
                            >
                              ToDo
                            </button>
                            <button
                              className={clsx(
                                "h-9 px-2 border-0 rounded-lg bg-slate-100 w-full dark:bg-slate-800",
                                {
                                  "bg-slate-400 dark:bg-slate-950":
                                    toDoState === "Doing",
                                }
                              )}
                              onClick={() => setToDoState("Doing")}
                            >
                              Doing
                            </button>
                            <button
                              className={clsx(
                                "h-9 px-2 border-0 rounded-lg bg-slate-100 w-full dark:bg-slate-800",
                                {
                                  "bg-slate-400 dark:bg-slate-950":
                                    toDoState === "Done",
                                }
                              )}
                              onClick={() => setToDoState("Done")}
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      ),
                    }[addingType]
                  }
                  <div className="flex-1">
                    <textarea
                      className="px-3 py-2 w-full h-full border rounded-xl focus:outline-none focus:border-cyan-900 resize-none dark:bg-slate-900"
                      placeholder="Add description"
                      value={eventDescription}
                      onChange={(e) => {
                        setEventDescription(e.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
              <div className="flex flex-row w-3/4">
                <button
                  className="w-full text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancle
                </button>
                {
                  {
                    Schedule: (
                      <button
                        disabled={
                          eventTitle !== "" &&
                          (allDayState
                            ? new Date(startPeriod_allDay).getTime() <=
                              new Date(endPeriod_allDay).getTime()
                              ? true
                              : false
                            : new Date(startPeriod_subDay).getTime() <
                              new Date(endPeriod_subDay).getTime()
                            ? true
                            : false) &&
                          (allDayState
                            ? startPeriod_allDay.length !== 0 &&
                              endPeriod_allDay.length !== 0
                              ? true
                              : false
                            : startPeriod_subDay.length !== 0 &&
                              endPeriod_subDay.length !== 0
                            ? true
                            : false)
                            ? false
                            : true
                        }
                        className={
                          "w-full bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150 disabled:opacity-50"
                        }
                        type="button"
                        onClick={() => {
                          const oldEvent = calendarEvents.filter(
                            (value) => Object.keys(value).length !== 0
                          );
                          const newEvent = [
                            {
                              id: new Date().getTime().toString(),
                              title: eventTitle,
                              start: allDayState
                                ? new Date(startPeriod_allDay).getTime()
                                : new Date(startPeriod_subDay).getTime(),
                              end: allDayState
                                ? new Date(
                                    new Date(endPeriod_allDay).setDate(
                                      new Date(endPeriod_allDay).getDate() + 1
                                    )
                                  ).getTime()
                                : new Date(endPeriod_subDay).getTime(),
                              allDay: allDayState
                                ? allDayState
                                : startPeriod_subDay.split("T")[1] ===
                                    endPeriod_subDay.split("T")[1] &&
                                  endPeriod_subDay.split("T")[1] === "00:00"
                                ? true
                                : false,
                              description: eventDescription,
                            },
                          ];
                          const addEvent = [...oldEvent, ...newEvent];

                          setCalendarEvents(addEvent);
                          setShowModal(false);
                          localStorage.setItem(
                            "calendarEvents",
                            JSON.stringify(addEvent)
                          );
                          router.push(`/${addingType}`);
                        }}
                      >
                        Save
                      </button>
                    ),
                    Journal: (
                      <button
                        disabled={
                          eventTitle !== "" && journalDate.length !== 0
                            ? false
                            : true
                        }
                        className={
                          "w-full bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150 disabled:opacity-50"
                        }
                        type="button"
                        onClick={() => {
                          const oldEvent = journalEvents.filter(
                            (value) => Object.keys(value).length !== 0
                          );
                          const newEvent = [
                            {
                              id: new Date().getTime().toString(),
                              title: eventTitle,
                              date: journalDate,
                              description: eventDescription,
                            },
                          ];
                          const addEvent = [...newEvent, ...oldEvent];
                          localStorage.setItem(
                            "journalEvents",
                            JSON.stringify(addEvent)
                          );
                          setJournalEvents(addEvent);
                          setShowModal(false);
                          router.push(`/${addingType}`);
                        }}
                      >
                        Save
                      </button>
                    ),
                    ToDo: (
                      <button
                        disabled={
                          eventTitle !== "" &&
                          (toDoDueDateState
                            ? toDoDueDate.length !== 0
                              ? true
                              : false
                            : true)
                            ? false
                            : true
                        }
                        className={
                          "w-full bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150 disabled:opacity-50"
                        }
                        type="button"
                        onClick={() => {
                          const oldEvent = toDoTesks.filter(
                            (value) => Object.keys(value).length !== 0
                          );
                          const newEvent = [
                            {
                              id: new Date().getTime().toString(),
                              title: eventTitle,
                              dueDateState: toDoDueDateState,
                              dueDate: toDoDueDateState ? toDoDueDate : "",
                              description: eventDescription,
                              teskState: toDoState,
                              archive: false,
                            },
                          ];

                          const addEvent = [...newEvent, ...oldEvent];
                          localStorage.setItem(
                            "toDoEvents",
                            JSON.stringify(addEvent)
                          );
                          setToDoTesks(addEvent);
                          setShowModal(false);
                          router.push(`/${addingType}List`);
                        }}
                      >
                        Save
                      </button>
                    ),
                  }[addingType]
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default AddEventModal;
