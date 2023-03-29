import React from "react";
import {
  Player,
  PlayerAchievement,
} from "../../shared/interfaces/coc.interface";

interface CocPlayerAchievementProps {
  player: Player;
}

interface AchievementProps {
  achievement: PlayerAchievement;
}

const Achievement = ({ achievement }: AchievementProps) => {
  return (
    <div className="border-2 border-black rounded-md">
      <div>
        <div>{achievement.stars}/3</div>
        <div>
          <div>{achievement.name}</div>
          <div>{achievement.info}</div>
        </div>
      </div>
      <div>
        {achievement.value}/{achievement.target}
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
    <div className="border-2 border-black rounded-md mx-4 px-4">
      <h2 className="text-center clash-font-style font-thin text-3xl">
        Achievements
      </h2>
      <div className="clash-font-style text-xl mb-4">Home Village</div>
      <div className="flex flex-col gap-2">{homeAchievements}</div>
      <div className="clash-font-style text-xl mb-4">Builder Village</div>
      <div className="flex flex-col gap-2">{builderAchievements}</div>
    </div>
  );
};

export default CocPlayerAchievements;
