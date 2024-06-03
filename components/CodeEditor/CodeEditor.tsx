// src/components/CodeEditor.tsx
import React, { useEffect, useRef, useState } from "react";
import { Editor, EditorProps, Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import LanguageSelector from "./LanguageSelector";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { LanguageType } from "../../shared/interfaces/code.interface";

interface CodeEditorProps {
  languages: LanguageType[];
  className?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  selectedLanguage: LanguageType;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<LanguageType>>;
}

const CodeEditor = ({ languages, className, setValue, selectedLanguage, setSelectedLanguage }: CodeEditorProps) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const vsTheme = currentTheme == "light" ? "vs-light" : "vs-dark";
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  // const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  // const [value, setValue] = useState("");

  function handleEditorDidMount(
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) {
    editorRef.current = editor;
  }

  useEffect(() => {
    if (editorRef) {
      setValue(editorRef.current?.getValue() ?? selectedLanguage.defaultValue);
    }
  });

  return (
    <div className={clsx(className)}>
      <div className="h-16 mt-4">
        <LanguageSelector
          languages={languages}
          selectedLanguage={selectedLanguage}
          onSelectedLanguageChange={setSelectedLanguage}
          className="ml-4"
        />
      </div>
      <Editor
        height="80vh"
        language={selectedLanguage.name}
        defaultValue={selectedLanguage.defaultValue}
        theme={vsTheme}
        onMount={handleEditorDidMount}
        path={selectedLanguage.name}
        onChange={(value) => setValue(value ?? selectedLanguage.defaultValue)}
      />
    </div>
  );
};

export default CodeEditor;
