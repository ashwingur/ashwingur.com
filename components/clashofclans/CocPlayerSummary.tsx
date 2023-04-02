import Image from "next/image";
import React from "react";
import { Player } from "../../shared/interfaces/coc.interface";

interface CocPlayerSummaryProps {
  player: Player;
}

const CocPlayerSummary = ({ player }: CocPlayerSummaryProps) => {
  const labels = player.labels.map((label, index) => {
    return (
      <Image
        key={index}
        alt={label.name}
        src={label.iconUrls.medium}
        width={30}
        height={30}
        priority={true}
      />
    );
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4 font-clash clash-font-style">
        <div className="bg-[#4eb3e3] p-2 rounded-md border-2 border-black">
          {player.expLevel}
        </div>
        <div>
          <div className="text-xl">{player.name}</div>
          <div className="text-gray-300 font-thin font-coc">{player.tag}</div>
          <div className="font-coc font-thin">{mapPlayerRole(player.role)}</div>
        </div>
      </div>
      <div className="flex gap-4">{labels}</div>
    </div>
  );
};

const mapPlayerRole = (role: string) => {
  switch (role) {
    case "leader":
      return "Leader";
    case "coLeader":
      return "Co-leader";
    case "admin":
      return "Elder";
    case "member":
      return "Member";
  }
  return "";
};

export default CocPlayerSummary;
