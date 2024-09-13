import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
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
import { memo, useState } from "react";

const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
      HTMLAttributes: {
        // class: "text-3xl font-bold",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc pl-3",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal pl-3",
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
];

type EditorProps = {
  content: string;
  onChange: (value: string) => void;
};

export default function Editor({ content, onChange }: EditorProps) {
  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      onUpdate={({ editor }) => {
        onChange(editor.getHTML());
      }}
      editorProps={{
        attributes: {
          class:
            "editor min-h-[150px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        },
      }}
      slotBefore={<Toolbar />}
    ></EditorProvider>
  );
}

function Toolbar() {
  const { editor } = useCurrentEditor();

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
      <HeadingGroup isParagraph={editor.isActive("paragraph")} />
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
  isParagraph: boolean;
};

const HeadingGroup = memo(function HeadingGroup({
  isParagraph,
}: HeadingGroupProps) {
  const { editor } = useCurrentEditor();
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
