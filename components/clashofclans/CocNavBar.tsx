import Link from "next/link";
import React, { useState } from "react";
import { ToggleThemeButton } from "../ToggleThemeButton";
import { BiSearchAlt2 } from "react-icons/bi";
import {
  MdLogin,
  MdOutlineClose,
  MdOutlineMenu,
  MdSettings,
} from "react-icons/md";
import CustomisableLogo from "@components/CustomisableLogo";
import { useAuth } from "@context/AuthContext";
import clsx from "clsx";
import { AiFillHome } from "react-icons/ai";

interface Tags {
  playerTag: string;
  clanTag: string;
}

const CocNavBar = () => {
  const [mobileNavMenu, setMobileNavMenu] = useState(false); // Mobile nav menu not showing at the start
  const { user, role } = useAuth();

  // The current value of the input fields
  const [inputFieldTags, setInputFieldTags] = useState<Tags>({
    playerTag: "",
    clanTag: "",
  });

  const updateTagInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputFieldTags((prevValue: Tags) => {
      return { ...prevValue, [name]: value };
    });
  };

  return (
    <div
      className={clsx(
        "fixed top-0 z-50 flex flex-col",

        mobileNavMenu ? "h-screen" : "",
      )}
    >
      <div
        className={clsx(
          "flex w-screen flex-col border-b border-background-muted bg-white/30 font-clash font-thin text-black shadow-lg backdrop-blur-lg",
        )}
      >
        <div
          className={clsx(
            "flex w-full items-center justify-between px-6 py-2 md:px-8 lg:px-16",
          )}
        >
          <Link href="/">
            <CustomisableLogo className="clash-font-style bg-[#6c779b] font-thin text-white" />
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
              <Link
                className={clsx(
                  "ml-2 rounded-lg bg-black p-1 text-yellow-500 transition-all hover:text-red-600",
                  inputFieldTags.playerTag.replace("#", "") === "" &&
                    "pointer-events-none",
                )}
                href={`/ClashOfClans/player/${inputFieldTags.playerTag.replace("#", "")}`}
              >
                <BiSearchAlt2 size={30} />
              </Link>
            </div>

            <div className="flex items-center">
              <input
                className="w-40 rounded-sm border-2 px-2 py-1 uppercase"
                placeholder="CLAN TAG"
                value={inputFieldTags.clanTag}
                onChange={updateTagInput}
                name="clanTag"
              />
              <Link
                className={clsx(
                  "ml-2 rounded-lg bg-black p-1 text-yellow-500 transition-all hover:text-red-600",
                  inputFieldTags.clanTag.replace("#", "") === "" &&
                    "pointer-events-none",
                )}
                href={`/ClashOfClans/clan/${inputFieldTags.clanTag.replace("#", "")}`}
              >
                <BiSearchAlt2 size={30} />
              </Link>
            </div>
          </div>
          <ul className="hidden lg:flex lg:items-center lg:gap-4">
            <Link
              href="/ClashOfClans"
              className="rounded-md px-2 py-1 transition hover:bg-background-hover"
              scroll={false}
            >
              <li>Clash Home</li>
            </Link>

            {user && role === "admin" && (
              <Link
                href="/Admin"
                className="rounded-md px-2 py-1 transition hover:bg-background-hover"
                scroll={false}
              >
                <li>Admin</li>
              </Link>
            )}
            <li>
              <ToggleThemeButton />
            </li>

            {!user && (
              <Link
                href="/Login"
                className="rounded-md px-2 py-2 transition hover:bg-background-hover"
              >
                <MdLogin />
              </Link>
            )}
            {user && (
              <Link
                href="/Login"
                className="rounded-md px-2 py-2 transition hover:bg-background-hover"
              >
                <MdSettings />
              </Link>
            )}
          </ul>
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href={"/ClashOfClans"}
              className="rounded-lg p-2 hover:bg-background-hover"
            >
              <AiFillHome className="text-xl" />
            </Link>
            <div
              className="cursor-pointer"
              onClick={() => {
                setMobileNavMenu(!mobileNavMenu);
              }}
            >
              {mobileNavMenu ? (
                <MdOutlineClose size={30} />
              ) : (
                <MdOutlineMenu size={30} />
              )}
            </div>
          </div>
        </div>
        {/* MOBILE NAV MENU */}
        <div
          className={clsx(
            "relative z-50 mx-4 flex justify-between duration-300 md:mx-6 lg:hidden",
            mobileNavMenu
              ? "box-border min-h-full border-t border-background-muted"
              : "hidden",
          )}
        >
          <ul className="w-30 my-4 flex flex-col gap-2">
            <Link
              href="/ClashOfClans"
              className="rounded-md px-2 py-2 hover:bg-background-hover"
              scroll={false}
              onClick={() => {
                setMobileNavMenu(false);
              }}
            >
              <li>Clash Home</li>
            </Link>

            {user && role === "admin" && (
              <Link
                href="/Admin"
                className="rounded-md px-2 py-2 hover:bg-background-hover"
                scroll={false}
                onClick={() => {
                  setMobileNavMenu(false);
                }}
              >
                <li>Admin</li>
              </Link>
            )}

            {/* Input Fields */}
            <div className="flex items-center md:hidden">
              <input
                className="w-40 rounded-sm border-2 px-2 py-1 uppercase"
                placeholder="PLAYER TAG"
                value={inputFieldTags.playerTag}
                onChange={updateTagInput}
                name="playerTag"
              />
              <Link
                className={clsx(
                  "ml-2 rounded-lg bg-black p-1 text-yellow-500 transition-all hover:text-red-600",
                  inputFieldTags.playerTag.replace("#", "") === "" &&
                    "pointer-events-none",
                )}
                href={`/ClashOfClans/player/${inputFieldTags.playerTag.replace("#", "")}`}
              >
                <BiSearchAlt2 size={30} />
              </Link>
            </div>

            <div className="flex items-center md:hidden">
              <input
                className="w-40 rounded-sm border-2 px-2 py-1 uppercase"
                placeholder="CLAN TAG"
                value={inputFieldTags.clanTag}
                onChange={updateTagInput}
                name="clanTag"
              />
              <Link
                className={clsx(
                  "ml-2 rounded-lg bg-black p-1 text-yellow-500 transition-all hover:text-red-600",
                  inputFieldTags.clanTag.replace("#", "") === "" &&
                    "pointer-events-none",
                )}
                href={`/ClashOfClans/clan/${inputFieldTags.clanTag.replace("#", "")}`}
              >
                <BiSearchAlt2 size={30} />
              </Link>
            </div>
          </ul>
          <ul className="my-4 flex flex-col items-center gap-2">
            {!user && (
              <Link
                href="/Login"
                className="rounded-md px-4 py-4 hover:bg-background-hover"
              >
                <MdLogin />
              </Link>
            )}
            {user && (
              <Link
                href="/Login"
                className="my-2 rounded-md px-4 py-4 hover:bg-background-hover"
              >
                <MdSettings />
              </Link>
            )}

            <ToggleThemeButton />
          </ul>
        </div>
      </div>
      {mobileNavMenu && (
        <div
          className="h-full bg-black/50"
          onClick={() => setMobileNavMenu(false)}
        ></div>
      )}
    </div>
  );
};

export default CocNavBar;
