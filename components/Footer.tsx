import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-background-muted flex py-2 pl-4 md:pl-12 gap-4">
      <div>Ashwin Gur</div>
      <Link href={"mailto:ashwingur1@gmail.com"}>E: ashwingur1@gmail.com</Link>
    </div>
  );
};

export default Footer;
