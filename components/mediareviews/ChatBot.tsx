import Card from "@components/Card";
import LoadingIcon from "@components/LoadingIcon";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import Markdown from "react-markdown";
import { useMutation } from "react-query";
import { apiFetch } from "shared/queries/api-fetch";
import {
  chatResponseSchema,
  sendChatSchema,
} from "shared/validations/MediaReviewSchemas";

type ChatMessage = {
  type: "user" | "bot";
  text: string;
  link?: string;
};

const ChatBot = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const latestMessageRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const sendChatMutation = useMutation(
    async (userQuery: string) => {
      const body = sendChatSchema.parse({ query: userQuery });
      return apiFetch({
        endpoint: `/mediareviews/chat`,
        responseSchema: chatResponseSchema,
        options: {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      });
    },
    {
      onSuccess: (data, userQuery) => {
        const urlParams = new URLSearchParams();
        urlParams.set("order-by", "rating_desc");
        urlParams.set("names", data.review_names.join(","));
        const link = `MediaReviews?${urlParams.toString()}`;

        setMessages((prev) => [
          ...prev,
          { type: "bot", text: data.reply, link },
        ]);
      },
    },
  );

  useEffect(() => {
    if (sendChatMutation.isLoading) {
      loadingRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    } else {
      // scroll to latest message when loading finishes
      latestMessageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [sendChatMutation.isLoading]);

  const handleSend = () => {
    if (!query.trim()) return;
    setMessages((prev) => [...prev, { type: "user", text: query }]);
    sendChatMutation.mutate(query);
    setQuery("");
  };

  return (
    <Card
      className="mx-4 mb-8 flex flex-col items-center md:mx-auto md:w-4/5 lg:w-3/5 2xl:w-1/2"
      firstLayer
    >
      <h3>Ask AshGPT</h3>
      <div className="mt-2 flex w-full items-center justify-center gap-4">
        <input
          className="input w-72 md:w-4/5"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your question..."
        />
        <button
          className="btn flex h-10 w-20 items-center justify-center"
          onClick={handleSend}
          disabled={sendChatMutation.isLoading}
        >
          {sendChatMutation.isLoading ? (
            <LoadingIcon className="mx-auto" />
          ) : (
            "Send"
          )}
        </button>
      </div>

      {sendChatMutation.isError && (
        <p className="mt-2 text-error">Error getting response</p>
      )}

      <div className="mt-4 flex max-h-[40vh] w-full flex-col gap-3 overflow-y-auto px-2 text-sm lg:text-base">
        {messages.map((msg, i) => {
          const isLatest = i === messages.length - 1;
          return (
            <div
              key={i}
              ref={isLatest ? latestMessageRef : null}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex flex-col rounded-lg p-2 ${
                  msg.type === "user"
                    ? "bg-secondary text-white"
                    : "bg-background-hover"
                } max-w-[90%] md:max-w-[80%]`}
              >
                <Markdown
                  components={{
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc pl-6" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="marker" {...props} />
                    ),
                  }}
                >
                  {msg.text}
                </Markdown>
                {msg.link && (
                  <div className="my-4 self-center">
                    <Link href={msg.link} className="btn btn-sm">
                      Go To Reviews
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {sendChatMutation.isLoading && (
          <div
            ref={loadingRef}
            className="flex max-w-[90%] flex-col rounded-lg bg-background-hover p-2 md:max-w-[80%]"
          >
            <LoadingIcon className="mx-auto text-3xl" />
          </div>
        )}
      </div>
    </Card>
  );
};

export default ChatBot;
