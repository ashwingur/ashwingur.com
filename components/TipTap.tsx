import CodeBlock from "@tiptap/extension-code-block";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
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
}

interface MenuBarProps {
  editor: Editor | null;
  className?: string;
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
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

const content = `
<h1>
  This is a H1 Heading,
</h1>
<h2>
  This is a H2 Heading,
</h2>
<h3>
  This is a H3 Heading,
</h3>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;

const TipTap: React.FC<TipTapProps> = ({ value, onChange, className }) => {
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
        "border border-text rounded-md px-3 md:px-4 flex flex-col"
      )}
    >
      <MenuBar
        editor={editor}
        className="menubar flex flex-wrap gap-1 border-b border-text-muted py-2 text-lg"
      />
      <EditorContent
        editor={editor}
        className="editor py-4 min-h-48"
        autoComplete="new-password"
      />
      {/* <pre className="text-wrap">{editor?.getHTML()}</pre> */}
    </div>
  );
};

export default TipTap;
