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
  mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@ashwingur.dslbe5g.mongodb.net/clash_of_clans`
  );

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

    // Now go through each member and query them
    clanData.memberList.forEach(async (player) => {
      const playerResponse: AxiosResponse<Player> = await axios.get(
        `https://cocproxy.royaleapi.dev/v1/players/%23${player.tag.replace(
          "#",
          ""
        )}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.COC_BEARER_TOKEN}`,
          },
        }
      );
      const playerData = playerResponse.data;
      if (await CocUser.exists({ id: playerData.tag })) {
        const user = await CocUser.findOne({ id: playerData.tag });
        user.data.push({ time: Date.now(), player: playerData });
        await user.save();
      } else {
        await CocUser.create({
          id: playerData.tag,
          data: [{ time: Date.now(), player: playerData }],
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      error: "something went wrong: " + JSON.stringify(error),
    });
  }

  res.status(200).json({ success: "true" });
}
