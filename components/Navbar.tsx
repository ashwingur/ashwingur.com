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
    <div
      className={clsx(
        "flex flex-col z-50",
        fixed ? "fixed top-0" : "",
        mobileNavMenu ? "h-screen" : ""
      )}
    >
      <div
        className={clsx(
          "flex flex-col w-screen shadow-lg backdrop-blur-md bg-background/50 border-b border-background-muted "
        )}
      >
        <div
          className={clsx(
            "flex w-full justify-between px-6 md:px-8 lg:px-16 py-4"
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
            className="cursor-pointer lg:hidden p-2"
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
            "lg:hidden duration-300 mx-4 md:mx-6 flex justify-between z-50 relative",
            mobileNavMenu
              ? "min-h-full border-t border-background-muted box-border"
              : "hidden"
          )}
        >
          <ul className="flex flex-col gap-2 my-4 w-24">
            <Link
              href="/#home"
              className="hover:bg-background-hover px-2 py-2 rounded-md"
              scroll={false}
              onClick={() => {
                setMobileNavMenu(false);
              }}
            >
              <li>Home</li>
            </Link>
            <Link
              href="/#apps"
              className="hover:bg-background-hover px-2 py-2 rounded-md"
              scroll={false}
              onClick={() => {
                setMobileNavMenu(false);
              }}
            >
              <li>Apps</li>
            </Link>
            <Link
              href="/#projects"
              className="hover:bg-background-hover px-2 py-2 rounded-md"
              scroll={false}
              onClick={() => {
                setMobileNavMenu(false);
              }}
            >
              <li>Projects</li>
            </Link>
            {!user && role !== "admin" && (
              <Link
                href="/Admin"
                className="hover:bg-background-hover px-2 py-2 rounded-md"
                scroll={false}
                onClick={() => {
                  setMobileNavMenu(false);
                }}
              >
                <li>Admin</li>
              </Link>
            )}
          </ul>
          <ul className="flex flex-col gap-2 items-center my-4">
            {!user && (
              <Link
                href="/Login"
                className="hover:bg-background-hover rounded-md py-4 px-4"
              >
                <MdLogin />
              </Link>
            )}
            {user && (
              <Link
                href="/Login"
                className="hover:bg-background-hover px-4 py-4 rounded-md my-2"
              >
                <MdSettings />
              </Link>
            )}

            <ToggleThemeButton className="px-4" />
          </ul>
        </div>
      </div>
      {mobileNavMenu && (
        <div
          className={clsx(
            "h-full",
            isDark(theme ?? "") ? "bg-black/70" : "bg-black/30"
          )}
          onClick={() => setMobileNavMenu(false)}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
