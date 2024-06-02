import React, { useState } from "react";
import Navbar from "../components/Navbar";
import CodeEditor from "../components/CodeEditor/CodeEditor";
import CodeOutput from "../components/CodeEditor/CodeOutput";
import { LanguageType } from "../shared/interfaces/code.interface";

const languages: LanguageType[] = [
  {
    name: "python",
    displayName: "Python",
    version: "3.10",
    defaultValue: 'print("Hello, World!")',
  },
  {
    name: "java",
    displayName: "Java",
    version: "15.0",
    defaultValue: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  },
  {
    name: "javascript",
    displayName: "JavaScript",
    version: "3.1",
    defaultValue: 'console.log("Hello, World!");',
  },
  {
    name: "csharp",
    displayName: "C#",
    version: "3.1",
    defaultValue: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
  },
  {
    name: "cpp",
    displayName: "C++",
    version: "3.1",
    defaultValue: `#include <iostream>
    
int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
  },
];
const Code = () => {
  // Current code editor value
  const [value, setValue] = useState("");

  return (
    <div className="bg-slate-200 dark:bg-black min-h-screen">
      <Navbar fixed={false} />
      <div className="flex flex-col lg:flex-row">
        <CodeEditor
          languages={languages}
          setValue={setValue}
          className="lg:w-1/2"
        />
        <CodeOutput className="lg:w-1/2" value={value} />
      </div>
    </div>
  );
};

export default Code;
