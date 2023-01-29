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

export default async function handler(req, res) {
  const { message, sender } = req.body;
  // const response = await pusher.trigger("chat", "chat-event", {
  //   message,
  //   sender,
  // });

  console.log(req.body);

  await pusher
    .trigger("my-channel", "my-event", {
      message: message,
    })
    .then((response) => {
      res.status(200).json({ message: JSON.stringify(response) });
    });

  // res.status(200).json({ message: "completed" });
}
