import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between px-16 py-4 shadow-lg">
      <div>Logo</div>

      <ul className="flex gap-4">
        <Link href="/" className="hover:bg-gray-400">
          <li>Home</li>
        </Link>
        <Link href="/">
          <li>Projects</li>
        </Link>
        <Link href="/">
          <li>Contact</li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
