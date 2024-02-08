import clsx from "clsx";
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
};

const AddEventModal = ({
  setShowModal,
  getDataToModal,
  defaultCheckId,
  calendarEvents,
  setCalendarEvents,
}: AddEventModal) => {
  const [addingType, setAddingType] = useState(defaultCheckId);

  // Schedule
  const [startPeriod, setStartPeriod] = useState(
    !getDataToModal.startStr.includes("T")
      ? `${getDataToModal.startStr}T00:00`
      : getDataToModal.startStr
  );
  const [endPeriod, setEndPeriod] = useState(
    !getDataToModal.endStr.includes("T")
      ? `${new Date(
          new Date(getDataToModal.endStr).setDate(
            new Date(getDataToModal.endStr).getDate() - 1
          )
        ).toLocaleDateString("en-CA")}T00:${
          startPeriod.split("T")[0] ===
          new Date(
            new Date(getDataToModal.endStr).setDate(
              new Date(getDataToModal.endStr).getDate() - 1
            )
          )
            .toLocaleDateString("en-CA")
            .split("T")[0]
            ? "30"
            : "00"
        }`
      : getDataToModal.endStr
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
        <div className="relative w-[315px] ">
          <div className="border-0 rounded-lg relative flex flex-col w-full h-[400px] bg-white outline-none focus:outline-none">
            <div className="relative p-2 flex flex-col space-y-2 h-full">
              <div className="flex flex-col space-y-2">
                <input
                  autoFocus
                  type="text"
                  placeholder="Add title"
                  className={clsx(
                    "w-full py-1 border-b focus:outline-none focus:border-cyan-900",
                    {
                      "border-red-500": eventTitle === "",
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
                                value={startPeriod.split("T")[0]}
                                onChange={(e) => {
                                  setStartPeriod(e.target.value);
                                  if (
                                    new Date(e.target.value).getTime() >
                                      new Date(endPeriod).getTime() ||
                                    isNaN(new Date(endPeriod).getTime()) ||
                                    isNaN(new Date(startPeriod).getTime())
                                  )
                                    setEndPeriod(e.target.value);
                                }}
                              />
                              <input
                                className={clsx(
                                  "px-3 py-2 w-full border rounded-xl focus:outline-none focus:border-cyan-900",
                                  {
                                    "border-red-500": startPeriod >= endPeriod,
                                  }
                                )}
                                type="date"
                                value={endPeriod.split("T")[0]}
                                onChange={(e) => {
                                  setEndPeriod(e.target.value);
                                }}
                                min={startPeriod.split("T")[0]}
                              />
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <input
                                className="px-3 py-2 w-full border rounded-xl focus:outline-none focus:border-cyan-900"
                                type="datetime-local"
                                value={
                                  startPeriod.includes("T")
                                    ? startPeriod.replace(":00+07:00", "")
                                    : startPeriod === ""
                                    ? startPeriod
                                    : startPeriod + "T00:00"
                                }
                                onChange={(e) => {
                                  setStartPeriod(e.target.value);
                                  if (
                                    new Date(e.target.value).getTime() >
                                      new Date(endPeriod).getTime() ||
                                    isNaN(new Date(endPeriod).getTime()) ||
                                    isNaN(new Date(startPeriod).getTime())
                                  )
                                    setEndPeriod(e.target.value);
                                }}
                              />
                              <input
                                className={clsx(
                                  "px-3 py-2 w-full border rounded-xl focus:outline-none focus:border-cyan-900",
                                  {
                                    "border-red-500": startPeriod >= endPeriod,
                                  }
                                )}
                                type="datetime-local"
                                value={
                                  startPeriod.split("T")[0] ===
                                  endPeriod.split("T")[0]
                                    ? endPeriod.includes("T")
                                      ? endPeriod.replace(":00+07:00", "")
                                      : endPeriod + "T00:00"
                                    : endPeriod.includes("T")
                                    ? endPeriod.replace(":00+07:00", "")
                                    : endPeriod + "T00:00"
                                }
                                onChange={(e) => {
                                  setEndPeriod(e.target.value);
                                }}
                                min={startPeriod}
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
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              {
                {
                  Schedule: (
                    <button
                      disabled={
                        eventTitle !== "" &&
                        new Date(startPeriod).getTime() <
                          new Date(endPeriod).getTime()
                          ? false
                          : true
                      }
                      className={
                        "bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none ease-linear transition-all duration-150 disabled:opacity-50"
                      }
                      type="button"
                      onClick={() => {
                        const oldEvent = calendarEvents.filter(
                          (value) => Object.keys(value).length !== 0
                        );
                        const newEvent = [
                          {
                            id: new Date().getTime(),
                            title: eventTitle,
                            start: allDayState
                              ? new Date(startPeriod).toLocaleDateString(
                                  "en-CA"
                                )
                              : new Date(startPeriod),
                            end: allDayState
                              ? new Date(endPeriod).setDate(
                                  new Date(endPeriod).getDate() + 1
                                )
                              : new Date(endPeriod),
                            allDay: allDayState
                              ? allDayState
                              : startPeriod.split("T")[1] ===
                                  endPeriod.split("T")[1] &&
                                endPeriod.split("T")[1] === "00:00"
                              ? true
                              : false,
                            description: eventDescription,
                          },
                        ];
                        const addEvent = [...oldEvent, ...newEvent];

                        setCalendarEvents(addEvent);
                        setShowModal(false);
                      }}
                    >
                      Save
                    </button>
                  ),
                  Journal: (
                    <button
                      disabled={
                        eventTitle !== "" &&
                        new Date(startPeriod).getTime() <
                          new Date(endPeriod).getTime()
                          ? false
                          : true
                      }
                      className={
                        "bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none ease-linear transition-all duration-150 disabled:opacity-50"
                      }
                      type="button"
                      onClick={() => {
                        setShowModal(false);
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
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default AddEventModal;
