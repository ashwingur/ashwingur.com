import React, { useState } from "react";
import Navbar from "../components/Navbar";
import CodeEditor from "../components/CodeEditor/CodeEditor";
import CodeOutput from "../components/CodeEditor/CodeOutput";
import { LanguageType } from "../shared/interfaces/code.interface";

const Code = () => {
  let languages: LanguageType[] = [
    {
      name: "python",
      displayName: "Python",
      version: "3.10.0",
      defaultValue: 'print("Hello, World!")',
    },
    {
      name: "java",
      displayName: "Java",
      version: "15.0.2",
      defaultValue: `public class HelloWorld {
      public static void main(String[] args) {
          System.out.println("Hello, World!");
      }
  }`,
    },
    {
      name: "javascript",
      displayName: "JavaScript",
      version: "1.32.3",
      defaultValue: 'console.log("Hello, World!");',
    },
    {
      name: "typescript",
      displayName: "TypeScript",
      version: "1.32.3",
      defaultValue: 'console.log("Hello, World!");',
    },
    {
      name: "csharp",
      displayName: "C#",
      version: "5.0.201",
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
      version: "10.2.0",
      defaultValue: `#include <iostream>
    
int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
    },
    {
      name: "c",
      displayName: "C",
      version: "10.2.0",
      defaultValue: `#include <stdio.h>
      
int main() {
    printf("Hello, world!\\n");
    return 0;
}`,
    },
  ];
  // Current code editor value
  const [value, setValue] = useState(languages[0].defaultValue);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  return (
    <div className="bg-slate-200 dark:bg-black min-h-screen">
      <Navbar fixed={false} />
      <div className="flex flex-col lg:flex-row">
        <CodeEditor
          languages={languages}
          setValue={setValue}
          className="lg:w-1/2"
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
        <CodeOutput className="lg:w-1/2" value={value} language={selectedLanguage} />
      </div>
    </div>
  );
};

export default Code;
