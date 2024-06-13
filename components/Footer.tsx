import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="footer bg-background-muted justify-center flex py-2 border-t border-background-hover">
      <Link href={"mailto:ashwingur1@gmail.com"}>E: ashwingur1@gmail.com</Link>
    </div>
  );
};

export default Footer;
