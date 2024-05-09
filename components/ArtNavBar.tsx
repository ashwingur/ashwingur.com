import Link from "next/link";
import React from "react";
import Image from "next/image";
import ToggleThemeButton from "./ToggleThemeButton";

interface BasicNavbarProps {
  fixed: boolean;
}

const ArtNavBar = ({ fixed }: BasicNavbarProps) => {
  return (
    <div
      className={
        "flex w-full justify-between px-4 md:px-8 lg:px-16 py-4 shadow-lg backdrop-blur-md bg-white/30 dark:bg-white/10 z-50" +
        (fixed === true ? " fixed top-0" : "")
      }
    >
      <Link href="/">
        <Image src="/logo.png" alt="logo" width="30" height="30" />
      </Link>
      <ul className="flex gap-4">
        <Link
          href="/GenerativeArt"
          className="hover:bg-blue-100 dark:hover:bg-black px-2 py-1 transition rounded-md"
          scroll={false}
        >
          <li>More Art</li>
        </Link>
        <ToggleThemeButton />
      </ul>
    </div>
  );
};

export default ArtNavBar;
