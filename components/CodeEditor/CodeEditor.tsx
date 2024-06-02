// src/components/CodeEditor.tsx
import React, { useRef, useState } from "react";
import { Editor, EditorProps, Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import LanguageSelector from "./LanguageSelector";
import { useTheme } from "next-themes";
import clsx from "clsx";

interface CodeEditorProps {
  languages: LanguageType[];
  className?: string;
}

const CodeEditor = ({ languages, className }: CodeEditorProps) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const vsTheme = currentTheme == "light" ? "vs-light" : "vs-dark";
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  // const [value, setValue] = useState("");

  function handleEditorDidMount(
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) {
    editorRef.current = editor;
  }

  function showValue() {
    alert(editorRef.current?.getValue());
  }

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
      />
    </div>
  );
};

export default CodeEditor;
