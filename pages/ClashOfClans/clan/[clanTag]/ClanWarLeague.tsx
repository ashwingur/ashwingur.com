import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CocNavBar from "../../../../components/clashofclans/CocNavBar";
import {
  ClanWarLeagueCLan,
  LeagueGroup,
} from "../../../../shared/interfaces/coc.interface";
import testLeague from "../../../../data/leaguegroup.json";
import Link from "next/link";

const LeagueClan = (clan: ClanWarLeagueCLan) => {
  return (
    <Link href={`/ClashOfClans/clan/${clan.tag.substring(1)}`}>
      <div className="bg-orange-900 flex justify-between p-4 rounded-md clash-font-style border-2 border-black">
        <div>{clan.name}</div>
        <div>Lvl {clan.clanLevel}</div>
      </div>
    </Link>
  );
};

const ClanWarLeague = () => {
  const router = useRouter();
  const { clanTag } = router.query;

  const testData: LeagueGroup = testLeague;

  const [leagueGroup, setLeagueGroup] = useState<LeagueGroup>();

  const clans = leagueGroup?.clans.map((item, index) => {
    return (
      <LeagueClan
        key={index}
        tag={item.tag}
        clanLevel={item.clanLevel}
        name={item.name}
        members={item.members}
      />
    );
  });

  useEffect(() => {
    setLeagueGroup(testLeague);
  }, [leagueGroup]);

  return (
    <div className="bg-gradient-to-b from-[#8c94ac] to-[#6c779b] min-h-screen pb-4">
      <CocNavBar />
      <h2 className="text-center pt-20 clash-font-style font-thin">
        Clan War League
      </h2>
      {leagueGroup && (
        <div>
          <div className="flex flex-col my-4 mx-2 pb-4 md:mx-4 rounded-lg border-2 border-black bg-gradient-to-b from-[#7d643c] to-[#9f815e]">
            <div className="self-center clash-font-style my-2">
              <span className="text-yellow-100 text-2xl">
                Season {leagueGroup.season}
              </span>
            </div>
            <div className="flex flex-col gap-4 mx-2">{clans}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClanWarLeague;
