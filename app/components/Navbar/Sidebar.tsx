import Link from "next/link";
import React from "react";

const Sidebar = ({
  sidebarMenuList,
}: {
  sidebarMenuList: {
    displayName: string;
    pathName: string;
  }[];
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col">
        {sidebarMenuList.map((data, index) => {
          return (
            <Link key={index} href={data.pathName} className="p-3 text-center bg-slate-100 mb-2 rounded-lg md:hover:bg-slate-200">
              {data.displayName}
            </Link>
          );
        })}
      </div>
      <div className="flex-1 bg-slate-100 rounded-lg"></div>
      <div className="flex flex-col flex-initial">
        <Link href={"#"} className="p-3 text-center bg-slate-100 mt-2 rounded-lg md:hover:bg-slate-200">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
