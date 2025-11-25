"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { Copy, Check } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
      title="Kodu Kopyala"
    >
      {isCopied ? (
        <>
          <Check className="w-3.5 h-3.5 text-green-500" />
          <span className="text-green-500 font-medium">Kopyalandı</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>Kopyala</span>
        </>
      )}
    </button>
  );
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    // DÜZELTME BURADA: className'i ReactMarkdown'dan alıp dıştaki div'e verdik.
    // Bu sayede TypeScript hatası ortadan kalkar ve stil aynen korunur.
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            const codeString = String(children).replace(/\n$/, "");

            if (match) {
              return (
                <div className="my-6 rounded-xl overflow-hidden border border-white/10 bg-[#1e1e1e] shadow-lg not-prose">
                  <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-white/5">
                    <span className="text-xs font-mono font-bold text-gray-400 uppercase">
                      {language}
                    </span>
                    <CopyButton text={codeString} />
                  </div>
                  <div className="overflow-x-auto">
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={language}
                      PreTag="div"
                      className="!bg-[#1e1e1e] !p-4 !m-0 !rounded-none text-sm font-mono"
                      showLineNumbers={true}
                      wrapLines={true}
                    >
                      {codeString}
                    </SyntaxHighlighter>
                  </div>
                </div>
              );
            }

            return (
              <code
                className="bg-secondary/50 px-1.5 py-0.5 rounded-md font-mono text-sm font-semibold text-primary border border-primary/10"
                {...props}
              >
                {children}
              </code>
            );
          },
          a: ({ node, ...props }) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}