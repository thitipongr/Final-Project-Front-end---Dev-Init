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
    <div className="flex flex-col">
      {sidebarMenuList.map((data, index) => {
        return (
          <Link key={index} href={data.pathName} className="mx-1 px-2">
            {data.displayName}
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
