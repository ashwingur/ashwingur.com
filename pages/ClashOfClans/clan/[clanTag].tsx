import { useRouter } from "next/router";
import React from "react";

// Example clan ID: #220qp2ggu

const ClanPage = () => {
  const router = useRouter();
  const { clanTag } = router.query;
  return <div>[clanTag]</div>;
};

export default ClanPage;
