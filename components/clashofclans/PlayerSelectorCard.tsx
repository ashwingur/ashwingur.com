import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import Link from "next/link";
import { CocPlayer } from "shared/clashofclansfavourites";
import Image from "next/image";
import CocButton from "./CocButton";

interface PlayerCardProps {
  player: CocPlayer;
  isFavourite: boolean;
  onToggleFavourite: (player: CocPlayer) => void;
}

export const formatLastOnline = (isoDate: string): string => {
  const now = new Date();
  const then = new Date(isoDate);
  const diffMs = now.getTime() - then.getTime();

  const minutes = Math.floor(diffMs / (1000 * 60)) % 60;
  const hours = Math.floor(diffMs / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const parts = [];
  if (days > 0) parts.push(`${days} day${days !== 1 ? "s" : ""}`);
  if (hours > 0) parts.push(`${hours} hr${hours !== 1 ? "s" : ""}`);
  if (days === 0 && minutes > 0)
    parts.push(`${minutes} min${minutes !== 1 ? "s" : ""}`);

  return parts.length > 0 ? `${parts.join(" ")} ago` : "just now";
};

const PlayerSelectorCard = ({
  player,
  isFavourite,
  onToggleFavourite,
}: PlayerCardProps) => {
  return (
    <div className="relative flex h-full flex-col rounded-lg border-2 border-black bg-[#5d6b96]">
      <h3 className="coc-font-style text-center">{player.name}</h3>
      <button
        className="absolute left-4 top-1 text-white"
        onClick={() => onToggleFavourite(player)}
      >
        {isFavourite ? <BsSuitHeartFill /> : <BsSuitHeart />}
      </button>
      <p className="coc-font-style absolute right-4 top-[2px] flex items-center gap-2 text-sm">
        <span>{player.view_count.toLocaleString()}</span>
        <Image
          unoptimized
          alt="gem"
          src="/assets/coc/gem.webp"
          width={0}
          height={0}
          className="h-4 w-4"
        />
      </p>
      {player.activity_change_date && (
        <p className="text-center font-coc text-xs font-thin text-gray-300">
          Last online: {formatLastOnline(player.activity_change_date)}
        </p>
      )}
      <div className="mt-auto flex items-end">
        <Link
          href={`/ClashOfClans/player/${player.tag.replace("#", "")}`}
          className="flex h-16 w-40 items-center justify-center"
        >
          <CocButton
            text="Profile"
            className="w-32 hover:w-28"
            textClassName="text-sm hover:text-xs"
            innerColour="bg-orange-500"
            middleColour="bg-orange-600"
            outerColour="bg-orange-700"
          />
        </Link>
        <Link
          href={`/ClashOfClans/Progress/${player.tag.replace("#", "")}`}
          className="flex h-16 w-40 items-center justify-center"
        >
          <CocButton
            text="Progress"
            className="w-32 hover:w-28"
            textClassName="text-sm hover:text-xs"
            innerColour="bg-blue-500"
            middleColour="bg-blue-600"
            outerColour="bg-blue-700"
          />
        </Link>
      </div>
    </div>
  );
};

export default PlayerSelectorCard;
