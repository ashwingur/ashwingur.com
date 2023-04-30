import Link from "next/link";
import React from "react";

const Apps = () => {
  return (
    <div id="apps" className="pt-20 flex flex-col">
      <h1 className="text-center mb-4">Apps</h1>
      <Link
        href="/CubeTimer"
        className="bg-sky-200 dark:bg-[#2e1065] hover:bg-blue-400 dark:hover:bg-violet-800 rounded-md py-3 px-4 font-bold mx-auto my-4 transition-all"
      >
        <button>Cube Timer</button>
      </Link>
      <Link
        href="/Diskord"
        className="bg-sky-200 dark:bg-[#2e1065] hover:bg-blue-400 dark:hover:bg-violet-800 rounded-md py-3 px-4 font-bold mx-auto my-4 transition-all"
      >
        <button>Diskord</button>
      </Link>
      <Link
        href="/TicTacToe"
        className="bg-sky-200 dark:bg-[#2e1065] hover:bg-blue-400 dark:hover:bg-violet-800 rounded-md py-3 px-4 font-bold mx-auto my-4 transition-all"
      >
        <button>Tic Tac Toe</button>
      </Link>
      <Link
        href="/ClashOfClans"
        className="bg-sky-200 dark:bg-[#2e1065] hover:bg-blue-400 dark:hover:bg-violet-800 rounded-md py-3 px-4 font-bold mx-auto my-4 transition-all"
      >
        <button>Clash of Clans</button>
      </Link>
    </div>
  );
};

export default Apps;
