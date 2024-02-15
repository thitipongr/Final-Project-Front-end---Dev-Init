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
};

const AddEventModal = ({
  setShowModal,
  getDataToModal,
  defaultCheckId,
  calendarEvents,
  setCalendarEvents,
  journalEvents,
  setJournalEvents,
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
  const [journalDate, setJournalDate] = useState(
    new Date().toLocaleString("sv-SE").replace(" ", "T").slice(0, -3)
  );

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-[315px]">
          <div className="border-0 rounded-lg relative flex flex-col w-full h-[400px] bg-white outline-none focus:outline-none">
            <div className="relative p-2 flex flex-col space-y-2 h-full">
              <div className="flex flex-col space-y-2">
                <input
                  autoFocus
                  type="text"
                  placeholder="Add title"
                  className={clsx(
                    "w-full py-1 border-b focus:outline-none focus:border-cyan-900 px-1",
                    {
                      "border-red-500 focus:border-red-500": eventTitle === "",
                    }
                  )}
                  value={eventTitle}
                  onChange={(e) => {
                    setEventTitle(e.target.value);
                  }}
                />

                <div className="space-x-2">
                  {pageList.map((list, key) => {
                    return (
                      <button
                        key={key}
                        className={clsx(
                          "h-9 px-2 border-0 rounded-lg bg-slate-100",
                          {
                            "bg-slate-400": addingType === list.displayName,
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
                {
                  {
                    Schedule: (
                      <div className="space-y-2 flex flex-col h-full">
                        <div>
                          {allDayState ? (
                            <div className="space-y-2">
                              <input
                                className="px-3 py-2 w-full border rounded-xl focus:outline-none focus:border-cyan-900"
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
                                  "px-3 py-2 w-full border rounded-xl focus:outline-none focus:border-cyan-900",
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
                                className="px-3 py-2 w-full border rounded-xl focus:outline-none focus:border-cyan-900"
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
                                  "px-3 py-2 w-full border rounded-xl focus:outline-none focus:border-cyan-900",
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
                            defaultChecked={allDayState ? true : false}
                            onChange={(e) => {
                              setAllDayState(e.target.checked);
                            }}
                          />
                          <label htmlFor="allDayState">ALL DAY</label>
                        </div>
                        <div className="flex-1">
                          <textarea
                            className="px-3 py-2 w-full h-full border rounded-xl focus:outline-none focus:border-cyan-900 resize-none"
                            placeholder="Add description"
                            value={eventDescription}
                            onChange={(e) => {
                              setEventDescription(e.target.value);
                            }}
                          ></textarea>
                        </div>
                      </div>
                    ),
                    Journal: (
                      <div className="space-y-2 flex flex-col h-full">
                        <div>
                          <input
                            type="datetime-local"
                            className="px-3 py-2 w-full border rounded-xl focus:outline-none focus:border-cyan-900"
                            value={journalDate}
                            onChange={(e) => {
                              setJournalDate(e.target.value);
                            }}
                            max={journalDate}
                          />
                        </div>
                        <div className="flex-1">
                          <textarea
                            className="px-3 py-2 w-full h-full border rounded-xl focus:outline-none focus:border-cyan-900 resize-none"
                            placeholder="Add description"
                            value={eventDescription}
                            onChange={(e) => {
                              setEventDescription(e.target.value);
                            }}
                          ></textarea>
                        </div>
                      </div>
                    ),
                  }[addingType]
                }
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
                              date: new Date(journalDate).getTime(),
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
                  }[addingType]
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default AddEventModal;
