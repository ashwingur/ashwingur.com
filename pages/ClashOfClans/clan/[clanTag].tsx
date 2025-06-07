import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { SpinningCircles } from "react-loading-icons";
import ClanCapitalDetails from "@components/clashofclans/ClanCapitalDetails";
import ClanMemberElement from "@components/clashofclans/ClanMemberElement";
import CocButton from "@components/clashofclans/CocButton";
import CocClanDetails from "@components/clashofclans/CocClanDetails";
import CocClanSummary from "@components/clashofclans/CocClanSummary";
import CocNavBar from "@components/clashofclans/CocNavBar";
import CocLoadingOrError from "@components/clashofclans/CocLoadingOrError";
import { useGetFullClan } from "shared/queries/clashofclans";
import ClanMembersTodo from "@components/clashofclans/ClanMembersTodo";

const title = "Clan";

const ClanPage = () => {
  const router = useRouter();
  const clanTag =
    typeof router.query?.clanTag === "string"
      ? router.query.clanTag
      : undefined;

  const { isLoading, error, data } = useGetFullClan(clanTag);

  if (error instanceof Error)
    return CocLoadingOrError({
      heading: title,
      info: (
        <p className="coc-font-style m-8 text-center text-2xl">
          Unable to fetch clan data: {error.message}
        </p>
      ),
    });

  if (isLoading || data === undefined)
    return CocLoadingOrError({
      heading: title,
      info: <SpinningCircles className="mx-auto mt-8" />,
    });

  const clanMembers = data.memberList.map((item, index) => (
    <ClanMemberElement key={index} clanMember={item} />
  ));

  let warUrl = null;
  if (
    data.war &&
    (data.war.state === "preparation" ||
      data.war.state === "inWar" ||
      data.war.state === "ended")
  ) {
    warUrl = `/ClashOfClans/clan/${clanTag}/CurrentWar`;
  } else if (data.cwl_war_rounds) {
    // In reverse order find the first one that matches tag
    let latestCwlTag = data.cwl_war_rounds.find(
      (r) =>
        r.clan_tag === data.tag &&
        (r.state === "inWar" || r.state === "preparation"),
    )?.war_tag;
    if (latestCwlTag) {
      warUrl = `/ClashOfClans/clanwarleague/${latestCwlTag.replace("#", "")}`;
    }
  }
  return (
    <div className="bg-clash min-h-screen pb-8">
      <CocNavBar />
      <h2 className="clash-font-style pt-20 text-center font-thin">{title}</h2>

      <div className="mx-auto xl:w-4/5">
        <div className="flex flex-col lg:mx-auto lg:w-5/6">
          <div className="mx-auto flex items-center justify-center gap-2 pt-4 md:gap-4">
            {warUrl && (
              <div className="flex w-40 items-center justify-center md:h-16 md:w-60">
                <Link href={warUrl}>
                  <CocButton
                    className="w-40 hover:w-36 md:w-60 md:hover:w-56"
                    text={"Current War"}
                    innerColour="bg-green-500"
                    middleColour="bg-green-600"
                    outerColour="bg-green-700"
                    textClassName="text-xs md:text-base md:hover:text-sm"
                  />
                </Link>
              </div>
            )}
            <div className="flex w-40 items-center justify-center md:h-16 md:w-60">
              <Link
                href={`/ClashOfClans/clan/${clanTag}/ClanWarLeague`}
                className=""
              >
                <CocButton
                  className="w-40 hover:w-36 md:w-60 md:hover:w-56"
                  text="Clan War League"
                  innerColour="bg-green-500"
                  middleColour="bg-green-600"
                  outerColour="bg-green-700"
                  textClassName="text-xs md:text-base md:hover:text-sm"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-4 mt-4 flex flex-col items-center gap-4 rounded-lg border-2 border-black bg-[#787b60] p-4 md:flex-row md:justify-around">
          <CocClanSummary clan={data} />
          <CocClanDetails clan={data} />
        </div>

        <ClanMembersTodo clan={data} className="mx-4 mt-4" />

        <ClanCapitalDetails clan={data} />
        <div className="mx-4 my-4 grid">{clanMembers}</div>
      </div>

      {!data && <SpinningCircles className="mx-auto mt-8" />}
    </div>
  );
};

export default ClanPage;
