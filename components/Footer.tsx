import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-background-muted justify-center flex py-2 pl-4 md:pl-12 gap-4">
      <Link href={"mailto:ashwingur1@gmail.com"}>E: ashwingur1@gmail.com</Link>
    </div>
  );
};

export default Footer;
