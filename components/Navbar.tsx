"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import {
  MdOutlineMenu,
  MdOutlineClose,
  MdLogin,
  MdSettings,
} from "react-icons/md";
import { ToggleThemeButton, isDark } from "./ToggleThemeButton";
import { useAuth } from "./AuthContext";
import { useTheme } from "next-themes";
import clsx from "clsx";

const Navbar = ({ fixed }: { fixed: boolean }) => {
  const { theme } = useTheme();
  const [mobileNavMenu, setMobileNavMenu] = useState(false); // Mobile nav menu not showing at the start
  const { user, role } = useAuth();

  return (
    <div>
      <div
        className={clsx(
          "flex flex-col z-50 w-screen shadow-lg backdrop-blur-md bg-background/50",
          fixed ? "fixed top-0" : "",
          mobileNavMenu ? "h-[60vh]" : ""
        )}
      >
        <div
          className={clsx(
            "flex w-full justify-between px-4 md:px-8 lg:px-16 py-4",

            isDark(theme ?? "") ? "border-b-2 border-background-muted" : ""
          )}
        >
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo"
              width="30"
              height="30"
              fetchPriority="high"
            />
          </Link>
          <ul className="hidden lg:flex lg:gap-4 lg:items-center">
            <Link
              href="/#home"
              className="hover:bg-background-hover px-2 py-1 transition rounded-md"
              scroll={false}
            >
              <li>Home</li>
            </Link>
            <Link
              href="/#apps"
              className="hover:bg-background-hover px-2 py-1 transition rounded-md"
              scroll={false}
            >
              <li>Apps</li>
            </Link>
            <Link
              href="/#projects"
              className="hover:bg-background-hover px-2 py-1 transition rounded-md"
              scroll={false}
            >
              <li>Projects</li>
            </Link>
            {user && role === "admin" && (
              <Link
                href="/Admin"
                className="hover:bg-background-hover px-2 py-1 transition rounded-md"
                scroll={false}
              >
                <li>Admin</li>
              </Link>
            )}
            <li>
              <ToggleThemeButton />
            </li>

            {!user && (
              <Link
                href="/Login"
                className="hover:bg-background-hover px-2 py-2 transition rounded-md"
              >
                <MdLogin />
              </Link>
            )}
            {user && (
              <Link
                href="/Login"
                className="hover:bg-background-hover px-2 py-2 transition rounded-md"
              >
                <MdSettings />
              </Link>
            )}
          </ul>
          <div
            className="cursor-pointer lg:hidden"
            onClick={() => {
              setMobileNavMenu(!mobileNavMenu);
            }}
          >
            {mobileNavMenu ? (
              <MdOutlineClose size={25} />
            ) : (
              <MdOutlineMenu size={25} />
            )}
          </div>
        </div>

        <div
          className={clsx(
            "lg:hidden duration-300 overflow-hidden mx-4 flex justify-between z-50 relative",
            mobileNavMenu
              ? "min-h-full border-t border-background-muted"
              : "max-h-0"
          )}
        >
          <ul className="flex flex-col gap-4 mt-4">
            <Link
              href="/#home"
              className="hover:bg-blue-100 dark:hover:bg-black px-2 py-1 rounded-md"
              scroll={false}
              onClick={() => {
                setMobileNavMenu(false);
              }}
            >
              <li>Home</li>
            </Link>
            <Link
              href="/#apps"
              className="hover:bg-blue-100 dark:hover:bg-black px-2 py-1 rounded-md"
              scroll={false}
              onClick={() => {
                setMobileNavMenu(false);
              }}
            >
              <li>Apps</li>
            </Link>
            <Link
              href="/#projects"
              className="hover:bg-blue-100 dark:hover:bg-black px-2 py-1 rounded-md"
              scroll={false}
              onClick={() => {
                setMobileNavMenu(false);
              }}
            >
              <li>Projects</li>
            </Link>
          </ul>
          <ul className="flex flex-col items-center gap-4 mt-4">
            {user && role === "admin" && (
              <Link
                href="/Admin"
                className="hover:bg-blue-100 dark:hover:bg-black px-2 py-1 rounded-md my-2"
                scroll={false}
                onClick={() => {
                  setMobileNavMenu(false);
                }}
              >
                <li>Admin</li>
              </Link>
            )}
            <li>
              <ToggleThemeButton className="px-2" />
            </li>
            {!user && (
              <Link
                href="/Login"
                className="hover:bg-blue-100 dark:hover:bg-black rounded-md my-2 pr-1"
              >
                <MdLogin />
              </Link>
            )}
            {user && (
              <Link
                href="/Login"
                className="hover:bg-blue-100 dark:hover:bg-black px-2 py-2 rounded-md my-2"
              >
                <MdSettings />
              </Link>
            )}
          </ul>
        </div>
      </div>
      {mobileNavMenu && (
        <div
          className={"fixed inset-x-0 bottom-0 bg-black/20 z-40 h-[40vh]"}
          onClick={() => setMobileNavMenu(false)}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
