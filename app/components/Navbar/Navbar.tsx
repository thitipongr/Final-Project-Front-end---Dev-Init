"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import SearchModal from "./SearchModal";

const pageList = [
  {
    displayName: "Schedule",
    pathName: "/Schedule",
  },
  {
    displayName: "Journal",
    pathName: "/Journal",
  },
  {
    displayName: "To Do List",
    pathName: "/ToDoList",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [expandMenuState, setExpandMenuState] = useState(false);

  const expandMenuHandler = () => {
    expandMenuState === false
      ? setExpandMenuState(true)
      : setExpandMenuState(false);
  };

  const [expandProfileState, setExpandProfileState] = useState(false);
  const expandProfileHandler = () => {
    expandProfileState === false
      ? setExpandProfileState(true)
      : setExpandProfileState(false);
  };

  const [darkModeSwicth, setDarkModeSwicth] = useState(false);

  const darkModeSwicthHandler = () => {
    if (!document.documentElement.classList.contains("dark"))
      setDarkModeSwicth(true),
        localStorage.setItem("darkTheme", "true"),
        document.documentElement.classList.add("dark");
    else
      setDarkModeSwicth(false),
        localStorage.setItem("darkTheme", "false"),
        document.documentElement.classList.remove("dark");
  };

  useEffect(() => {
    setDarkModeSwicth(localStorage.getItem("darkTheme") === "true");
    if (darkModeSwicth) document.documentElement.classList.add("dark");
  }, [darkModeSwicth]);

  const [searchModal, setSearchModal] = useState(false);
  const router = useRouter();

  return (
    <div className="flex justify-center border-b z-10 lg:px-7 dark:text-neutral-50">
      <div className="flex flex-row justify-between items-center h-[60px] container">
        <div
          className={clsx(
            "flex lg:hidden w-[60px] items-center justify-center h-full",
            {
              "bg-gray-200 dark:bg-slate-800": expandMenuState,
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
            strokeWidth="1.5"
            stroke="currentColor"
            className={clsx("w-6 h-6", {
              hidden: !expandMenuState,
            })}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="hidden lg:flex">
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
        <div className="flex lg:hidden">
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
        <div className="flex flex-row items-center pr-5 lg:pr-0">
          <div
            className={clsx(
              "items-center py-5 pt-4 lg:flex lg:flex-row lg:static lg:bg-white lg:py-0 lg:mr-4 bg-white dark:bg-gray-900",
              {
                hidden: !expandMenuState,
                "flex flex-col fixed top-[60px] left-0 right-0 bg-gray-200 mr-[80px] lg:mx-0 rounded-br-lg":
                  expandMenuState,
              }
            )}
          >
            {pageList.map((data, index) => {
              return (
                <Link
                  key={index}
                  href={data.pathName}
                  className={clsx(
                    "p-2 w-10/12 mx-1 my-1 lg:w-auto lg:hover:bg-gray-100 lg:hover:rounded-lg hover:dark:bg-slate-700",
                    {
                      "bg-gray-50 rounded-lg lg:bg-gray-300 hover:lg:bg-gray-300 dark:bg-slate-800 hover:dark:bg-slate-700":
                        pathname === data.pathName ||
                        (pathname === "/" && data.displayName === "Schedule"),
                    }
                  )}
                >
                  {data.displayName}
                </Link>
              );
            })}
            <div className="pt-2 w-10/12 lg:pt-0 lg:pb-0 lg:w-auto">
              <button
                className="rounded-lg border lg:mx-3 py-2 px-3 w-full flex flex-row hover:bg-gray-100 hover:dark:bg-slate-700 dark:border-slate-700"
                onClick={() => {
                  setSearchModal(true);
                  router.push("/ToDoList");
                }}
              >
                <div className="w-full text-left">To Do search...</div>
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
          <div className="relative">
            <Image
              onClick={expandProfileHandler}
              src={"https://avatars.githubusercontent.com/u/144009672?v=4"}
              alt="Thitipong"
              width={40}
              height={40}
              priority={true}
              className="rounded-full z-50 lg:ml-3"
            />
            <div
              className={clsx(
                "items-center w-10 py-5 pt-12 space-y-7 lg:ml-3 dark:bg-slate-800",
                {
                  hidden: !expandProfileState,
                  "flex flex-col fixed top-[30px] bg-gray-200 rounded-b-full -z-10":
                    expandProfileState,
                }
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mt-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={clsx("w-6 h-6", {
                  hidden: darkModeSwicth,
                  flex: !darkModeSwicth,
                })}
                onClick={darkModeSwicthHandler}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={clsx("w-6 h-6", {
                  hidden: !darkModeSwicth,
                  flex: darkModeSwicth,
                })}
                onClick={darkModeSwicthHandler}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>

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
                  d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                />
              </svg>

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
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {searchModal ? (
        <SearchModal
          setExpandMenuState={setExpandMenuState}
          setSearchModal={setSearchModal}
        />
      ) : null}
    </div>
  );
};

export default Navbar;
