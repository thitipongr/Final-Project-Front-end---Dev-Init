import Link from "next/link";
import React from "react";

const pageList = [
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

const Navbar = () => {
  return (
    <div className="flex justify-center border">
      <div className="flex flex-row justify-between items-center h-[60px] container">
        <div>
          <Link href={"/"} className="flex flex-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
              />
            </svg>
            <div className="pl-1">Personal Information Management</div>
          </Link>
        </div>
        <div>
          {pageList.map((data, index) => {
            return (
              <Link key={index} href={data.pathName} className="mx-1 px-2">
                {data.displayName}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
