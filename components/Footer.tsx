import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-900 text-white flex py-2 pl-4 gap-4">
      <div>Ashwin Gur</div>
      <Link href={"mailto:agur9842@uni.sydney.edu.au"}>
        E: agur9842@uni.sydney.edu.au
      </Link>
    </div>
  );
};

export default Footer;
