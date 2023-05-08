import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Clan = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/ClashOfClans");
  });
  return <div className="bg-clash" />;
};

export default Clan;
