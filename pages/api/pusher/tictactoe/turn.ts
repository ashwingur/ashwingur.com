import { NextApiRequest, NextApiResponse } from "next";
import Pusher from "pusher";

export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const roomName: string = req.body.roomName;
  const gameState: any = req.body.gameState;

  console.log("requst body is :" + JSON.stringify(req.body));

  await pusher.trigger(roomName, "turn", gameState).then((response) => {
    res.status(200).json("turn made: " + JSON.stringify(req.body.gameState));
  });
}
