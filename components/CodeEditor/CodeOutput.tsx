import clsx from "clsx";
import React, { useState } from "react";
import { LanguageType } from "../../shared/interfaces/code.interface";
import { UseQueryResult, useQuery, useQueryClient } from "react-query";

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

const fetchCodeExecute = async (body: PistonExecuteBody): Promise<PistonExecuteResponse> => {
  try {
    const response = await fetch(
      `https://emkc.org/api/v2/piston/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const result: PistonExecuteResponse = await response.json();
    return result;
  } catch (error) {
    throw new Error(`Failed to execute code ${error}`);
  }
}

const CodeOutput = ({ className, value, language }: CodeOutputProps) => {
  const [executeBody, setExecuteBody] = useState<PistonExecuteBody>({
    language: language.name,
    version: language.version,
    files: [{ content: value }]
  });

  const { data, isError, refetch, isFetching }: UseQueryResult<PistonExecuteResponse, Error> = useQuery<PistonExecuteResponse, Error>(
    ['executeCode'],
    () => fetchCodeExecute(executeBody),
    {
      enabled: false, // Disable automatic query
    }
  );

  const handleRunClick = () => {
    setExecuteBody({
      language: language.name,
      version: language.version,
      files: [{ content: value }]
    });
    refetch();
  };

  if (isFetching) {
    return <div>loading...</div>
  }
  if (isError || data === undefined) {
    return <div>Error<button
      onClick={handleRunClick}
      className="bg-sky-200 dark:bg-[#2e1065] hover:bg-blue-400 dark:hover:bg-violet-800 rounded-lg py-3 px-4 font-bold mx-auto transition-all w-24 text-center"
    >
      Run
    </button></div>
  }


  return (
    <div className={clsx(className)}>
      <div className="h-16 mt-4">
        <button
          onClick={handleRunClick}
          className="bg-sky-200 dark:bg-[#2e1065] hover:bg-blue-400 dark:hover:bg-violet-800 rounded-lg py-3 px-4 font-bold mx-auto transition-all w-24 text-center"
        >
          Run
        </button>
      </div>
      <div className="bg-[#f0f0f0] dark:bg-[#151515] h-[80vh]">{data.run.stderr === "" ? data.run.stdout : data.run.stderr}</div>
    </div>
  );
};

export default CodeOutput;
