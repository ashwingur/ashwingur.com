import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ToggleThemeButton } from "@components/ToggleThemeButton";
import clsx from "clsx";
import CustomisableLogo from "@components/CustomisableLogo";

interface BasicNavbarProps {
  fixed: boolean;
  className?: string;
}

const BasicNavbar = ({ fixed, className }: BasicNavbarProps) => {
  return (
    <div
      className={clsx(
        "flex w-full justify-between items-center px-4 md:px-8 lg:px-16 py-2 lg:py-4 shadow-lg backdrop-blur-lg bg-background/50 border-b border-background-muted z-50",
        fixed === true ? " fixed top-0" : "",
        className
      )}
    >
      <Link href="/">
        <CustomisableLogo />
      </Link>
      <ToggleThemeButton />
    </div>
  );
};

export default BasicNavbar;
