import Card from "@components/Card";
import LoadingIcon from "@components/LoadingIcon";
import Link from "next/link";
import React, { useState } from "react";
import Markdown from "react-markdown";
import { useMutation } from "react-query";
import { apiFetch } from "shared/queries/api-fetch";
import {
  chatResponseSchema,
  sendChatSchema,
} from "shared/validations/MediaReviewSchemas";

const ChatBot = () => {
  const [query, setQuery] = useState("");
  const [reply, setReply] = useState("");
  const [link, setLink] = useState<string>();

  const sendChatMutation = useMutation(
    async (userQuery: string) => {
      const body = sendChatSchema.parse({ query: userQuery });
      return apiFetch({
        endpoint: `/mediareviews/chat`,
        responseSchema: chatResponseSchema,
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      });
    },
    {
      onSuccess: (data) => {
        setReply(data.reply); // assumes API returns { reply: string }
        setQuery("");
        const urlParams = new URLSearchParams();
        urlParams.set("order-by", "rating_desc");
        urlParams.set("names", data.review_names.join(","));
        setLink(urlParams.toString());
      },
    },
  );

  return (
    <Card
      className="mx-4 mb-8 flex flex-col items-center md:mx-auto md:w-4/5"
      firstLayer={true}
    >
      <h3>Ask AshGPT</h3>
      <div className="flex w-full items-center justify-center gap-4">
        <input
          className="input w-72 md:w-4/5"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="btn flex h-10 w-20 items-center justify-center"
          onClick={() => {
            if (query.trim()) {
              sendChatMutation.mutate(query);
            }
          }}
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
        <p className="text-error">Error getting response</p>
      )}

      {reply && (
        <div className="mt-2 flex flex-col p-2">
          <Markdown
            components={{
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-6" {...props} />
              ),
              li: ({ node, ...props }) => <li className="marker" {...props} />,
            }}
          >
            {reply}
          </Markdown>
          {link && (
            <div className="mt-2 self-center">
              <Link href={`MediaReviews?${link}`} className="btn">
                Go To Reviews
              </Link>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default ChatBot;
