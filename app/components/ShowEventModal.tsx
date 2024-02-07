import React, { Dispatch, SetStateAction } from "react";

type ShowEventModal = { setShowDetailModal: Dispatch<SetStateAction<boolean>> };

const ShowEventModal = ({ setShowDetailModal }: ShowEventModal) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-[315px] z-50">
          <div className="border-0 rounded-lg relative flex flex-col w-full h-[400px] bg-white outline-none focus:outline-none"></div>
        </div>
        <div
          className="opacity-25 fixed inset-0 z-40 bg-black"
          onClick={() => setShowDetailModal(false)}
        ></div>
      </div>
    </>
  );
};

export default ShowEventModal;
