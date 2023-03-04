import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import ToggleThemeButton from "../ToggleThemeButton";
import { BiHash, BiSearchAlt2 } from "react-icons/bi";
import { useRouter } from "next/router";

interface Tags {
  playerTag: string;
  clanTag: string;
}

const CocNavBar = () => {
  const router = useRouter();

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
    setTags((prevValue: Tags) => {
      return { ...prevValue, playerTag: value };
    });
    // searchForPlayer(value);
    router.push(`/ClashOfClans/player/${value}`);
  };

  const setClanTag = (value: string) => {
    setTags((prevValue: Tags) => {
      return { ...prevValue, clanTag: value };
    });
  };

  return (
    <div
      className={
        "flex w-full justify-between px-4 md:px-8 lg:px-16 py-4 shadow-lg backdrop-blur-md bg-white/30 dark:bg-white/10 z-50 fixed"
      }
    >
      <Link href="/">
        <Image src="/logo.png" alt="logo" width="80" height="80" />
      </Link>
      {/* Input Fields */}
      <div className="flex flex-col items-center md:flex-row justify-center gap-8">
        <div className="flex items-center">
          <BiHash size={25} />
          <input
            className="border-2 w-60 rounded-sm py-1 px-2"
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
          <BiHash size={25} />
          <input
            className="border-2 w-60 rounded-sm py-1 px-2"
            placeholder="(TODO) CLAN TAG"
            value={inputFieldTags.clanTag}
            onChange={updateTagInput}
            name="clanTag"
          />
          <button
            onClick={() => {
              setClanTag(inputFieldTags.playerTag);
            }}
            className="bg-black p-1 rounded-lg ml-2 text-yellow-500 hover:text-red-600 transition-all"
          >
            <BiSearchAlt2 size={30} />
          </button>
        </div>
      </div>
      <ToggleThemeButton />
    </div>
  );
};

export default CocNavBar;
