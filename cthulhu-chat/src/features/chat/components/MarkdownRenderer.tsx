import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

// Custom components for markdown rendering with Frutiger Aero styling
const markdownComponents: Components = {
    // Headings
    h1: ({ children }) => (
        <h1 className="text-xl font-display font-bold text-eldritch mb-3 mt-4 first:mt-0">{children}</h1>
    ),
    h2: ({ children }) => (
        <h2 className="text-lg font-display font-semibold text-bio-300 mb-2 mt-3 first:mt-0">{children}</h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-base font-semibold text-bio-400 mb-2 mt-2 first:mt-0">{children}</h3>
    ),

    // Paragraphs
    p: ({ children }) => (
        <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
    ),

    // Lists
    ul: ({ children }) => (
        <ul className="list-disc list-inside mb-2 space-y-1 ml-1">{children}</ul>
    ),
    ol: ({ children }) => (
        <ol className="list-decimal list-inside mb-2 space-y-1 ml-1">{children}</ol>
    ),
    li: ({ children }) => (
        <li className="text-bio-100">{children}</li>
    ),

    // Code blocks
    code: ({ className, children }) => {
        const isInline = !className;
        if (isInline) {
            return (
                <code className="bg-abyss-800/80 text-eldritch-400 px-1.5 py-0.5 rounded text-[0.85em] font-mono">
                    {children}
                </code>
            );
        }
        return (
            <code className="block bg-abyss-900/90 border border-bio-800/30 rounded-lg p-3 my-2 
                       text-sm font-mono overflow-x-auto text-bio-200">
                {children}
            </code>
        );
    },
    pre: ({ children }) => (
        <pre className="bg-abyss-900/90 border border-bio-800/30 rounded-lg p-3 my-2 
                    overflow-x-auto text-sm">
            {children}
        </pre>
    ),

    // Blockquotes
    blockquote: ({ children }) => (
        <blockquote className="border-l-2 border-eldritch/50 pl-3 my-2 text-bio-300 italic">
            {children}
        </blockquote>
    ),

    // Links
    a: ({ href, children }) => (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bio-400 hover:text-eldritch underline underline-offset-2 transition-colors"
        >
            {children}
        </a>
    ),

    // Strong/Bold
    strong: ({ children }) => (
        <strong className="font-semibold text-eldritch-200">{children}</strong>
    ),

    // Emphasis/Italic
    em: ({ children }) => (
        <em className="italic text-bio-300">{children}</em>
    ),

    // Horizontal rule
    hr: () => (
        <hr className="border-t border-bio-700/30 my-4" />
    ),

    // Tables
    table: ({ children }) => (
        <div className="overflow-x-auto my-2">
            <table className="w-full border-collapse text-sm">{children}</table>
        </div>
    ),
    thead: ({ children }) => (
        <thead className="bg-abyss-800/50 text-bio-300">{children}</thead>
    ),
    th: ({ children }) => (
        <th className="border border-bio-800/30 px-3 py-1.5 text-left font-medium">{children}</th>
    ),
    td: ({ children }) => (
        <td className="border border-bio-800/30 px-3 py-1.5">{children}</td>
    ),
};

interface MarkdownRendererProps {
    content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <div className="markdown-content">
            <ReactMarkdown components={markdownComponents}>
                {content}
            </ReactMarkdown>
        </div>
    );
}
