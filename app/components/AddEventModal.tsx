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
  sendDateStr: string;
  defaultCheckId: string;
};

const AddEventModal = ({
  setShowModal,
  sendDateStr,
  defaultCheckId,
}: AddEventModal) => {
  const [defaultType, setDefaultType] = useState(defaultCheckId);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <input
                type="text"
                placeholder="Add title"
                className="w-full py-1 border-b focus:outline-none focus:border-cyan-900"
              />
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
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

              <input type="datetime-local" />
              <input type="datetime-local" />
              <textarea
                cols={30}
                rows={10}
                placeholder="Add description"
              ></textarea>

              <p className="my-4 text-blueGray-500 text-lg">{sendDateStr}</p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
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
                onClick={() => setShowModal(false)}
              >
                Save Changes
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
