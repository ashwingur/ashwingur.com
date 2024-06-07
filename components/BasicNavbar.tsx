import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ToggleThemeButton } from "./ToggleThemeButton";
import clsx from "clsx";

interface BasicNavbarProps {
  fixed: boolean;
  className?: string;
}

const BasicNavbar = ({ fixed, className }: BasicNavbarProps) => {
  return (
    <div
      className={clsx(
        "flex w-full justify-between px-4 md:px-8 lg:px-16 py-4 shadow-lg backdrop-blur-md bg-white/30 dark:bg-white/10 z-50",
        fixed === true ? " fixed top-0" : "",
        className
      )}
    >
      <Link href="/">
        <Image src="/logo.png" alt="logo" width="30" height="30" />
      </Link>
      <ToggleThemeButton />
    </div>
  );
};

export default BasicNavbar;
