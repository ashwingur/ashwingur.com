import { NextApiRequest, NextApiResponse } from "next";
import Pusher from "pusher";
import { MessageData } from "../../Diskord";

// PUSHER DISKORD Messages

// export const pusher = new Pusher({
//   appId: process.env.appId,
//   key: process.env.key,
//   secret: process.env.secret,
//   cluster: process.env.cluster,
//   useTLS: true,
// });

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
  const msg_data: MessageData = req.body;

  await pusher.trigger("diskord", "chat-send", msg_data).then((response) => {
    res.status(200).json(msg_data);
  });
}
