import clsx from "clsx";
import React, { Dispatch, SetStateAction } from "react";

type ToDoCard_type = {
  toDoTesks: {
    id?: string;
    title?: string;
    dueDateState?: boolean;
    dueDate?: string;
    description?: string;
    teskState?: string;
    archive?: boolean;
  };
  setState: {
    setSendDataToShowModal: Dispatch<
      SetStateAction<{
        id: string;
        title: string;
        dueDateState: boolean;
        dueDate: string;
        description: string;
        teskState: string;
        archive: boolean;
      }>
    >;
    setShowDetailModal: Dispatch<SetStateAction<boolean>>;
  };
};

const ToDoCard = ({ toDoTesks, setState }: ToDoCard_type) => {
  return (
    <div
      className="w-full rounded-lg border select-none"
      onClick={() => {
        const packData = {
          id: toDoTesks.id || "",
          title: toDoTesks.title || "",
          dueDateState: toDoTesks.dueDateState || false,
          dueDate: toDoTesks.dueDate || "",
          description: toDoTesks.description || "",
          teskState: toDoTesks.teskState || "",
          archive: toDoTesks.archive || false,
        };

        setState.setSendDataToShowModal(packData);
        setState.setShowDetailModal(true);
      }}
    >
      <div
        className={clsx("flex rounded-lg p-2 bg-gray-50 truncate", {
          "border-b rounded-b-none": toDoTesks.description !== "",
        })}
      >
        <div className="flex flex-1 h-[40px] font-bold items-center truncate">
          <div className="truncate">{toDoTesks.title}</div>
        </div>
        {toDoTesks.dueDateState ? (
          <div
            className={clsx("flex-initial truncate p-2 w-min rounded-lg ml-2", {
              "bg-red-300 border-red-600":
                new Date(toDoTesks.dueDate || 0).getTime() <=
                new Date().getTime(),
              "bg-yellow-200 border-yellow-500":
                new Date(toDoTesks.dueDate || 0).getTime() >
                  new Date().getTime() &&
                new Date(toDoTesks.dueDate || 0).getTime() <
                  new Date().getTime() + 86400000,
              "bg-green-200 border-green-500":
                new Date(toDoTesks.dueDate || 0).getTime() >
                new Date().getTime() + 86400000,
            })}
          >
            {new Date(toDoTesks.dueDate || 0)
              .toLocaleString("en-US")
              .replace(":00", "")}
          </div>
        ) : null}
      </div>
      <div
        className={clsx("w-full space-y-2", {
          "p-2": toDoTesks.description !== "",
        })}
      >
        {toDoTesks.description !== "" ? (
          <div className="truncate text-left">{toDoTesks.description}</div>
        ) : null}
      </div>
    </div>
  );
};

export default ToDoCard;
