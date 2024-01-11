"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

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
  const [expandMenuState, setExpandMenuState] = useState(false);

  const expandMenuHandler = () => {
    expandMenuState === false
      ? setExpandMenuState(true)
      : setExpandMenuState(false);
  };

  return (
    <div className="flex justify-center border-b pr-5">
      <div className="flex flex-row justify-between items-center h-[60px] container">
        <div
          className={clsx(
            "flex sm:hidden w-[60px] items-center justify-center h-full",
            {
              "bg-gray-200": expandMenuState,
            }
          )}
          onClick={expandMenuHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={clsx("w-6 h-6", {
              hidden: expandMenuState,
            })}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className={clsx("w-6 h-6", {
              hidden: !expandMenuState,
            })}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="hidden sm:flex">
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
        <div className="flex sm:hidden">
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
          <div className="pl-1">PIM</div>
        </div>
        <div className="flex flex-row items-center">
          <div
            className={clsx(
              "items-center sm:flex sm:flex-row sm:static sm:bg-white",
              {
                hidden: !expandMenuState,
                "flex flex-col fixed top-[60px] left-0 right-0 bg-gray-200 mr-[80px] sm:mx-0 rounded-br-xl z-10":
                  expandMenuState,
              }
            )}
          >
            {pageList.map((data, index) => {
              return (
                <Link key={index} href={data.pathName} className="pt-6 sm:mx-1 sm:pt-0 sm:px-2">
                  {data.displayName}
                </Link>
              );
            })}
            <div className="pt-6 pb-5 sm:pt-0 sm:pb-0">
              <button className="rounded-lg border mx-3 py-2 px-3 w-52 flex flex-row hover:bg-gray-100">
                <div className="w-full text-left">Quick search...</div>
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
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <Image
            src={"https://avatars.githubusercontent.com/u/144009672?v=4"}
            alt="Thitipong"
            width={40}
            height={40}
            className="rounded-full sm:ml-3"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
