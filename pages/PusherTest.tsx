import axios from "axios";
import Pusher from "pusher-js";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

const PusherTest = () => {
  const [messages, setMessages] = useState<String[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pusher = new Pusher("71a7b422dcc29a66021c", {
      cluster: "ap4",
    });

    let channel = pusher.subscribe("my-channel");
    console.log("subscribed");
    channel.bind("my-event", function (data: any) {
      console.log("received data from pusher: " + JSON.stringify(data));
      setMessages((prev) => [...prev, data.message]);
      scrollToBottom();
    });

    return () => {
      pusher.unsubscribe("my-channel");
      console.log("unsubscribed");
    };
  }, []);

  const poke = () => {
    if (currentMessage.replace(/\s/g, "").length == 0) {
      return;
    }
    let random_msg = currentMessage; // Random string

    axios
      .post("/api/pusher", {
        message: random_msg,
      })
      .then((response) =>
        console.log("response: " + JSON.stringify(response.data))
      )
      .catch((error) => console.log("error: " + error));
    setCurrentMessage("");
    scrollToBottom();
  };

  const handle_input_change = (event: any) => {
    setCurrentMessage(event.target.value);
  };

  const update_username = (event: any) => {
    setUsername(event.target.value);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const enter_username = () => {
    if (username.replace(/\s/g, "").length > 0) {
      // Not purely whitespace, allow it
      setLoggedIn(true);
    } else {
      setUsername("");
    }
  };

  const all_messages = messages.map((msg, index) => (
    <div
      className="bg-white dark:bg-gray-900 my-2 rounded-full px-4 mx-2 py-2 inline-block"
      key={index}
    >
      {msg}
    </div>
  ));

  return (
    <div
      className="h-screen"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key == "Enter") {
          if (loggedIn) {
            poke();
          } else {
            enter_username();
          }
        }
      }}
    >
      {!loggedIn && (
        <div className="flex h-screen">
          <div className="m-auto flex flex-col items-center justify-center">
            <input
              className="border-2 w-72 md:w-96 rounded-full py-1 px-4"
              value={username}
              onChange={update_username}
              maxLength={30}
              placeholder="username"
            />
            <button
              className="bg-purple-500 text-gray-100 py-2 px-4 rounded-full my-4 hover:bg-purple-700"
              onClick={enter_username}
            >
              Enter Room
            </button>
          </div>
        </div>
      )}
      {loggedIn && (
        <div className="h-5/6">
          <h2 className="text-center">Hello, {username}</h2>
          <div className="h-5/6 m-8 overflow-y-scroll flex flex-col">
            {/* Chat */}
            {all_messages}
            <div ref={messagesEndRef} />
          </div>
          {/* Chat input */}
          <div className="flex justify-center gap-4 h items-center bottom-0 fixed w-screen px-4">
            <input
              className="border-2 w-72 md:w-[80%] rounded-full py-1 px-4"
              value={currentMessage}
              onChange={handle_input_change}
            />
            <button
              className="bg-purple-500 px-4 py-2 my-16 rounded-lg hover:bg-purple-700 transition-all"
              onClick={poke}
            >
              <div className="flex items-center gap-2">
                <span>Send</span>

                <AiOutlineSend />
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PusherTest;
