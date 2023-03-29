import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Clan = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/ClashOfClans");
  });
  return <div className="bg-gradient-to-b from-[#8c94ac] to-[#6c779b]" />;
};

export default Clan;
