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
            <Link key={index} href={data.pathName} className="p-3 text-center">
              {data.displayName}
            </Link>
          );
        })}
      </div>
      <div className="flex-1"></div>
      <div className="flex flex-col flex-initial">
        <Link href={"#"} className="p-3 text-center">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
