import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle, TextStyleKit } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import clsx from "clsx";
import React from "react";
import { AiOutlineEnter } from "react-icons/ai";
import {
  FaAlignCenter,
  FaItalic,
  FaRedo,
  FaStrikethrough,
  FaUndo,
} from "react-icons/fa";
import {
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaCode,
  FaEraser,
  FaLink,
  FaQuoteLeft,
  FaSubscript,
  FaSuperscript,
  FaUnderline,
} from "react-icons/fa6";
import { IoCode } from "react-icons/io5";
import {
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdHorizontalRule,
  MdOutlineFormatClear,
} from "react-icons/md";
import { common, createLowlight } from "lowlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";

interface TipTapProps {
  value: string;
  onChange: (content: string) => void;
  className?: string;
  editorClassName?: string;
}

interface MenuBarProps {
  editor: Editor | null;
  className?: string;
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Underline,
  StarterKit.configure({
    codeBlock: false,
  }),
  CodeBlockLowlight.configure({
    lowlight: createLowlight(common),
  }),
  Subscript,
  Superscript,
  Placeholder.configure({
    placeholder: "May your nib remain sharp and your ink flow effortlessly...",
  }),
  Link,
];

const MenuBar = ({ editor, className }: MenuBarProps) => {
  if (!editor) {
    return null;
  }

  // NOTE we have to add type button so it doesnt trigger form submissions when used inside a form
  return (
    <div className={clsx(className)}>
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <FaUndo />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <FaRedo />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <FaBold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <FaItalic />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
      >
        <FaUnderline />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <FaStrikethrough />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
      >
        <FaAlignLeft />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
      >
        <FaAlignCenter />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
      >
        <FaAlignRight />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={editor.isActive({ textAlign: "justify" }) ? "is-active" : ""}
      >
        <FaAlignJustify />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        <IoCode />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        <FaCode />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        <MdOutlineFormatClear />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().clearNodes().run()}
      >
        <FaEraser />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        P
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        H3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <MdFormatListBulleted />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <MdFormatListNumbered />
      </button>
      <button
        type="button"
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleLink({ href: editor.getAttributes("link").href })
            .run()
        }
        className={editor.isActive("link") ? "is-active" : ""}
      >
        <FaLink />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        <FaQuoteLeft />
      </button>
      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleSuperscript().unsetSubscript().run()
        }
        className={editor.isActive("superscript") ? "is-active" : ""}
      >
        <FaSuperscript />
      </button>
      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleSubscript().unsetSuperscript().run()
        }
        className={
          editor.isActive("superscript") ? "is-active bg-blue-400" : ""
        }
      >
        <FaSubscript />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <MdHorizontalRule />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        <AiOutlineEnter />
      </button>
    </div>
  );
};

const TipTap: React.FC<TipTapProps> = ({
  value,
  onChange,
  className,
  editorClassName,
}) => {
  const editor = useEditor({
    extensions,
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
  return (
    <div
      className={clsx(
        className,
        "flex flex-col rounded-md border border-text-muted px-3 md:px-4",
      )}
    >
      <MenuBar
        editor={editor}
        className="menubar flex flex-wrap gap-1 border-b border-text-muted py-2 text-lg"
      />
      <EditorContent
        editor={editor}
        className={clsx("editor min-h-24 cursor-text py-4", editorClassName)}
        autoComplete="new-password"
        onClick={() => {
          editor && !editor.isFocused && editor.commands.focus();
        }}
      />
    </div>
  );
};

export default TipTap;
