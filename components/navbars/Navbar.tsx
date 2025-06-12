"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  MdOutlineMenu,
  MdOutlineClose,
  MdLogin,
  MdSettings,
} from "react-icons/md";
import { ToggleThemeButton, isDark } from "../ToggleThemeButton";
import { useAuth } from "@context/AuthContext";
import { useTheme } from "next-themes";
import clsx from "clsx";
import CustomisableLogo from "../CustomisableLogo";

const Navbar = ({ fixed }: { fixed: boolean }) => {
  const { theme } = useTheme();
  const [mobileNavMenu, setMobileNavMenu] = useState(false); // Mobile nav menu not showing at the start
  const { user, role } = useAuth();

  return (
    <div
      className={clsx(
        "z-50 flex flex-col",
        fixed ? "fixed top-0" : "",
        mobileNavMenu ? "h-screen" : "",
      )}
    >
      <div
        className={clsx(
          "flex w-screen flex-col border-b border-background-muted shadow-lg backdrop-blur-lg",
        )}
      >
        <div
          className={clsx(
            "flex w-full items-center justify-between px-6 py-2 md:px-8 lg:px-16",
          )}
        >
          <Link href="/">
            <CustomisableLogo />
          </Link>
          <ul className="hidden lg:flex lg:items-center lg:gap-4">
            <Link
              href="/#home"
              className="rounded-md px-2 py-1 transition hover:bg-background-hover"
              scroll={false}
            >
              <li>Home</li>
            </Link>
            <Link
              href="/#projects"
              className="rounded-md px-2 py-1 transition hover:bg-background-hover"
              scroll={false}
            >
              <li>Projects</li>
            </Link>
            {user && role === "admin" && (
              <Link
                href="/Admin"
                className="rounded-md px-2 py-1 transition hover:bg-background-hover"
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
                className="rounded-md px-2 py-2 transition hover:bg-background-hover"
              >
                <MdLogin />
              </Link>
            )}
            {user && (
              <Link
                href="/Login"
                className="rounded-md px-2 py-2 transition hover:bg-background-hover"
              >
                <MdSettings />
              </Link>
            )}
          </ul>
          <button
            className="lg:hidden"
            onClick={() => {
              setMobileNavMenu(!mobileNavMenu);
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileNavMenu ? (
              <MdOutlineClose size={30} />
            ) : (
              <MdOutlineMenu size={30} />
            )}
          </button>
        </div>

        <div
          className={clsx(
            "relative z-50 mx-4 flex justify-between duration-300 md:mx-6 lg:hidden",
            mobileNavMenu
              ? "box-border min-h-full border-t border-background-muted"
              : "hidden",
          )}
        >
          <ul className="my-4 flex w-24 flex-col gap-2">
            <Link
              href="/#home"
              className="rounded-md px-2 py-2 hover:bg-background-hover"
              scroll={false}
              onClick={() => {
                setMobileNavMenu(false);
              }}
            >
              <li>Home</li>
            </Link>

            <Link
              href="/#projects"
              className="rounded-md px-2 py-2 hover:bg-background-hover"
              scroll={false}
              onClick={() => {
                setMobileNavMenu(false);
              }}
            >
              <li>Projects</li>
            </Link>
            {user && role === "admin" && (
              <Link
                href="/Admin"
                className="rounded-md px-2 py-2 hover:bg-background-hover"
                scroll={false}
                onClick={() => {
                  setMobileNavMenu(false);
                }}
              >
                <li>Admin</li>
              </Link>
            )}
          </ul>
          <ul className="my-4 flex flex-col items-center gap-2">
            {!user && (
              <Link
                href="/Login"
                className="rounded-md px-4 py-4 hover:bg-background-hover"
              >
                <MdLogin />
              </Link>
            )}
            {user && (
              <Link
                href="/Login"
                className="my-2 rounded-md px-4 py-4 hover:bg-background-hover"
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
            isDark(theme ?? "") ? "bg-black/70" : "bg-black/50",
          )}
          onClick={() => setMobileNavMenu(false)}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
