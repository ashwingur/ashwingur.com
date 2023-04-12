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

  const playerTag = "#YUQ9RGUG";
  try {
    await mongoose.connect(
      process.env.MONGODB == undefined ? "" : process.env.MONGODB
    );
  } catch (error) {
    console.log(`Error connecting to mongodb: ${error}`);
    return res.status(500).json({ success: "false", error: error });
  }

  // Get the clan users
  try {
    const user = await CocUser.findOne({ id: playerTag });

    res.status(200).json({
      success: "true",
      testData: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      error: "something went wrong: " + JSON.stringify(error),
    });
  }
}
