import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import mongoose from "mongoose";
import CocUser from "../../../model/CocUser";
// const CocUser = require("../../../model/CocUser");
import PlayerDataExample from "../../../data/player.json";
import { Clan, Player } from "../../../shared/interfaces/coc.interface";

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

  const usersUpdated: { tag: string; name: string }[] = [];

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
      .then(async (responses: AxiosResponse<Player>[]) => {
        for (const response of responses) {
          const playerData = response.data;
          if (await CocUser.exists({ id: playerData.tag })) {
            const user = await CocUser.findOne({ id: playerData.tag });
            user.data.push({ time: Date.now(), player: playerData });
            await user.save();
            usersUpdated.push({ tag: playerData.tag, name: playerData.name });
          } else {
            CocUser.create({
              id: playerData.tag,
              data: [{ time: Date.now(), player: playerData }],
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
