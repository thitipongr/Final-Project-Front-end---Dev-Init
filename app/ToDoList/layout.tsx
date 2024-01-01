import React from "react";
import Sidebar from "../components/Sidebar";

const sidebarMenuList = [
  {
    displayName: "ToDoList-Menu#1",
    pathName: "#",
  },
  {
    displayName: "ToDoList-Menu#2",
    pathName: "#",
  },
  {
    displayName: "ToDoList-Menu#3",
    pathName: "#",
  },
];

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-12 h-full">
      <div className="col-span-2">
        <Sidebar sidebarMenuList={sidebarMenuList} />
      </div>
      <div className="col-span-10">{children}</div>
    </div>
  );
};

export default layout;
