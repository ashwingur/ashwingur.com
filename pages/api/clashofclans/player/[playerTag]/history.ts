import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import mongoose from "mongoose";
import CocUser from "../../../../../model/CocUser";

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

  const { playerTag } = req.query;

  if (typeof playerTag !== "string") {
    return res
      .status(400)
      .json({ success: "false", error: "Invalid player tag" });
  }

  try {
    await mongoose.connect(
      process.env.MONGODB == undefined ? "" : process.env.MONGODB
    );
  } catch (error) {
    console.log(`Error connecting to mongodb: ${error}`);
    return res.status(500).json({ success: "false", error: error });
  }

  // Get the player data
  await CocUser.findOne({ id: `#${playerTag}` })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error: any) => {
      console.log(`Error: ${error}`);
      res
        .status(500)
        .json({ error: "something went wrong: " + JSON.stringify(error) });
    });
}
