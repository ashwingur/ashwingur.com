import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { ToggleThemeButton } from "../ToggleThemeButton";
import { BiHash, BiSearchAlt2 } from "react-icons/bi";
import { useRouter } from "next/router";
import { MdOutlineMenu } from "react-icons/md";
import CocButton from "./CocButton";

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
      <div className="flex w-full justify-between px-4 md:px-8 lg:px-16 py-4 shadow-lg backdrop-blur-md bg-white/30 dark:bg-black/30 z-50 fixed">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width="30" height="30" />
        </Link>
        {/* Input Fields */}
        <div className="hidden md:flex flex-col items-center md:flex-row justify-center gap-8 font-coc font-thin">
          <div className="flex items-center">
            <input
              className="border-2 w-40 rounded-sm py-1 px-2 uppercase"
              placeholder="PLAYER TAG"
              value={inputFieldTags.playerTag}
              onChange={updateTagInput}
              name="playerTag"
            />
            <button
              onClick={() => {
                setPlayerTag(inputFieldTags.playerTag);
              }}
              className="bg-black p-1 rounded-lg ml-2 text-yellow-500 hover:text-red-600 transition-all"
            >
              <BiSearchAlt2 size={30} />
            </button>
          </div>

          <div className="flex items-center">
            <input
              className="border-2 w-40 rounded-sm py-1 px-2 uppercase"
              placeholder="CLAN TAG"
              value={inputFieldTags.clanTag}
              onChange={updateTagInput}
              name="clanTag"
            />
            <button
              onClick={() => {
                setClanTag(inputFieldTags.clanTag);
              }}
              className="bg-black p-1 rounded-lg ml-2 text-yellow-500 hover:text-red-600 transition-all"
            >
              <BiSearchAlt2 size={30} />
            </button>
          </div>
        </div>
        <div className="hidden md:block">
          <Link
            href="/ClashOfClans"
            className="hover:bg-blue-100 dark:hover:bg-black px-2 py-1 transition rounded-md mr-4"
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
            ? "fixed w-full h-screen bg-black/70 top-0 left-0 z-50 transition-all"
            : "z-50 bg-black"
        }
        onClick={() => setShowMobileNav(false)}
      >
        <div
          className={
            showMobileNav
              ? "absolute left-0 top-0 w-[75%] h-full bg-gradient-to-b from-[#8c94ac] to-[#6c779b] ease-in duration-500 z-50"
              : "fixed left-[-100%] top-0 h-full p-10 ease-in duration-500 z-50 bg-gradient-to-b from-[#8c94ac] to-[#6c779b]"
          }
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/* Input Fields */}
          <div className="flex flex-col items-center md:flex-row justify-center gap-8 font-coc font-thin">
            <div className="flex items-center mt-8">
              <BiHash size={25} />
              <input
                className="border-2 w-40 rounded-sm py-1 px-2 uppercase"
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
                className="bg-black p-1 rounded-lg ml-2 text-yellow-500 hover:text-red-600 transition-all"
              >
                <BiSearchAlt2 size={30} />
              </button>
            </div>

            <div className="flex items-center">
              <BiHash size={25} />
              <input
                className="border-2 w-40 rounded-sm py-1 px-2 uppercase"
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
                className="bg-black p-1 rounded-lg ml-2 text-yellow-500 hover:text-red-600 transition-all"
              >
                <BiSearchAlt2 size={30} />
              </button>
            </div>
            <div className="h-16 flex items-center">
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
