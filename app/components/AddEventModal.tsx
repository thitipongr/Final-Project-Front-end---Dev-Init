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
  const [defaultType, setDefaultType] = useState(defaultCheckId);
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

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-[315px]">
          <div className="border-0 rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="relative p-2 flex-auto space-y-2">
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
                          "bg-slate-400": defaultType === list.displayName,
                        }
                      )}
                      onClick={() => {
                        setDefaultType(list.displayName);
                      }}
                    >
                      {list.displayName}
                    </button>
                  );
                })}
              </div>
              <div className="">
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
                          new Date(endPeriod).getTime()
                        )
                          setEndPeriod(e.target.value);
                      }}
                    />
                    <input
                      className="px-3 py-2 w-full border rounded-xl focus:outline-none focus:border-cyan-900"
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
                          : startPeriod + "T00:00"
                      }
                      onChange={(e) => {
                        setStartPeriod(e.target.value);
                        if (
                          new Date(e.target.value).getTime() >
                          new Date(endPeriod).getTime()
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
                        startPeriod.split("T")[0] === endPeriod.split("T")[0]
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

              <textarea
                rows={3}
                className="px-3 py-2 w-full border rounded-xl focus:outline-none focus:border-cyan-900 resize-none"
                placeholder="Add description"
                value={eventDescription}
                onChange={(e) => {
                  setEventDescription(e.target.value);
                }}
              ></textarea>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                disabled={
                  eventTitle !== "" && startPeriod < endPeriod ? false : true
                }
                className={
                  "bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none ease-linear transition-all duration-150 disabled:opacity-50"
                }
                type="button"
                onClick={() => {
                  const oldEvent = calendarEvents;
                  const newEvent = [
                    {
                      title: eventTitle,
                      start: allDayState
                        ? new Date(startPeriod).toLocaleDateString("en-CA")
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
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default AddEventModal;
