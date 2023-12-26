import React from "react";
import Sidebar from "../components/Sidebar";

const sidebarMenuList = [
  {
    displayName: "Schedule",
    pathName: "Schedule",
  },
  {
    displayName: "Journal",
    pathName: "Journal",
  },
  {
    displayName: "To Do List",
    pathName: "ToDoList",
  },
];

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <Sidebar sidebarMenuList={sidebarMenuList} />
      </div>
      <div className="flex-grow md:overflow-y-auto col-span-10">{children}</div>
    </div>
  );
};

export default layout;
