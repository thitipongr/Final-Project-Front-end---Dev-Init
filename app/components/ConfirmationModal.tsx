import React, { Dispatch, SetStateAction } from "react";

type confirmationModal_type = {
  setConfirmState: Dispatch<SetStateAction<boolean>>;
  eventTitle: string;
  confirmationFrom: string;
  setConfirmationTogle: Dispatch<SetStateAction<boolean>>;
};

const ConfirmationModal = ({
  setConfirmState,
  eventTitle,
  confirmationFrom,
  setConfirmationTogle,
}: confirmationModal_type) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-[300px]">
          <div className="border-0 rounded-lg relative flex flex-col w-full min-h-[200px] bg-white outline-none focus:outline-none dark:bg-slate-900">
            <div className="flex-none bg-red-500 rounded-t-lg px-2 py-3 text-white font-bold uppercase">
              {`Delete ${confirmationFrom}`}
            </div>
            <div className="flex flex-1 p-2 items-center">{`Delete ${confirmationFrom}: "${eventTitle}"?`}</div>
            <div className="flex-none flex p-2 border-t">
              <button
                className="w-full text-red-500 background-transparent font-bold uppercase py-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                onClick={() => {
                  setConfirmationTogle(false);
                }}
              >
                Cancle
              </button>
              <button
                className={
                  "w-full bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150 disabled:opacity-50"
                }
                onClick={() => {
                  setConfirmState(true);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ConfirmationModal;
