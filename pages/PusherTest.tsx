import axios from "axios";
import Pusher from "pusher-js";
import React, { useEffect, useState } from "react";

const PusherTest = () => {
  const [messages, setMessages] = useState<String[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const pusher = new Pusher("71a7b422dcc29a66021c", {
    cluster: "ap4",
  });

  useEffect(() => {
    let channel = pusher.subscribe("my-channel");
    console.log("subscribed");
    channel.bind("my-event", function (data: any) {
      setMessages((prev) => [...prev, data.message]);
    });

    return () => {
      pusher.unsubscribe("my-channel");
      console.log("unsubscribed");
    };
  }, []);

  const poke = () => {
    let random_msg = currentMessage; // Random string

    axios
      .post("/api/pusher", {
        message: random_msg,
      })
      .then((response) =>
        console.log("response: " + JSON.stringify(response.data))
      )
      .catch((error) => console.log("error: " + error));
    // setMessages((prev) => [...prev, "MINE: " + random_msg]);
    setCurrentMessage("");
  };

  const handle_input_change = (event: any) => {
    setCurrentMessage(event.target.value);
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
      <input
        className="border-4 w-[80%]"
        value={currentMessage}
        onChange={handle_input_change}
      />
      <div className="">{all_messages}</div>
    </div>
  );
};

export default PusherTest;
