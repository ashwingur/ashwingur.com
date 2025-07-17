import clsx from "clsx";
import React, { useState } from "react";
import { LanguageType } from "../../shared/interfaces/code.interface";
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { AiOutlineLoading } from "react-icons/ai";

interface CodeOutputProps {
  className?: string;
  value: string;
  language: LanguageType;
}

interface PistonExecuteBody {
  language: string;
  version: string;
  files: PistonFile[];
}

interface PistonFile {
  name?: string;
  content: string;
}

interface PistonExecuteResponse {
  run: RunResult;
  language: string;
  version: string;
}

interface RunResult {
  stdout: string;
  stderr: string;
  code: number;
  signal: string | null;
  output: string;
}

const fetchCodeExecute = async (
  body: PistonExecuteBody,
): Promise<PistonExecuteResponse> => {
  try {
    const response = await fetch(`https://emkc.org/api/v2/piston/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const result: PistonExecuteResponse = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw new Error(`Failed to execute code ${error}`);
  }
};

const CodeOutput = ({ className, value, language }: CodeOutputProps) => {
  const { mutate, data, isError, isLoading } = useMutation(fetchCodeExecute);

  const handleRunClick = () => {
    const body: PistonExecuteBody = {
      language: language.name,
      version: language.version,
      files: [{ content: value }],
    };

    mutate(body);
  };

  if (isError) {
    return (
      <div>
        Error
        <button
          onClick={handleRunClick}
          className="mx-auto w-24 rounded-lg bg-sky-200 px-4 py-3 text-center font-bold transition-all hover:bg-blue-400 dark:bg-[#2e1065] dark:hover:bg-violet-800"
        >
          Run
        </button>
      </div>
    );
  }

  return (
    <div className={clsx(className)}>
      <div className="mt-4 h-16">
        <button
          onClick={handleRunClick}
          disabled={isLoading}
          className={clsx(
            isLoading ? "" : "hover:bg-primary-hover",
            "btn ml-4 flex h-12 w-24 items-center justify-center rounded-lg bg-primary px-4 py-3 font-bold text-text-primary transition-all",
          )}
        >
          {isLoading ? (
            <AiOutlineLoading className="animate-spin text-xl" />
          ) : (
            "Run"
          )}
        </button>
      </div>

      <div className="h-[80vh] overflow-x-hidden overflow-y-scroll bg-background-muted px-4 py-3 dark:bg-[#151515]">
        <pre className="mb-2 text-wrap">{data?.run.stdout}</pre>
        <pre className="text-red-700 dark:text-red-500">{data?.run.stderr}</pre>
      </div>
    </div>
  );
};

export default CodeOutput;
