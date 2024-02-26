import { getDateMeta } from "@fullcalendar/core/internal";
import clsx from "clsx";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

type ShowToDoEventModal_type = {
  setShowDetailModal: Dispatch<SetStateAction<boolean>>;
  getDataToModal: {
    id: string;
    title: string;
    dueDateState: boolean;
    dueDate: string;
    description: string;
    teskState: string;
    archive: boolean;
  };
  defaultCheckId: string;
  journalEvents: {
    id?: string;
    date?: string;
    title?: string;
    description?: string;
  }[];

  setJournalEvents: Dispatch<SetStateAction<{}[]>>;
};

const ShowToDoEventModal = ({
  setShowDetailModal,
  getDataToModal,
  defaultCheckId,
  journalEvents,
  setJournalEvents,
}: ShowToDoEventModal_type) => {
  const [editTogle, setEditTogle] = useState(false);
  const [confirmationTogle, setConfirmationTogle] = useState(false);

  const [eventTitle, setEventTitle] = useState(getDataToModal.title);
  const [toDoDueDateState, setToDoDueDateState] = useState(
    getDataToModal.dueDateState
  );
  const [toDoDueDate, setToDoDueDate] = useState(getDataToModal.dueDate);
  const [toDoDueDate_old, setToDoDueDate_old] = useState(
    getDataToModal.dueDate
  );
  const toDayDate = new Date().toLocaleString("sv-SE").replace(" ", "T");

  const [toDoState, setToDoState] = useState(getDataToModal.teskState);

  const [toDoDescription, setToDoDescription] = useState(
    getDataToModal.description
  );
  const [deleteConfirmState, setDeleteConfirmState] = useState(false);

  useEffect(() => {
    if (deleteConfirmState) {
      const deleteResult = journalEvents.filter(
        (object) => object.id !== getDataToModal.id
      );
      setJournalEvents(deleteResult);
      setShowDetailModal(false);
      localStorage.setItem("journalEvents", JSON.stringify(deleteResult));
    } else {
      setConfirmationTogle(false);
    }
  }, [
    deleteConfirmState,
    journalEvents,
    getDataToModal.id,
    setJournalEvents,
    setShowDetailModal,
  ]);

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
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex">
                  <div className="flex flex-col mr-1 h-[44px] relative">
                    <input
                      className="my-1"
                      type="checkbox"
                      id="dueDateState"
                      defaultChecked={toDoDueDateState}
                      onChange={(e) => {
                        setToDoDueDateState(e.target.checked);
                      }}
                    />
                    <label htmlFor="dueDateState" className="h-full flex">
                      <div className="self-end">Due Date</div>
                    </label>
                  </div>
                  <input
                    type="datetime-local"
                    className="px-3 py-2 border rounded-xl flex-1 focus:outline-none focus:border-cyan-900 disabled:text-gray-400"
                    disabled={!toDoDueDateState}
                    value={
                      toDoDueDateState
                        ? toDoDueDate
                        : toDayDate.split(":")[0] +
                          ":" +
                          toDayDate.split(":")[1]
                    }
                    onChange={(e) => {
                      setToDoDueDate(e.target.value);
                    }}
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    className={clsx(
                      "h-9 px-2 border-0 rounded-lg bg-slate-100 w-full",
                      {
                        "bg-slate-400": toDoState === "ToDo",
                      }
                    )}
                    onClick={() => setToDoState("ToDo")}
                  >
                    ToDo
                  </button>
                  <button
                    className={clsx(
                      "h-9 px-2 border-0 rounded-lg bg-slate-100 w-full",
                      {
                        "bg-slate-400": toDoState === "Doing",
                      }
                    )}
                    onClick={() => setToDoState("Doing")}
                  >
                    Doing
                  </button>
                  <button
                    className={clsx(
                      "h-9 px-2 border-0 rounded-lg bg-slate-100 w-full",
                      {
                        "bg-slate-400": toDoState === "Done",
                      }
                    )}
                    onClick={() => setToDoState("Done")}
                  >
                    Done
                  </button>
                </div>
              </div>
              <div className="flex-1">
                <textarea
                  className="px-3 py-2 w-full h-full border rounded-xl focus:outline-none focus:border-cyan-900 resize-none"
                  placeholder="Add description"
                  value={toDoDescription}
                  onChange={(e) => {
                    setToDoDescription(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="items-start"
                onClick={() => {
                  setConfirmationTogle(true);
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
                  setConfirmState={setDeleteConfirmState}
                  eventTitle={getDataToModal.title}
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

                {editTogle ? (
                  <button
                    disabled={
                      (eventTitle !== "" &&
                        eventTitle !== getDataToModal.title) ||
                      (toDoDueDate.length !== 0 &&
                      toDoDueDate !== toDoDueDate_old
                        ? true
                        : false) ||
                      toDoDescription !== getDataToModal.description
                        ? false
                        : true
                    }
                    className={
                      "w-full bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150 disabled:opacity-50"
                    }
                    type="button"
                    onClick={() => {
                      const event = journalEvents.filter(
                        (value) => Object.keys(value).length !== 0
                      );
                      const editedIndex = event.findIndex(
                        (object) => object.id === getDataToModal.id
                      );
                      const editedEvent = {
                        id: getDataToModal.id,
                        title: eventTitle,
                        date: toDoDueDate,
                        description: toDoDescription,
                      };

                      event[editedIndex] = editedEvent;
                      const addEvent = [...event];

                      setJournalEvents(addEvent);

                      setToDoDueDate_old(toDoDueDate);
                      getDataToModal.title = eventTitle;
                      getDataToModal.description = toDoDescription;
                      localStorage.setItem(
                        "journalEvents",
                        JSON.stringify(event)
                      );

                      setEditTogle(false);
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ShowToDoEventModal;
