import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await axios
    .get("https://api.transport.nsw.gov.au/v1/carpark", {
      headers: {
        Authorization: `apikey ${process.env.OPEN_DATA_TOKEN}`,
      },
    })
    .then((response) => {
      console.log(`Response: ${response}`);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
      res
        .status(500)
        .json({ error: "something went wrong: " + JSON.stringify(error) });
    });
}
