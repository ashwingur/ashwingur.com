import React from "react";
import {
  Player,
  PlayerAchievement,
} from "../../shared/interfaces/coc.interface";
import Image from "next/image";

const emptyStar = "/assets/coc/stars/empty.png";
const goldenStar = "/assets/coc/stars/golden_star.png";

interface CocPlayerAchievementProps {
  player: Player;
}

interface AchievementProps {
  achievement: PlayerAchievement;
}

const Achievement = ({ achievement }: AchievementProps) => {
  const completionPercentage =
    achievement.value > achievement.target
      ? 100
      : Math.floor((100 * achievement.value) / achievement.target);
  return (
    <div className="bg-gradient-to-b from-[#d7dbda] to-[#b2b8b7] dark:from-[#8d9191] dark:to-[#4a4f4e] border-2 border-black rounded-md flex flex-col md:flex-row justify-between px-4 items-center">
      <div className="flex flex-col md:flex-row gap-1 md:gap-4 items-center">
        <div className="flex items-center">
          {achievement.stars < 1 && (
            <div className="relative w-10 h-10 md:w-16 md:h-16">
              <Image
                unoptimized
                src={emptyStar}
                alt={`Member stars`}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
          {achievement.stars > 0 && (
            <div className="relative w-10 h-10 md:w-16 md:h-16">
              <Image
                unoptimized
                src={goldenStar}
                alt={`Member stars`}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
          {achievement.stars < 2 && (
            <div className="relative w-10 h-10 md:w-16 md:h-16 mb-3 md:mb-6">
              <Image
                unoptimized
                src={emptyStar}
                alt={`Member stars`}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
          {achievement.stars > 1 && (
            <div className="relative w-10 h-10 md:w-16 md:h-16 mb-3 md:mb-6">
              <Image
                unoptimized
                src={goldenStar}
                alt={`Member stars`}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
          {achievement.stars < 3 && (
            <div className="relative w-10 h-10 md:w-16 md:h-16">
              <Image
                unoptimized
                src={emptyStar}
                alt={`Member stars`}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
          {achievement.stars > 2 && (
            <div className="relative w-10 h-10 md:w-16 md:h-16">
              <Image
                unoptimized
                src={goldenStar}
                alt={`Member stars`}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
        </div>
        <div>
          <div className="clash-font-style">
            <span className="text-yellow-100 text-xl [text-shadow:_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_-1px_2px_black]">
              {achievement.name}
            </span>
          </div>
          <div className="font-coc font-thin">{achievement.info}</div>
        </div>
      </div>
      <div className="pl-4 mt-2 md:mt-0">
        <div className="w-60 bg-[#58504d] rounded-lg h-6 mb-4 border-2 relative border-[#6b6565] dark:border-gray-600">
          <div
            className="bg-[#33a800] dark:bg-[#51c021] h-5 rounded-md"
            style={{ width: `${completionPercentage}%` }}
          >
            <div className="h-[60%] w-full bg-[#90d838] dark:bg-[#88cf30] rounded-t-lg"></div>
          </div>
          <div className="absolute top-0 flex items-center w-full h-full justify-center coc-font-style">
            <span className="[text-shadow:_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_-1px_2px_black]">
              {achievement.value}/{achievement.target}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CocPlayerAchievements = ({ player }: CocPlayerAchievementProps) => {
  const homeAchievements = player.achievements
    .filter((item) => item.village === "home")
    .map((item, index) => <Achievement achievement={item} key={index} />);

  const builderAchievements = player.achievements
    .filter((item) => item.village === "builderBase")
    .map((item, index) => <Achievement achievement={item} key={index} />);

  return (
    <div className="bg-[#5d6b96] dark:bg-[#344063] border-2 border-black rounded-md mx-4 p-4">
      <h2 className="text-center clash-font-style font-thin text-3xl">
        Achievements
      </h2>
      <div className="clash-font-style text-xl mb-2">Home Village</div>
      <div className="flex flex-col gap-2">{homeAchievements}</div>
      <div className="clash-font-style text-xl mb-2 mt-4">Builder Village</div>
      <div className="flex flex-col gap-2">{builderAchievements}</div>
    </div>
  );
};

export default CocPlayerAchievements;
