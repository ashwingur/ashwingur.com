import CocNavBar from "../components/clashofclans/CocNavBar";
import CocButton from "../components/clashofclans/CocButton";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";
import axios from "axios";

// https://coc.guide/troop for the icons

// My profile: #YLPGLJOV

interface Tags {
  playerTag: string;
  clanTag: string;
}

const theOrganisationTag = "220QP2GGU";

const fetchTheOrganisation = () =>
  axios.get(`/api/clashofclans/clan/220QP2GGU`).then(({ data }) => data);

const ClashOfClans = () => {
  //  Caching TheOrganisation clan since it is more frequently accessed
  useQuery({
    queryKey: ["clan", theOrganisationTag],
    queryFn: () => fetchTheOrganisation(),
  });

  return (
    <div className="bg-clash min-h-screen pb-8">
      <CocNavBar />
      <div className="w- flex flex-col items-center">
        <h2 className="clash-font-style pt-20 text-center font-thin">
          Clash of Clans
        </h2>
        <p className="coc-font-style m-8 text-center md:w-[70%] md:text-xl lg:w-3/5 lg:text-2xl">
          Welcome to the Clash of Clans page. Search any player or clan by their
          tag in the navigation bar. This site uses the official Clash of Clans
          API to provide up to date data. Below are some quick links to my
          profile and clan:
        </p>
        <div className="mb-4 flex h-16 items-center">
          <Link href={"/ClashOfClans/player/YLPGLJ0V"}>
            <CocButton
              className="w-80 hover:w-72"
              text={"Unknown Virus"}
              innerColour="bg-orange-500 dark:bg-orange-600"
              middleColour="bg-orange-600 dark:bg-orange-700"
              outerColour="bg-orange-700 dark:bg-orange-900"
            />
          </Link>
        </div>
        <div className="mb-4 flex h-16 items-center">
          <Link href={"/ClashOfClans/clan/220QP2GGU"}>
            <CocButton
              className="w-80 hover:w-72"
              text={"TheOrganisation"}
              innerColour="bg-green-500 dark:bg-green-600"
              middleColour="bg-green-600 dark:bg-green-700"
              outerColour="bg-green-700 dark:bg-green-900"
            />
          </Link>
        </div>
        <div className="flex h-16 items-center">
          <Link href={"/ClashOfClans/Progress"}>
            <CocButton
              className="w-80 hover:w-72"
              text={"Progress"}
              innerColour="bg-blue-500 dark:bg-blue-600"
              middleColour="bg-blue-600 dark:bg-blue-700"
              outerColour="bg-blue-700 dark:bg-blue-900"
            />
          </Link>
        </div>
      </div>
      <div className="relative mx-auto my-8 h-72 w-72 md:h-96 md:w-96">
        <Image
          src={`/assets/coc/CocBackground.webp`}
          alt={`Clash of Clans Background`}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

export default ClashOfClans;
