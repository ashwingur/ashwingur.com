import { Client, Player } from "clashofclans.js";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new Client();
  await client.login({
    email: process.env.COC_DEV_EMAIL!,
    password: process.env.COC_DEV_PASS!,
  });
  const player: Player = await client.getPlayer("#YLPGLJOV");
  console.log(player.name);
  res.status(200).json(player);
}
