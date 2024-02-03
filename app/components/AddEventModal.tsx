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
    getDataToModal.allDay
      ? new Date(getDataToModal.startStr).toLocaleDateString("en-CA")
      : getDataToModal.startStr
  );
  const [endPeriod, setEndPeriod] = useState(
    getDataToModal.allDay
      ? new Date(
          new Date(getDataToModal.endStr).setDate(
            new Date(getDataToModal.endStr).getDate() - 1
          )
        ).toLocaleDateString("en-CA")
      : getDataToModal.endStr
  );

  const [allDayState, setAllDayState] = useState(getDataToModal.allDay);

  const [eventTitle, setEventTitle] = useState("");

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-[315px]">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="relative p-2 flex-auto space-y-2">
              <input
                type="text"
                placeholder="Add title"
                className="w-full py-1 border-b focus:outline-none focus:border-cyan-900"
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
                      }}
                    />
                    <input
                      className="px-3 py-2 w-full border rounded-xl focus:outline-none focus:border-cyan-900"
                      type="date"
                      value={endPeriod.split("T")[0]}
                      onChange={(e) => {
                        setEndPeriod(e.target.value);
                      }}
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
                          : `${startPeriod}T12:00`
                      }
                      onChange={(e) => {
                        setStartPeriod(e.target.value);
                      }}
                    />
                    <input
                      className="px-3 py-2 w-full border rounded-xl focus:outline-none focus:border-cyan-900"
                      type="datetime-local"
                      value={
                        endPeriod.includes("T")
                          ? endPeriod.replace(":00+07:00", "")
                          : `${endPeriod}T12:00`
                      }
                      onChange={(e) => {
                        setEndPeriod(e.target.value);
                      }}
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
                <label htmlFor="allDayState">All day</label>
              </div>

              <textarea
                rows={3}
                className="px-3 py-2 w-full border rounded-xl focus:outline-none focus:border-cyan-900"
                placeholder="Add description"
              ></textarea>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
                      allDay: allDayState,
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
