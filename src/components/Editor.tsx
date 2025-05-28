import {
  type Editor as EditorType,
  EditorContent,
  useEditor,
  mergeAttributes,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import { Toggle } from "./ui/toggle";
import {
  FontBoldIcon,
  FontItalicIcon,
  ListBulletIcon,
} from "@radix-ui/react-icons";
import { CodeIcon, CodeXmlIcon, ListOrderedIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import React, { memo, useState } from "react";

const extensions = [
  StarterKit.configure({
    heading: false,
    bulletList: {
      HTMLAttributes: {
        class: "list-disc px-3 my-4 ml-6",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal px-3 my-4 ml-6",
      },
    },
    code: {
      HTMLAttributes: {
        class: "bg-gray-200 rounded-sm p-1",
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: "text-white bg-gray-800 rounded-sm p-2 my-4",
      },
    },
  }),
  Heading.configure({
    levels: [1, 2, 3],
    HTMLAttributes: { class: "my-4" },
  }).extend({
    levels: [1, 2, 3],
    renderHTML({ node, HTMLAttributes }) {
      const level = this.options.levels.includes(node.attrs.level)
        ? node.attrs.level
        : this.options.levels[0];
      const classes: { [index: number]: string } = {
        1: "text-4xl font-bold mb-4",
        2: "text-3xl font-bold mb-3",
        3: "text-2xl font-bold mb-2",
      };
      return [
        `h${level}`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          class: `${classes[level]}`,
        }),
        0,
      ];
    },
  }),
];

type EditorProps = {
  content: string;
  onChange: (value: string) => void;
};

// export default function Editor({ content, onChange }: EditorProps) {
const Editor = React.forwardRef<HTMLDivElement, EditorProps>(
  ({ content, onChange, ...props }, forwardedRef) => {
    const editor = useEditor({
      extensions,
      content,
      // onCreate: ({ editor }) => {
      //   editor.commands.setContent(content);
      // },
      onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
      },
      // onCreate: ({ editor }) => {
      //   editor.commands.clearContent(true);
      // },
      editorProps: {
        attributes: {
          class:
            "editor min-h-[150px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        },
      },
    });

    return (
      <>
        <Toolbar editor={editor} />
        <EditorContent ref={forwardedRef} editor={editor} {...props} />
      </>
    );
  },
);
// }

export default Editor;

type ToolbarProps = {
  editor: EditorType | null;
};

function Toolbar({ editor }: ToolbarProps) {
  const toobarItems = [
    {
      name: "bold",
      action: () => editor?.chain().focus().toggleBold().run(),
      icon: <FontBoldIcon className="size-4" />,
    },
    {
      name: "italic",
      action: () => editor?.chain().focus().toggleItalic().run(),
      icon: <FontItalicIcon className="size-4" />,
    },
    {
      name: "bulletList",
      action: () => editor?.chain().focus().toggleBulletList().run(),
      icon: <ListBulletIcon className="size-4" />,
    },
    {
      name: "orderedList",
      action: () => editor?.chain().focus().toggleOrderedList().run(),
      icon: <ListOrderedIcon className="size-4" />,
    },
    {
      name: "code",
      action: () => editor?.chain().focus().toggleCode().run(),
      icon: <CodeIcon className="size-4" />,
    },
    {
      name: "codeBlock",
      action: () => editor?.chain().focus().toggleCodeBlock().run(),
      icon: <CodeXmlIcon className="size-4" />,
    },
  ];

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1 rounded-md border border-input">
      <HeadingGroup
        editor={editor}
        isParagraph={editor.isActive("paragraph")}
      />
      {toobarItems.map((item) => (
        <Toggle
          key={item.name}
          size="sm"
          pressed={editor.isActive(item.name)}
          onPressedChange={item.action}
        >
          {item.icon}
        </Toggle>
      ))}
    </div>
  );
}

type Level = 1 | 2 | 3;

type HeadingGroupProps = {
  editor: EditorType | null;
  isParagraph: boolean;
};

const HeadingGroup = memo(function HeadingGroup({
  editor,
  isParagraph,
}: HeadingGroupProps) {
  // const { editor } = useCurrentEditor();
  const [selectedValue, setSelectedValue] = useState("paragraph");

  const handleValueChange = (value: string) => {
    setSelectedValue(value);

    if (value === "paragraph") {
      editor?.chain().focus().setParagraph().run();
    }
    editor
      ?.chain()
      .focus()
      .toggleHeading({ level: parseInt(value) as Level })
      .run();
  };

  return (
    <Select
      onValueChange={handleValueChange}
      defaultValue="paragraph"
      value={isParagraph ? "paragraph" : selectedValue}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Heading" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="paragraph">Normal</SelectItem>
        {["1", "2", "3"].map((level) => (
          <SelectItem key={level} value={level} className="">
            {`Heading ${level}`}{" "}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});
