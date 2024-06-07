import Link from "next/link";
import React from "react";

const Apps = () => {
  return (
    <div id="apps" className="pt-20 flex flex-col items-center">
      <h1 className="text-center mb-4">Apps</h1>
      <div className="flex flex-col gap-4 md:grid grid-cols-3 md:gap-6">
        <Link href="/MediaReviews" className="btn py-4">
          Media Reviews
        </Link>
        <Link href="/Weather" className="btn">
          <button>My Weather Station</button>
        </Link>
        <Link href="/Tron" className="btn">
          <button>Tron</button>
        </Link>
        <Link href="/GenerativeArt" className="btn">
          <button>Generative Art</button>
        </Link>
        <Link href="/Code" className="btn">
          <button>Code Editor</button>
        </Link>
        <Link href="/NSWCarPark" className="btn">
          <button>NSW Live Car Park</button>
        </Link>
        <Link href="/ClashOfClans" className="btn">
          <button>Clash of Clans</button>
        </Link>
        <Link href="/CubeTimer" className="btn">
          <button>Cube Timer</button>
        </Link>
        <Link href="/Diskord" className="btn">
          <button>Diskord</button>
        </Link>
        <Link href="/TicTacToe" className="btn">
          <button>Tic Tac Toe</button>
        </Link>
      </div>
    </div>
  );
};

export default Apps;
