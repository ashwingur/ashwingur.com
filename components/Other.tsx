import Link from "next/link";
import React from "react";

const Other = () => {
  return (
    <div id="other" className="pt-20 flex flex-col">
      <h1 className="text-center">Other</h1>
      <Link
        href="/CubeTimer"
        className="bg-blue-200 dark:bg-blue-700 hover:bg-blue-400 dark:hover:bg-blue-600 rounded-md p-2 font-bold mx-auto my-4"
      >
        <button>Cube Timer</button>
      </Link>
    </div>
  );
};

export default Other;
