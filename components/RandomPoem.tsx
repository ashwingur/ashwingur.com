import axios from "axios";
import React from "react";
import { isError, useQuery } from "react-query";

type Poem = {
  title: string;
  author: string;
  lines: string[];
  linecount: string;
};

const fetchRandomPoem = async (): Promise<Poem[]> => {
  const response = await fetch("https://poetrydb.org/random");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: Poem[] = await response.json();
  return data;
};

export const useRandomPoem = () => {
  return useQuery<Poem[], Error>(["randomPoem"], fetchRandomPoem);
};

const RandomPoem = () => {
  const { data, error, isLoading } = useRandomPoem();

  if (
    isLoading ||
    error ||
    data === undefined ||
    parseInt(data[0].linecount) > 50
  ) {
    return <div></div>;
  }

  const lines = data[0].lines.map((item, index) => (
    <div key={index}>{item}</div>
  ));

  return (
    <div id="randompoem">
      <h1 className="text-center">Random Poem</h1>
      <h3 className="text-center pt-4 text-2xl">{data[0].title}</h3>
      <div className="italic text-center text-lg mb-2">{data[0].author}</div>
      <div className="text-center">{lines}</div>
    </div>
  );
};

export default RandomPoem;
