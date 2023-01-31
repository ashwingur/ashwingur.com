import { NextApiRequest, NextApiResponse } from "next";
import Pusher from "pusher";

// export const pusher = new Pusher({
//   appId: process.env.appId,
//   key: process.env.key,
//   secret: process.env.secret,
//   cluster: process.env.cluster,
//   useTLS: true,
// });

export const pusher = new Pusher({
  appId: "1543144",
  key: "71a7b422dcc29a66021c",
  secret: "ce37a27071f6e188e2dc",
  cluster: "ap4",
  useTLS: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const roomName: string = req.body.roomName;

  console.log("requst body is :" + JSON.stringify(req.body));

  await pusher.trigger(roomName, "guest-joined", {}).then((response) => {
    res.status(200).json("Guest joined");
  });
}
