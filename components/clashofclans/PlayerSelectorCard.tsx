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

const PlayerSelectorCard = ({
  player,
  isFavourite,
  onToggleFavourite,
}: PlayerCardProps) => {
  return (
    <div className="relative rounded-lg border-2 border-black bg-[#5d6b96]">
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
      <div className="flex text-sm">
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
