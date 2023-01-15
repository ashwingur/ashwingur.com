import Link from "next/link";
import React from "react";
import Image from "next/image";

const CubeTimerNavbar = () => {
  return (
    <div className="flex w-full justify-between px-4 md:px-8 lg:px-16 py-4 shadow-lg backdrop-blur-md bg-white/30 dark:bg-white/10 z-50">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width="80" height="80" />
      </Link>
    </div>
  );
};

export default CubeTimerNavbar;
