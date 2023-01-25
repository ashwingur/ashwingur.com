import axios from "axios";
import Pusher from "pusher-js";
import React, { useEffect, useState } from "react";

const PusherTest = () => {
  const [messages, setMessages] = useState<String[]>([]);

  useEffect(() => {
    let pusher = new Pusher("71a7b422dcc29a66021c", {
      cluster: "ap4",
    });

    let channel = pusher.subscribe("my-channel");
    console.log("subscribned");
    channel.bind("my-event", function (data: any) {
      setMessages((prev) => [...prev, data.message]);
    });

    // axios.post("/api/pusher", { message: "TEST MESSAGE" });

    return () => {
      pusher.unsubscribe("my-channel");
    };
  }, []);

  const poke = () => {
    let random_msg = (Math.random() + 1).toString(36).substr(2, 5); // Random string
    try {
      axios.post("/api/pusher", {
        message: random_msg,
      });
    } catch (err) {
      console.log(err);
    }
    setMessages((prev) => [...prev, "MINE: " + random_msg]);
  };

  const all_messages = messages.map((msg, index) => (
    <div key={index}>{msg}</div>
  ));

  return (
    <div className="flex items-center justify-center flex-col">
      <button
        className="bg-green-200 px-8 py-2 my-16 rounded-lg hover:bg-green-400 transition-all"
        onClick={poke}
      >
        Poke
      </button>
      <div className="">{all_messages}</div>
    </div>
  );
};

export default PusherTest;
