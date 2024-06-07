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
      defaultValue: `public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!");\n\t}\n}`,
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
      defaultValue: `using System;\n\nclass Program {\n\tstatic void Main() {\n\t\tConsole.WriteLine("Hello, World!");\n\t}\n}`,
    },
    {
      name: "cpp",
      displayName: "C++",
      version: "10.2.0",
      defaultValue: `#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, World!" << std::endl;\n\treturn 0;\n}`,
    },
    {
      name: "c",
      displayName: "C",
      version: "10.2.0",
      defaultValue: `#include <stdio.h>\n\nint main() {\n\tprintf("Hello, world!\\n");\n\treturn 0;\n}`,
    },
    {
      name: "php",
      displayName: "PHP",
      version: "8.2.3",
      defaultValue: `<?php\n\necho "Hello, World!";\n?>`,
    },
    {
      name: "rust",
      displayName: "Rust",
      version: "1.68.2",
      defaultValue: `fn main() {\n\tprintln!("Hello, World!");\n}`,
    },
    {
      name: "haskell",
      displayName: "Haskell",
      version: "9.0.1",
      defaultValue: `main = putStrLn "Hello, World!"`,
    },
    {
      name: "kotlin",
      displayName: "Kotlin",
      version: "1.8.20",
      defaultValue: `fun main() {\n\tprintln("Hello, World!")\n}`,
    },
    {
      name: "fortran",
      displayName: "Fortran",
      version: "10.2.0",
      defaultValue: `program Hello\n\tprint *, 'Hello, World!'\nend program Hello`,
    },
    {
      name: "bash",
      displayName: "Bash",
      version: "5.2.0",
      defaultValue: `#!/bin/bash\n\necho "Hello, World!"`,
    },
    {
      name: "brainfuck",
      displayName: "Brainfuck",
      version: "2.7.3",
      defaultValue: `++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.`,
    },
    {
      name: "swift",
      displayName: "Swift",
      version: "5.3.3",
      defaultValue: `print("Hello, World!")`,
    },
    {
      name: "matl",
      displayName: "MATL",
      version: "22.5.0",
      defaultValue: `'Hello, world!'`,
    },
    {
      name: "ruby",
      displayName: "Ruby",
      version: "3.0.1",
      defaultValue: `puts "Hello, World!"`,
    },
  ];

  // Current code editor value
  const [value, setValue] = useState(languages[0].defaultValue);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  return (
    <div className="bg-background min-h-screen">
      <Navbar fixed={false} />
      <div className="flex flex-col lg:flex-row">
        <CodeEditor
          languages={languages}
          setValue={setValue}
          className="lg:w-1/2"
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
        <CodeOutput
          className="lg:w-1/2"
          value={value}
          language={selectedLanguage}
        />
      </div>
    </div>
  );
};

export default Code;
