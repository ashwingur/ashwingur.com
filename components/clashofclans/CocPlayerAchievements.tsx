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
    <div className="flex flex-col items-center justify-between rounded-md border-2 border-black bg-gradient-to-b from-[#d7dbda] to-[#b2b8b7] px-4 dark:from-[#8d9191] dark:to-[#4a4f4e] md:flex-row">
      <div className="flex flex-col items-center gap-1 md:flex-row md:gap-4">
        <div className="flex items-center">
          {achievement.stars < 1 && (
            <div className="relative h-10 w-10 md:h-16 md:w-16">
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
            <div className="relative h-10 w-10 md:h-16 md:w-16">
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
            <div className="relative mb-3 h-10 w-10 md:mb-6 md:h-16 md:w-16">
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
            <div className="relative mb-3 h-10 w-10 md:mb-6 md:h-16 md:w-16">
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
            <div className="relative h-10 w-10 md:h-16 md:w-16">
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
            <div className="relative h-10 w-10 md:h-16 md:w-16">
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
            <span className="text-xl text-yellow-100 [text-shadow:_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_-1px_2px_black]">
              {achievement.name}
            </span>
          </div>
          <div className="font-coc font-thin">{achievement.info}</div>
        </div>
      </div>
      <div className="mt-2 pl-4 md:mt-0">
        <div className="relative mb-4 h-6 w-60 rounded-lg border-2 border-[#6b6565] bg-[#58504d] dark:border-gray-600">
          <div
            className="h-5 rounded-md bg-[#33a800] dark:bg-[#51c021]"
            style={{ width: `${completionPercentage}%` }}
          >
            <div className="h-[60%] w-full rounded-t-lg bg-[#90d838] dark:bg-[#88cf30]"></div>
          </div>
          <div className="coc-font-style absolute top-0 flex h-full w-full items-center justify-center">
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
    <div className="mx-4 rounded-md border-2 border-black bg-[#5d6b96] p-4 dark:bg-[#344063]">
      <h2 className="clash-font-style text-center text-3xl font-thin">
        Achievements
      </h2>
      <div className="clash-font-style mb-2 text-xl">Home Village</div>
      <div className="flex flex-col gap-2">{homeAchievements}</div>
      <div className="clash-font-style mb-2 mt-4 text-xl">Builder Village</div>
      <div className="flex flex-col gap-2">{builderAchievements}</div>
    </div>
  );
};

export default CocPlayerAchievements;
