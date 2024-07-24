import Link from "next/link";
import React, { useState } from "react";
import { ToggleThemeButton } from "../ToggleThemeButton";
import { BiHash, BiSearchAlt2 } from "react-icons/bi";
import { useRouter } from "next/router";
import { MdOutlineMenu } from "react-icons/md";
import CocButton from "./CocButton";
import CustomisableLogo from "@components/CustomisableLogo";

interface Tags {
  playerTag: string;
  clanTag: string;
}

const CocNavBar = () => {
  const router = useRouter();
  const [showMobileNav, setShowMobileNav] = useState(false);

  // The current value of the input fields
  const [inputFieldTags, setInputFieldTags] = useState<Tags>({
    playerTag: "",
    clanTag: "",
  });

  // The current value of the actual tags
  const [tags, setTags] = useState<Tags>({
    playerTag: "",
    clanTag: "",
  });
  const updateTagInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputFieldTags((prevValue: Tags) => {
      return { ...prevValue, [name]: value };
    });
  };

  const setPlayerTag = (value: string) => {
    const tag = value.replace("#", "");
    setTags((prevValue: Tags) => {
      return { ...prevValue, playerTag: tag };
    });
    router.push(`/ClashOfClans/player/${tag}`);
  };

  const setClanTag = (value: string) => {
    const tag = value.replace("#", "");
    console.log("tag is " + tag);
    setTags((prevValue: Tags) => {
      return { ...prevValue, clanTag: tag };
    });
    router.push(`/ClashOfClans/clan/${tag}`);
  };

  return (
    <div>
      <div className="fixed z-50 flex w-full justify-between bg-white/30 px-4 py-4 shadow-lg backdrop-blur-md dark:bg-black/30 md:px-8 lg:px-16">
        <Link href="/">
          <CustomisableLogo className="bg-[#6c779b] text-white" />
        </Link>
        {/* Input Fields */}
        <div className="hidden flex-col items-center justify-center gap-8 font-coc font-thin md:flex md:flex-row">
          <div className="flex items-center">
            <input
              className="w-40 rounded-sm border-2 px-2 py-1 uppercase"
              placeholder="PLAYER TAG"
              value={inputFieldTags.playerTag}
              onChange={updateTagInput}
              name="playerTag"
            />
            <button
              onClick={() => {
                setPlayerTag(inputFieldTags.playerTag);
              }}
              className="ml-2 rounded-lg bg-black p-1 text-yellow-500 transition-all hover:text-red-600"
            >
              <BiSearchAlt2 size={30} />
            </button>
          </div>

          <div className="flex items-center">
            <input
              className="w-40 rounded-sm border-2 px-2 py-1 uppercase"
              placeholder="CLAN TAG"
              value={inputFieldTags.clanTag}
              onChange={updateTagInput}
              name="clanTag"
            />
            <button
              onClick={() => {
                setClanTag(inputFieldTags.clanTag);
              }}
              className="ml-2 rounded-lg bg-black p-1 text-yellow-500 transition-all hover:text-red-600"
            >
              <BiSearchAlt2 size={30} />
            </button>
          </div>
        </div>
        <div className="hidden md:block">
          <Link
            href="/ClashOfClans"
            className="mr-4 rounded-md px-2 py-1 transition hover:bg-blue-100 dark:hover:bg-black"
            scroll={false}
          >
            Clash Home
          </Link>
          <ToggleThemeButton />
        </div>
        <div
          className="cursor-pointer md:hidden"
          onClick={() => {
            setShowMobileNav(true);
          }}
        >
          <MdOutlineMenu size={25} />
        </div>
      </div>
      {/* MOBILE NAV MENU */}
      <div
        className={
          showMobileNav
            ? "fixed left-0 top-0 z-50 h-screen w-full bg-black/70 transition-all"
            : "z-50 bg-black"
        }
        onClick={() => setShowMobileNav(false)}
      >
        <div
          className={
            showMobileNav
              ? "absolute left-0 top-0 z-50 h-full w-[75%] bg-gradient-to-b from-[#8c94ac] to-[#6c779b] duration-500 ease-in"
              : "fixed left-[-100%] top-0 z-50 h-full bg-gradient-to-b from-[#8c94ac] to-[#6c779b] p-10 duration-500 ease-in"
          }
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/* Input Fields */}
          <div className="flex flex-col items-center justify-center gap-8 font-coc font-thin md:flex-row">
            <div className="mt-8 flex items-center">
              <BiHash size={25} />
              <input
                className="w-40 rounded-sm border-2 px-2 py-1 uppercase"
                placeholder="PLAYER TAG"
                value={inputFieldTags.playerTag}
                onChange={updateTagInput}
                name="playerTag"
              />
              <button
                onClick={() => {
                  setPlayerTag(inputFieldTags.playerTag);
                  setShowMobileNav(false);
                }}
                className="ml-2 rounded-lg bg-black p-1 text-yellow-500 transition-all hover:text-red-600"
              >
                <BiSearchAlt2 size={30} />
              </button>
            </div>

            <div className="flex items-center">
              <BiHash size={25} />
              <input
                className="w-40 rounded-sm border-2 px-2 py-1 uppercase"
                placeholder="CLAN TAG"
                value={inputFieldTags.clanTag}
                onChange={updateTagInput}
                name="clanTag"
              />
              <button
                onClick={() => {
                  setClanTag(inputFieldTags.clanTag);
                  setShowMobileNav(false);
                }}
                className="ml-2 rounded-lg bg-black p-1 text-yellow-500 transition-all hover:text-red-600"
              >
                <BiSearchAlt2 size={30} />
              </button>
            </div>
            <div className="flex h-16 items-center">
              <Link href={"/ClashOfClans"}>
                <CocButton
                  className="w-40 hover:w-32"
                  text={"Home"}
                  innerColour="bg-blue-500"
                  middleColour="bg-blue-600"
                  outerColour="bg-blue-700"
                  onClick={() => {
                    setShowMobileNav(false);
                  }}
                />
              </Link>
            </div>
            <div className="">
              <ToggleThemeButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocNavBar;
