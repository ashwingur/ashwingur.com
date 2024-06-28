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
  body: PistonExecuteBody
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
          className="bg-sky-200 dark:bg-[#2e1065] hover:bg-blue-400 dark:hover:bg-violet-800 rounded-lg py-3 px-4 font-bold mx-auto transition-all w-24 text-center"
        >
          Run
        </button>
      </div>
    );
  }

  return (
    <div className={clsx(className)}>
      <div className="h-16 mt-4">
        <button
          onClick={handleRunClick}
          disabled={isLoading}
          className={clsx(
            isLoading ? "" : "hover:bg-primary-hover",
            "btn bg-primary text-text-primary rounded-lg py-3 px-4 font-bold transition-all w-24 h-12 flex items-center justify-center ml-4"
          )}
        >
          {isLoading ? (
            <AiOutlineLoading className="animate-spin text-xl" />
          ) : (
            "Run"
          )}
        </button>
      </div>

      <div className="bg-background-muted dark:bg-[#151515] h-[80vh] py-3 px-4 overflow-y-scroll overflow-x-hidden">
        <pre className="mb-2 text-wrap">{data?.run.stdout}</pre>
        <pre className="text-red-700 dark:text-red-500">{data?.run.stderr}</pre>
      </div>
    </div>
  );
};

export default CodeOutput;
