import React from "react";
import Sidebar from "../components/Sidebar";

const sidebarMenuList = [
  {
    displayName: "Schedule-Menu#1",
    pathName: "#",
  },
  {
    displayName: "Schedule-Menu#2",
    pathName: "#",
  },
  {
    displayName: "Schedule-Menu#3",
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
