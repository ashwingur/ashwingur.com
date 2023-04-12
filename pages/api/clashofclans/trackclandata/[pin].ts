import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import mongoose from "mongoose";
import CocUser from "../../../../model/CocUser";
import { Clan } from "../../../../shared/interfaces/coc.interface";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // https://stackoverflow.com/questions/65058598/nextjs-cors-issue
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const { pin } = req.query;
  console.log(pin);
  console.log(process.env.CLANTRACK_PIN);

  if (pin !== process.env.CLANTRACK_PIN) {
    return res.status(403).json({ success: "false", error: "Invalid pin" });
  }

  const clanTag = "220QP2GGU";
  try {
    await mongoose.connect(
      process.env.MONGODB == undefined ? "" : process.env.MONGODB
    );
  } catch (error) {
    console.log(
      `Error connecting to mongodb: ${error}, connection string: ${process.env.MONGODB}`
    );
    return res
      .status(500)
      .json({ success: "false", error: JSON.stringify(error) });
  }

  const usersUpdated: { tag: string; name: string; status: string }[] = [];

  // Get the clan users
  try {
    const clanResponse: AxiosResponse<Clan> = await axios.get(
      `https://cocproxy.royaleapi.dev/v1/clans/%23${clanTag}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.COC_BEARER_TOKEN}`,
        },
      }
    );
    const clanData = clanResponse.data;
    const playerTags = clanData.memberList.map((player) =>
      player.tag.replace("#", "")
    );
    // Now get all the clan members data and update
    await axios
      .all(
        playerTags.map((tag) =>
          axios.get(`https://cocproxy.royaleapi.dev/v1/players/%23${tag}`, {
            headers: {
              Authorization: `Bearer ${process.env.COC_BEARER_TOKEN}`,
            },
          })
        )
      )
      .then(async (responses) => {
        for (const response of responses) {
          const playerData = response.data;

          // Deleting uncessary objects
          delete playerData.clan;
          delete playerData.league;
          delete playerData.playerHouse;
          delete playerData.labels;
          for (const achievement of playerData.achievements) {
            delete achievement.target;
            delete achievement.stars;
            delete achievement.info;
            delete achievement.completionInfo;
            delete achievement.village;
          }
          for (const troop of playerData.troops) {
            delete troop.maxLevel;
            delete troop.village;
            delete troop.superTroopIsActive;
          }
          for (const hero of playerData.heroes) {
            delete hero.maxLevel;
            delete hero.village;
          }
          for (const spell of playerData.spells) {
            delete spell.maxLevel;
            delete spell.village;
          }

          if (await CocUser.exists({ id: playerData.tag })) {
            const user = await CocUser.findOne({ id: playerData.tag });
            user.data.push({ time: Date.now(), player: playerData });
            await user.save();
            usersUpdated.push({
              tag: playerData.tag,
              name: playerData.name,
              status: "updated",
            });
          } else {
            CocUser.create({
              id: playerData.tag,
              data: [{ time: Date.now(), player: playerData }],
            });
            usersUpdated.push({
              tag: playerData.tag,
              name: playerData.name,
              status: "created",
            });
          }
        }
      });

    return res.status(200).json({
      success: "true",
      users_updated: usersUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      error: "something went wrong: " + JSON.stringify(error),
    });
  }
}
