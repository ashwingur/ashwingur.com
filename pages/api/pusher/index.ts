import { NextApiRequest, NextApiResponse } from "next";
import Pusher from "pusher";
import { MessageData } from "../../Diskord";

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
  const msg_data: MessageData = req.body;

  await pusher.trigger("diskord", "chat-send", msg_data).then((response) => {
    res.status(200).json(msg_data);
  });
}
