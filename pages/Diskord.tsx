import axios from "axios";
import Pusher from "pusher-js";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import BasicNavbar from "../components/BasicNavbar";

export interface MessageData {
  message: string;
  username: string;
  uuid: string;
  timestamp: string;
}

const PusherTest = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [uuid, setUuid] = useState(uuidv4());

  const [liveUserCount, setLiverUserCount] = useState(0);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    let channel = pusher.subscribe("diskord");
    console.log("subscribed");
    channel.bind("chat-send", function (data: MessageData) {
      // console.log("received data from pusher: " + JSON.stringify(data));
      setMessages((prev) => [...prev, data]);
      // Scroll into view after the message has been given time to render
      setTimeout(() => {
        scrollToBottom();
      }, 300);
    });

    // Live user count
    channel.bind("pusher:subscription_count", (data: any) => {
      console.log("user count is : " + JSON.stringify(data));
      setLiverUserCount(data.subscription_count);
    });

    return () => {
      pusher.unsubscribe("diskord");
      console.log("unsubscribed");
    };
  }, []);

  const send_message = () => {
    if (currentMessage.replace(/\s/g, "").length == 0) {
      return;
    }

    const message_content: MessageData = {
      message: currentMessage,
      username: username,
      uuid: uuid,
      timestamp: new Date().toLocaleTimeString(),
    };

    axios
      .post("/api/pusher", message_content)
      .then((response) =>
        console.log("response: " + JSON.stringify(response.data))
      )
      .catch((error) => console.log("error: " + error));
    setCurrentMessage("");
  };

  const handle_input_change = (event: any) => {
    setCurrentMessage(event.target.value);
  };

  const update_username = (event: any) => {
    setUsername(event.target.value);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  const enter_username = () => {
    if (username.replace(/\s/g, "").length > 0) {
      // Allowed to login if the person is not purely whitespace
      setLoggedIn(true);
    } else {
      setUsername("");
    }
  };

  const all_messages = messages.map((msg_data: MessageData, index) => (
    <div
      key={index}
      className={
        uuid == msg_data.uuid
          ? "ml-auto mr-4 my-2 flex flex-col items-end"
          : "my-2"
      }
    >
      <div
        className={
          uuid == msg_data.uuid
            ? "flex gap-4 px-4 justify-end"
            : "flex gap-4 px-4"
        }
      >
        <div className="">{msg_data.username}</div>
        <div className="text-text-muted">{msg_data.timestamp}</div>
      </div>
      <div className="bg-background-muted rounded-2xl px-4 py-2 inline-block max-w-[80%] md:max-w-4xl my-1 break-words">
        {msg_data.message}
      </div>
    </div>
  ));

  return (
    <div
      className="h-screen outline-none"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key == "Enter") {
          if (loggedIn) {
            send_message();
          } else {
            enter_username();
          }
        }
      }}
    >
      <BasicNavbar fixed={false} />
      {!loggedIn && (
        <div className="flex h-screen">
          <div className="m-auto flex flex-col items-center justify-center">
            <input
              className="border-2 w-72 md:w-96 rounded-full py-2 px-4 bg-background-muted border-text-muted placeholder:text-text-muted"
              value={username}
              onChange={update_username}
              maxLength={30}
              placeholder="Username"
            />
            <button className="btn mt-4" onClick={enter_username}>
              Enter Room
            </button>
          </div>
        </div>
      )}
      {loggedIn && (
        <div className="h-5/6 pb-20">
          <h2 className="text-center my-2">Hello, {username}</h2>
          <p className="text-center">
            <span className="text-green-600 font-bold">{liveUserCount} </span>{" "}
            user{liveUserCount == 1 ? "" : "s"} online
          </p>
          <div className="h-5/6 m-8 overflow-y-scroll flex flex-col">
            {/* Chat */}
            {all_messages}
            <div ref={messagesEndRef} />
          </div>
          {/* Chat input */}
          <div className="flex justify-center gap-4 items-center bottom-0 fixed w-screen px-4 mb-8 md:mb-16">
            <input
              className="bg-background-muted border-2 border-text-muted w-64 md:w-[80%] rounded-full py-1 px-4"
              value={currentMessage}
              onChange={handle_input_change}
            />
            <button className="btn" onClick={send_message}>
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
