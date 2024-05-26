"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  MdOutlineMenu,
  MdOutlineClose,
  MdLogout,
  MdLogin,
  MdSettings,
} from "react-icons/md";
import ToggleThemeButton from "./ToggleThemeButton";
import { useAuth } from "./AuthContext";

const Navbar = ({ fixed }: { fixed: boolean }) => {
  const [mobileNavMenu, setMobileNavMenu] = useState(false); // Mobile nav menu not showing at the start
  const { user, logout } = useAuth();
  console.log("Running again");
  console.log(user);

  return (
    <div>
      <div
        className={
          "flex w-full justify-between px-4 md:px-8 lg:px-16 py-4 shadow-lg backdrop-blur-md bg-white/50 dark:bg-white/10 z-50" +
          (fixed ? " fixed top-0" : "")
        }
      >
        <Link href="/">
          <Image src="/logo.png" alt="logo" width="30" height="30" />
        </Link>
        <ul className="hidden lg:flex lg:gap-4 lg:items-center) ">
          <Link
            href="/#home"
            className="hover:bg-blue-100 dark:hover:bg-black px-2 py-1 transition rounded-md"
            scroll={false}
          >
            <li>Home</li>
          </Link>
          <Link
            href="/#apps"
            className="hover:bg-blue-100 dark:hover:bg-black px-2 py-1 transition rounded-md"
            scroll={false}
          >
            <li>Apps</li>
          </Link>
          <Link
            href="/#projects"
            className="hover:bg-blue-100 dark:hover:bg-black px-2 py-1 transition rounded-md"
            scroll={false}
          >
            <li>Projects</li>
          </Link>
          <li>
            <ToggleThemeButton />
          </li>

          {!user && (
            <Link
              href="/Login"
              className="hover:bg-blue-100 dark:hover:bg-black px-2 py-2 transition rounded-md"
            >
              <MdLogin />
            </Link>
          )}
          {user && (
            <Link
              href="/Login"
              className="hover:bg-blue-100 dark:hover:bg-black px-2 py-2 transition rounded-md"
            >
              <MdSettings />
            </Link>
          )}
        </ul>
        <div
          className="cursor-pointer lg:hidden"
          onClick={() => {
            setMobileNavMenu(true);
          }}
        >
          <MdOutlineMenu size={25} />
        </div>
      </div>
      {/* MOBILE NAV MENU */}
      <div
        className={
          mobileNavMenu
            ? "fixed w-full h-screen bg-black/70 top-0 left-0 z-50 transition-all"
            : "z-50"
        }
        onClick={() => setMobileNavMenu(false)}
      >
        <div
          className={
            mobileNavMenu
              ? "absolute left-0 top-0 w-[75%] h-full bg-gradient-to-r from-lime-100 to-orange-100 dark:bg-gradient-to-r dark:from-slate-900 dark:to-emerald-900 ease-in duration-500 z-50"
              : "fixed left-[-100%] w-[75%] top-0 h-full p-10 ease-in duration-500 z-50 bg-gradient-to-r from-lime-100 to-orange-100 dark:bg-gradient-to-r dark:from-emerald-900 dark:to-slate-900"
          }
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex justify-between items-center mx-8 py-4 border-b">
            <Link
              href="/"
              onClick={() => {
                setMobileNavMenu(false);
              }}
            >
              <Image src="/logo.png" alt="logo" width="60" height="60" />
            </Link>
            <MdOutlineClose
              size={40}
              className="hover:bg-blue-100 transition rounded-full p-2 cursor-pointer"
              onClick={() => {
                setMobileNavMenu(false);
              }}
            />
          </div>
          <ul className="flex flex-col mx-8 mt-4">
            <Link
              href="/#home"
              className="hover:bg-blue-100 dark:hover:bg-black px-2 py-1 transition rounded-md my-2"
              scroll={false}
              onClick={() => {
                setMobileNavMenu(false);
              }}
            >
              <li>Home</li>
            </Link>
            <Link
              href="/#apps"
              className="hover:bg-blue-100 dark:hover:bg-black px-2 py-1 transition rounded-md my-2"
              scroll={false}
              onClick={() => {
                setMobileNavMenu(false);
              }}
            >
              <li>Apps</li>
            </Link>
            <Link
              href="/#projects"
              className="hover:bg-blue-100 dark:hover:bg-black px-2 py-1 transition rounded-md my-2"
              scroll={false}
              onClick={() => {
                setMobileNavMenu(false);
              }}
            >
              <li>Projects</li>
            </Link>

            <li>
              <ToggleThemeButton />
            </li>
            {!user && (
              <Link
                href="/Login"
                className="hover:bg-blue-100 dark:hover:bg-black px-2 py-2 transition rounded-md my-2"
              >
                <MdLogin />
              </Link>
            )}
            {user && (
              <Link
                href="/Login"
                className="hover:bg-blue-100 dark:hover:bg-black px-2 py-2 transition rounded-md my-2"
              >
                <MdSettings />
              </Link>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
