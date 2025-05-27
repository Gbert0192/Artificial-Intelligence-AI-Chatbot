import React, { useState } from "react";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
}

const CodeBlockWithCopy: React.FC<{ codeText: string }> = ({ codeText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin teks: ", err);
    }
  };

  return (
    <div className="relative">
      <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto max-w-full whitespace-pre-wrap font-mono text-sm">
        <code>{codeText}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1 text-xs bg-gray-600 text-white rounded opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity duration-200"
        title="Salin kode"
      >
        {copied ? "Disalin!" : "Salin"}
      </button>
    </div>
  );
};

function parseMessage(message: string) {
  const splitRegex = /(```[\s\S]*?```)/g;
  const parts = message.split(splitRegex);

  const result: React.ReactNode[] = [];

  parts.forEach((part, idx) => {
    if (part.startsWith("```") && part.endsWith("```")) {
      const lines = part.trim().split("\n");
      const codeLines = lines.slice(1, lines.length - 1);
      const codeText = codeLines.join("\n");

      result.push(<CodeBlockWithCopy key={idx} codeText={codeText} />);
    } else {
      const lines = part.split("\n");
      let currentList: React.ReactNode[] | null = null;

      lines.forEach((line, i) => {
        const trimmedLine = line.trim();

        if (trimmedLine.startsWith("* ") || trimmedLine.startsWith("- ")) {
          if (!currentList) {
            currentList = [];
          }
          const listItemContent = trimmedLine.substring(2);
          currentList.push(
            <li key={`${idx}-li-${i}`} className="mb-1 last:mb-0">
              {parseInlineCodeAndBold(listItemContent)}
            </li>
          );
        } else {
          if (currentList) {
            result.push(<ul key={`${idx}-ul-${i}`}>{currentList}</ul>);
            currentList = null;
          }

          if (trimmedLine !== "") {
            result.push(
              <p key={`${idx}-p-${i}`} className="mb-2 last:mb-0">
                {parseInlineCodeAndBold(trimmedLine)}
              </p>
            );
          }
        }
      });

      if (currentList) {
        result.push(<ul key={`${idx}-ul-final`}>{currentList}</ul>);
      }
    }
  });

  return result;
}

function parseInlineCodeAndBold(text: string) {
  const parts = text.split(/(`[^`]+`|\*\*.+?\*\*)/g);

  return parts.map((part, idx) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          className="bg-gray-200 text-gray-800 px-1 rounded font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    } else if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={idx}>{part.slice(2, -2)}</strong>;
    } else {
      return <span key={idx}>{part}</span>;
    }
  });
}

export default function ChatBubble({ message, isUser }: ChatBubbleProps) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`px-5 py-3 rounded-2xl whitespace-pre-wrap break-words ${
          isUser
            ? "bg-gray-900 text-white rounded-br-none max-w-[90%] min-w-[300px]"
            : "bg-white text-gray-900 rounded-bl-none max-w-[90%] min-w-[300px]"
        }`}
        style={{ lineHeight: 1.5, fontSize: "0.95rem" }}
      >
        {parseMessage(message)}
      </div>
    </div>
  );
}
