import { getDateMeta } from "@fullcalendar/core/internal";
import clsx from "clsx";
import React, { Dispatch, SetStateAction, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

type ShowEventModal = {
  setShowDetailModal: Dispatch<SetStateAction<boolean>>;
  getDataToModal: {
    id: string;
    allDay: boolean;
    startStr: string;
    endStr: string;
    title: string;
    description: string;
  };
  defaultCheckId: string;
  calendarEvents: {
    id?: string;
    title?: string;
    start?: number;
    end?: number;
    allDay?: boolean;
    description?: string;
  }[];

  setCalendarEvents: Dispatch<SetStateAction<{}[]>>;
};

const ShowEventModal = ({
  setShowDetailModal,
  getDataToModal,
  defaultCheckId,
  calendarEvents,
  setCalendarEvents,
}: ShowEventModal) => {
  const [editTogle, setEditTogle] = useState(false);
  const [confirmationTogle, setConfirmationTogle] = useState(false);

  // Schedule
  const [startPeriod_allDay, setStartPeriod_allDay] = useState(
    getDataToModal.allDay
      ? getDataToModal.startStr
      : getDataToModal.startStr.split("T")[0]
  );
  const [startPeriod_allDay_old, setStartPeriod_allDay_old] = useState(
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
  const [endPeriod_allDay_old, setEndPeriod_allDay_old] = useState(
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
  const [startPeriod_subDay_old, setStartPeriod_subDay_old] = useState(
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
  const [endPeriod_subDay_old, setEndPeriod_subDay_old] = useState(
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

  const [eventTitle, setEventTitle] = useState(getDataToModal.title);
  const [eventDescription, setEventDescription] = useState(
    getDataToModal.description
  );

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-[315px]">
          <div className="border-0 rounded-lg relative flex flex-col w-full h-[400px] bg-white outline-none focus:outline-none">
            <div
              className={clsx("relative p-2 flex flex-col space-y-2 h-full", {
                "pointer-events-none": !editTogle,
              })}
            >
              <div className="flex flex-col space-y-2">
                <input
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

                {/* <div className="space-x-2">
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
                </div> */}
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
                            className="mt-3 mr-1 disabled:text-green-600"
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
                  }[defaultCheckId]
                }
              </div>
            </div>
            <div className="flex items-center justify-between p-2 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="items-start"
                onClick={() => {
                  switch (defaultCheckId) {
                    case "Schedule": {
                      const deleteResult = calendarEvents.filter(
                        (object) => object.id !== getDataToModal.id
                      );
                      // setCalendarEvents(deleteResult);
                      // setShowDetailModal(false);
                      setConfirmationTogle(true);
                    }
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
              {confirmationTogle ? (
                <ConfirmationModal
                  thisEventDetail={getDataToModal}
                  calendarEvents={calendarEvents}
                  setCalendarEvents={setCalendarEvents}
                  setShowDetailModal={setShowDetailModal}
                  confirmationFrom={defaultCheckId}
                  setConfirmationTogle={setConfirmationTogle}
                />
              ) : null}
              <div className="flex flex-row w-3/4">
                {editTogle ? (
                  <button
                    className="w-full text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setEditTogle(false)}
                  >
                    Cancle
                  </button>
                ) : (
                  <button
                    className="w-full text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowDetailModal(false)}
                  >
                    Close
                  </button>
                )}

                {
                  {
                    Schedule: editTogle ? (
                      <button
                        disabled={
                          (eventTitle !== "" &&
                            eventTitle !== getDataToModal.title) ||
                          (allDayState
                            ? startPeriod_allDay.length !== 0 &&
                              endPeriod_allDay.length !== 0 &&
                              (startPeriod_allDay !== startPeriod_allDay_old ||
                                endPeriod_allDay !== endPeriod_allDay_old)
                              ? true
                              : false
                            : startPeriod_subDay.length !== 0 &&
                              endPeriod_subDay.length !== 0 &&
                              (startPeriod_subDay !== startPeriod_subDay_old ||
                                endPeriod_subDay !== endPeriod_subDay_old)
                            ? true
                            : false) ||
                          eventDescription !== getDataToModal.description ||
                          allDayState !== getDataToModal.allDay
                            ? false
                            : true
                        }
                        className={
                          "w-full bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150 disabled:opacity-50"
                        }
                        type="button"
                        onClick={() => {
                          const event = calendarEvents.filter(
                            (value) => Object.keys(value).length !== 0
                          );
                          const editedIndex = event.findIndex(
                            (object) => object.id === getDataToModal.id
                          );
                          const editedEvent = {
                            id: getDataToModal.id,
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
                          };

                          event[editedIndex] = editedEvent;
                          const addEvent = [...event, {}];

                          setCalendarEvents(addEvent);

                          setStartPeriod_allDay_old(startPeriod_allDay);
                          setEndPeriod_allDay_old(endPeriod_allDay);
                          setStartPeriod_subDay_old(startPeriod_subDay);
                          setEndPeriod_subDay_old(endPeriod_subDay);
                          getDataToModal.allDay = allDayState;
                          getDataToModal.title = eventTitle;
                          getDataToModal.description = eventDescription;

                          setEditTogle(false);
                        }}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        disabled={
                          (eventTitle !== "" &&
                            new Date(startPeriod_allDay).getTime() <
                              new Date(endPeriod_allDay).getTime()) ||
                          new Date(startPeriod_subDay).getTime() <
                            new Date(endPeriod_subDay).getTime()
                            ? false
                            : true
                        }
                        className={
                          "w-full bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase text-sm px-6 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150 disabled:opacity-50"
                        }
                        type="button"
                        onClick={() => {
                          setEditTogle(true);
                        }}
                      >
                        Edit
                      </button>
                    ),
                    Journal: (
                      <button
                        // disabled={
                        //   eventTitle !== "" &&
                        //   new Date(startPeriod).getTime() <
                        //     new Date(endPeriod).getTime()
                        //     ? false
                        //     : true
                        // }
                        className={
                          "bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150 disabled:opacity-50"
                        }
                        type="button"
                        onClick={() => {
                          setShowDetailModal(false);
                        }}
                      >
                        Save
                      </button>
                    ),
                  }[defaultCheckId]
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

export default ShowEventModal;