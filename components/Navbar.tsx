import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdLightMode, MdDarkMode } from "react-icons/md";

interface NavProps {
  toggleTheme(): any;
  initialTheme: string;
}

const Navbar = ({ toggleTheme, initialTheme }: NavProps) => {
  let [currentTheme, setTheme] = useState(initialTheme);

  return (
    <div className="flex fixed w-full justify-between px-16 py-4 shadow-lg backdrop-blur-md bg-white/30 dark:bg-white/10 z-50">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width="80" height="80" />
      </Link>

      <ul className="flex gap-4 items-center">
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
          href="/#other"
          className="hover:bg-blue-100 dark:hover:bg-black px-2 py-1 transition rounded-md"
          scroll={false}
        >
          <li>Other</li>
        </Link>
        <Link
          href="/#contact"
          className="hover:bg-blue-100  dark:hover:bg-black px-2 py-1 transition rounded-md"
          scroll={false}
        >
          <li>Contact</li>
        </Link>
        <li>
          <button
            className=" hover:bg-blue-100 dark:hover:bg-black p-2 rounded-md"
            onClick={() => {
              setTheme(toggleTheme());
            }}
          >
            {currentTheme === "light" ? <MdDarkMode /> : <MdLightMode />}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
