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
    <div>
      <Sidebar sidebarMenuList={sidebarMenuList} />
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
};

export default layout;
