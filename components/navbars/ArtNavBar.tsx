import Link from "next/link";
import React from "react";
import { ToggleThemeButton } from "@components/ToggleThemeButton";
import CustomisableLogo from "@components/CustomisableLogo";

interface BasicNavbarProps {
  fixed: boolean;
}

const ArtNavBar = ({ fixed }: BasicNavbarProps) => {
  return (
    <div
      className={
        "flex w-full justify-between px-4 md:px-8 lg:px-16 py-4 shadow-lg backdrop-blur-lg bg-background/50 border-b border-background-muted z-50" +
        (fixed === true ? " fixed top-0" : "")
      }
    >
      <Link href="/">
        <CustomisableLogo />
      </Link>
      <ul className="flex gap-4">
        <Link
          href="/GenerativeArt"
          className="hover:bg-background-hover px-2 py-1 transition rounded-md"
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
