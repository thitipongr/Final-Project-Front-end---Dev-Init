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
      <div className="relative flex-auto space-y-2">
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
                value={startPeriod.replace(":00+07:00", "")}
                onChange={(e) => {
                  setStartPeriod(e.target.value);
                }}
              />
              <input
                className="px-3 py-2 w-full border rounded-xl focus:outline-none focus:border-cyan-900"
                type="datetime-local"
                value={
                  startPeriod.split("T")[0] === endPeriod.split("T")[0]
                    ? endPeriod.includes("T")
                      ? endPeriod.replace(":00+07:00", "")
                      : endPeriod.replace(":00", ":30").replace(":30+07:00", "")
                    : endPeriod.replace(":00+07:00", "")
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
      <div className="flex items-center justify-end pt-2 border-t border-solid border-blueGray-200 rounded-b">
        <button
          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
        <button
          disabled={eventTitle === "" ? true : false}
          className={clsx(
            "bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 disabled:opacity-50",
            {}
          )}
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
                  : startPeriod.split("T")[1] === endPeriod.split("T")[1] &&
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
    </>
  );
};

export default AddEventModal;
