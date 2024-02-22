import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col h-full space-y-2">
      <button
        className="w-full bg-gray-200 rounded-lg p-2 font-bold"
        // onClick={() => setShowAddingModal(true)}
      >
        Add ToDo
      </button>
      <div className="flex h-full justify-between space-x-2">
        <div className="w-full rounded-lg border">
          <div className="border-b px-2 py-2 bg-gray-100 font-bold text-center">
            ToDo
          </div>
          <div className="p-2"></div>
        </div>
        <div className="w-full rounded-lg border">
          <div className="border-b px-2 py-2 bg-gray-100 font-bold text-center">
            Doing
          </div>
        </div>
        <div className="w-full rounded-lg border">
          <div className="border-b px-2 py-2 bg-gray-100 font-bold text-center">
            Done
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
