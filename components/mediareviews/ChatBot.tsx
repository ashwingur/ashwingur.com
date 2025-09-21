import Card from "@components/Card";
import LoadingIcon from "@components/LoadingIcon";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { apiFetch } from "shared/queries/api-fetch";
import {
  chatResponseSchema,
  sendChatSchema,
} from "shared/validations/MediaReviewSchemas";

const ChatBot = () => {
  const [query, setQuery] = useState("");
  const [reply, setReply] = useState("");

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
      },
    },
  );

  return (
    <Card
      className="mx-4 mb-8 flex flex-col items-center md:mx-auto md:w-4/5"
      firstLayer={true}
    >
      <h3>Ask AshGPT</h3>
      <div className="flex items-center gap-4">
        <input
          className="input"
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
        <div className="mt-4 rounded border bg-gray-100 p-2">
          <strong>Response:</strong>{" "}
          <p className="whitespace-pre-wrap">{reply}</p>
        </div>
      )}
    </Card>
  );
};

export default ChatBot;
