import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

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

  const { clanTag } = req.query;

  await axios
    .get(`https://cocproxy.royaleapi.dev/v1/clans/%23${clanTag}`, {
      headers: {
        Authorization: `Bearer ${process.env.COC_BEARER_TOKEN}`,
      },
    })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
      res
        .status(500)
        .json({ error: "something went wrong: " + JSON.stringify(error) });
    });
}
