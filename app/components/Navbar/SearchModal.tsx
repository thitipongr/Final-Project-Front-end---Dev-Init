import { getDateMeta } from "@fullcalendar/core/internal";
import clsx from "clsx";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ToDoCard from "../ToDoList/ToDoCard";
import { useRouter } from "next/navigation";
import ShowToDoEventModal from "../ToDoList/ShowToDoEventModal";

type SearchModal_type = {
  setExpandMenuState: Dispatch<SetStateAction<boolean>>;
  setSearchModal: Dispatch<SetStateAction<boolean>>;
};

const SearchModal = ({
  setSearchModal,
  setExpandMenuState,
}: SearchModal_type) => {
  const [searchTxt, setSearchTxt] = useState("");
  const [toDoTesks, setToDoTesks] = useState([{}]);

  const [SendDataToShowModal, setSendDataToShowModal] = useState({
    id: "",
    title: "",
    dueDateState: false,
    dueDate: "",
    description: "",
    teskState: "",
    archive: false,
  });
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    setToDoTesks(JSON.parse(localStorage.getItem("toDoEvents") || "[{}]"));
  }, []);

  const router = useRouter();
  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none z-10">
      <div className="relative w-[315px] z-50">
        <div className="border-0 rounded-lg relative flex flex-col w-full h-[400px] bg-white dark:bg-slate-900 dark:text-white outline-none focus:outline-none">
          <div className={clsx("relative p-2 flex flex-col space-y-2 h-full")}>
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                placeholder="Search..."
                className={clsx(
                  "w-full py-1 border-b focus:outline-none focus:border-cyan-900 dark:bg-slate-900 px-1"
                )}
                value={searchTxt}
                onChange={(e) => {
                  setSearchTxt(e.target.value);
                }}
                autoFocus
              />
            </div>
            <div className="flex-1 relative">
              {Object.keys(toDoTesks[0] || {}).length ? (
                <div className="flex flex-col absolute h-full w-full space-y-2 overflow-y-auto">
                  {toDoTesks
                    .filter(
                      (data: {
                        id?: string;
                        title?: string;
                        dueDateState?: boolean;
                        dueDate?: string;
                        description?: string;
                        teskState?: string;
                        archive?: boolean;
                      }) => {
                        return (data.title || "")
                          .toLowerCase()
                          .includes(searchTxt.toLowerCase());
                      }
                    )
                    .map(
                      (
                        toDoTesks: {
                          id?: string;
                          title?: string;
                          dueDateState?: boolean;
                          dueDate?: string;
                          description?: string;
                          teskState?: string;
                          archive?: boolean;
                        },
                        index
                      ) => {
                        return (
                          <button
                            key={index}
                            onClick={() => {
                              router.push(
                                `/ToDoList?hlTodo=${toDoTesks.id}&hlTodoState=${toDoTesks.teskState}`
                              );
                              setSearchModal(false);
                              setExpandMenuState(false);
                            }}
                          >
                            <ToDoCard
                              toDoTesks={toDoTesks}
                              setState={{
                                setSendDataToShowModal,
                                setShowDetailModal,
                              }}
                            />
                          </button>
                        );
                      }
                    )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div
        className="opacity-80 fixed inset-0 z-40 bg-black"
        onClick={() => setSearchModal(false)}
      ></div>
    </div>
  );
};

export default SearchModal;
