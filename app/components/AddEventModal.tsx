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

const timeIntervals = [
  "12:00AM",
  "12:15AM",
  "12:30AM",
  "12:45AM",
  "01:00AM",
  "01:15AM",
  "01:30AM",
  "01:45AM",
  "02:00AM",
  "02:15AM",
  "02:30AM",
  "02:45AM",
  "03:00AM",
  "03:15AM",
  "03:30AM",
  "03:45AM",
  "04:00AM",
  "04:15AM",
  "04:30AM",
  "04:45AM",
  "05:00AM",
  "05:15AM",
  "05:30AM",
  "05:45AM",
  "06:00AM",
  "06:15AM",
  "06:30AM",
  "06:45AM",
  "07:00AM",
  "07:15AM",
  "07:30AM",
  "07:45AM",
  "08:00AM",
  "08:15AM",
  "08:30AM",
  "08:45AM",
  "09:00AM",
  "09:15AM",
  "09:30AM",
  "09:45AM",
  "10:00AM",
  "10:15AM",
  "10:30AM",
  "10:45AM",
  "11:00AM",
  "11:15AM",
  "11:30AM",
  "11:45AM",
  "12:00PM",
  "12:15PM",
  "12:30PM",
  "12:45PM",
  "01:00PM",
  "01:15PM",
  "01:30PM",
  "01:45PM",
  "02:00PM",
  "02:15PM",
  "02:30PM",
  "02:45PM",
  "03:00PM",
  "03:15PM",
  "03:30PM",
  "03:45PM",
  "04:00PM",
  "04:15PM",
  "04:30PM",
  "04:45PM",
  "05:00PM",
  "05:15PM",
  "05:30PM",
  "05:45PM",
  "06:00PM",
  "06:15PM",
  "06:30PM",
  "06:45PM",
  "07:00PM",
  "07:15PM",
  "07:30PM",
  "07:45PM",
  "08:00PM",
  "08:15PM",
  "08:30PM",
  "08:45PM",
  "09:00PM",
  "09:15PM",
  "09:30PM",
  "09:45PM",
  "10:00PM",
  "10:15PM",
  "10:30PM",
  "10:45PM",
  "11:00PM",
  "11:15PM",
  "11:30PM",
  "11:45PM",
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
  console.log(getDataToModal);

  const [defaultType, setDefaultType] = useState(defaultCheckId);
  const [startDate, setStartDate] = useState(
    new Date(getDataToModal.startStr).toLocaleDateString("en-CA")
  );
  const [endDate, setEndDate] = useState(
    new Date(
      getDataToModal.allDay
        ? new Date(getDataToModal.endStr).setDate(
            new Date(getDataToModal.endStr).getDate() - 1
          )
        : getDataToModal.endStr
    ).toLocaleDateString("en-CA")
  );

  const [inDate, setInDate] = useState(
    new Date(getDataToModal.startStr).toLocaleDateString("en-CA")
  );
  const [inStartTime, setInStartTime] = useState(
    new Date(getDataToModal.startStr)
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(" ", "")
  );
  const [inEndTime, setInEndTime] = useState(
    new Date(getDataToModal.endStr)
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(" ", "")
  );

  const [handleAllDayState, setHandleAllDayState] = useState(
    getDataToModal.allDay
  );

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
                {handleAllDayState ? (
                  <div className="space-y-2">
                    <input
                      className="px-3 py-2 w-full border rounded-xl focus:outline-none focus:border-cyan-900"
                      type="date"
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                      }}
                    />
                    <input
                      className="px-3 py-2 w-full border rounded-xl focus:outline-none focus:border-cyan-900"
                      type="date"
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                      }}
                    />
                  </div>
                ) : startDate === endDate ? (
                  <div className="space-y-2">
                    <input
                      className="px-3 py-2 w-full border rounded-xl focus:outline-none focus:border-cyan-900"
                      type="date"
                      value={inDate}
                      onChange={(e) => {
                        setInDate(e.target.value);
                      }}
                    />
                    <select
                      className="px-3 py-2 h-[44px] w-1/2 border rounded-xl focus:outline-none focus:border-cyan-900"
                      name=""
                      id=""
                      value={inStartTime}
                      onChange={(e) => {
                        setInStartTime(e.target.value);
                      }}
                    >
                      {timeIntervals.map((data) => {
                        return (
                          <option key={data} value={data}>
                            {data}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      className="px-3 py-2 h-[44px] w-1/2 border rounded-xl focus:outline-none focus:border-cyan-900"
                      name=""
                      id=""
                      value={inEndTime}
                      onChange={(e) => {
                        setInEndTime(e.target.value);
                      }}
                    >
                      {timeIntervals.map((data) => {
                        return (
                          <option key={data} value={data}>
                            {data}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <input
                      className="px-3 py-2 w-full border rounded-xl focus:outline-none focus:border-cyan-900"
                      type="datetime-local"
                      value={getDataToModal.startStr.replace(":00+07:00", "")}
                      onChange={(e) => {
                        setInDate(e.target.value);
                      }}
                    />
                    <input
                      className="px-3 py-2 w-full border rounded-xl focus:outline-none focus:border-cyan-900"
                      type="datetime-local"
                      value={getDataToModal.endStr.replace(":00+07:00", "")}
                      onChange={(e) => {
                        setInDate(e.target.value);
                      }}
                    />
                  </div>
                )}
                <input
                  className="mt-3 mr-1"
                  type="checkbox"
                  id="allDayState"
                  defaultChecked={handleAllDayState ? true : false}
                  onChange={(e) => {
                    setHandleAllDayState(e.target.checked);
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
                  const newEvent = [{ title: eventTitle, date: startDate }];
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
