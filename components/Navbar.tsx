import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  MdLightMode,
  MdDarkMode,
  MdOutlineMenu,
  MdOutlineClose,
} from "react-icons/md";
import ToggleThemeButton from "./ToggleThemeButton";

const Navbar = () => {
  const [mobileNavMenu, setMobileNavMenu] = useState(false); // Mobile nav menu not showing at the start

  return (
    <div>
      <div className="flex fixed w-full justify-between px-4 md:px-8 lg:px-16 py-4 shadow-lg backdrop-blur-md bg-white/50 dark:bg-white/10 z-50">
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
            href="/#projects"
            className="hover:bg-blue-100 dark:hover:bg-black px-2 py-1 transition rounded-md"
            scroll={false}
          >
            <li>Projects</li>
          </Link>
          <Link
            href="/#apps"
            className="hover:bg-blue-100 dark:hover:bg-black px-2 py-1 transition rounded-md"
            scroll={false}
          >
            <li>Apps</li>
          </Link>
          <Link
            href="/#contact"
            className="hover:bg-blue-100  dark:hover:bg-black px-2 py-1 transition rounded-md"
            scroll={false}
          >
            <li>Contact</li>
          </Link>
          <li>
            <ToggleThemeButton />
          </li>
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
              ? "absolute left-0 top-0 w-[75%] h-full bg-slate-50 dark:bg-slate-800 ease-in duration-500 z-50"
              : "fixed left-[-100%] top-0 h-full p-10 ease-in duration-500 z-50"
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
              <Image src="/logo.png" alt="logo" width="80" height="80" />
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
              href="/#projects"
              className="hover:bg-blue-100 dark:hover:bg-black px-2 py-1 transition rounded-md my-2"
              scroll={false}
              onClick={() => {
                setMobileNavMenu(false);
              }}
            >
              <li>Projects</li>
            </Link>
            <Link
              href="/#other"
              className="hover:bg-blue-100 dark:hover:bg-black px-2 py-1 transition rounded-md my-2"
              scroll={false}
              onClick={() => {
                setMobileNavMenu(false);
              }}
            >
              <li>Other</li>
            </Link>
            <Link
              href="/#contact"
              className="hover:bg-blue-100  dark:hover:bg-black px-2 py-1 transition rounded-md my-2"
              scroll={false}
              onClick={() => {
                setMobileNavMenu(false);
              }}
            >
              <li>Contact</li>
            </Link>
            <li>
              <ToggleThemeButton />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
