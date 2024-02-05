import clsx from "clsx";
import React, { Dispatch, SetStateAction, useState } from "react";
import AddEventModal from "./AddEventModal";

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

type Modal = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  getDataToModal: { allDay: boolean; startStr: string; endStr: string };
  defaultCheckId: string;
  calendarEvents: {}[];
  setCalendarEvents: Dispatch<SetStateAction<{}[]>>;
};

const Modal = ({
  setShowModal,
  getDataToModal,
  defaultCheckId,
  calendarEvents,
  setCalendarEvents,
}: Modal) => {
  const [eventTitle, setEventTitle] = useState("");
  const [defaultType, setDefaultType] = useState(defaultCheckId);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-[315px]">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
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
                          "bg-slate-400":
                            defaultType === "Add_" + list.displayName,
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
              {
                {
                  Add_Schedule: (
                    <AddEventModal
                      setShowModal={setShowModal}
                      getDataToModal={getDataToModal}
                      defaultCheckId={"Schedule"}
                      calendarEvents={calendarEvents}
                      setCalendarEvents={setCalendarEvents}
                    />
                  ),
                }[defaultCheckId]
              }
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;
