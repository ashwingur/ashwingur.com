import Link from "next/link";
import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex fixed w-full justify-between px-16 py-4 shadow-lg backdrop-blur-md bg-white/30">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width="80" height="80" />
      </Link>

      <ul className="flex gap-4 items-center">
        <Link
          href="/#home"
          className="hover:bg-blue-100 px-2 py-1 transition rounded-md"
        >
          <li>Home</li>
        </Link>
        <Link
          href="/#projects"
          className="hover:bg-blue-100 px-2 py-1 transition rounded-md"
        >
          <li>Projects</li>
        </Link>
        <Link
          href="/#contact"
          className="hover:bg-blue-100 px-2 py-1 transition rounded-md"
        >
          <li>Contact</li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
