import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

// Custom components for markdown rendering with enhanced visibility
const markdownComponents: Components = {
    // Headings - more prominent with glow
    h1: ({ children }) => (
        <h1 className="text-xl sm:text-2xl font-display font-bold text-eldritch text-glow mb-4 mt-5 first:mt-0 
                   border-b border-eldritch/30 pb-2">
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2 className="text-lg sm:text-xl font-display font-semibold text-bio-200 mb-3 mt-4 first:mt-0">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-base sm:text-lg font-semibold text-bio-300 mb-2 mt-3 first:mt-0">
            {children}
        </h3>
    ),

    // Paragraphs - better spacing and line height
    p: ({ children }) => (
        <p className="mb-3 last:mb-0 leading-relaxed text-white/90">{children}</p>
    ),

    // Lists - more visible markers and spacing
    ul: ({ children }) => (
        <ul className="mb-3 space-y-2 ml-4 list-none">
            {children}
        </ul>
    ),
    ol: ({ children }) => (
        <ol className="mb-3 space-y-2 ml-4 list-decimal list-outside marker:text-eldritch marker:font-semibold">
            {children}
        </ol>
    ),
    li: ({ children }) => (
        <li className="text-white/90 pl-2 relative before:content-['▸'] before:absolute before:-left-4 
                   before:text-eldritch before:font-bold">
            {children}
        </li>
    ),

    // Code blocks - much more visible with better contrast
    code: ({ className, children }) => {
        const isInline = !className;
        if (isInline) {
            return (
                <code className="bg-eldritch/20 text-eldritch border border-eldritch/30 
                         px-1.5 py-0.5 rounded text-[0.9em] font-mono">
                    {children}
                </code>
            );
        }
        return (
            <code className="block text-bio-100 whitespace-pre-wrap break-words">
                {children}
            </code>
        );
    },
    pre: ({ children }) => (
        <pre className="bg-abyss-950 border border-bio-600/40 rounded-xl p-4 my-3 
                    overflow-x-auto text-sm font-mono shadow-lg
                    ring-1 ring-inset ring-white/5">
            {children}
        </pre>
    ),

    // Blockquotes - more distinctive
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-eldritch/60 bg-eldritch/5 pl-4 pr-3 py-2 my-3 
                           rounded-r-lg text-bio-200 italic">
            {children}
        </blockquote>
    ),

    // Links - more visible
    a: ({ href, children }) => (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bio-300 hover:text-eldritch font-medium
                 underline decoration-bio-500/50 underline-offset-2 
                 hover:decoration-eldritch transition-all duration-200"
        >
            {children}
        </a>
    ),

    // Strong/Bold - bright and clear
    strong: ({ children }) => (
        <strong className="font-bold text-eldritch">{children}</strong>
    ),

    // Emphasis/Italic
    em: ({ children }) => (
        <em className="italic text-bio-200">{children}</em>
    ),

    // Horizontal rule
    hr: () => (
        <hr className="border-t-2 border-bio-600/30 my-5" />
    ),

    // Tables - enhanced visibility
    table: ({ children }) => (
        <div className="overflow-x-auto my-3 rounded-lg border border-bio-700/40">
            <table className="w-full border-collapse text-sm">{children}</table>
        </div>
    ),
    thead: ({ children }) => (
        <thead className="bg-abyss-800 text-eldritch font-medium">{children}</thead>
    ),
    tbody: ({ children }) => (
        <tbody className="divide-y divide-bio-800/30">{children}</tbody>
    ),
    th: ({ children }) => (
        <th className="px-4 py-2.5 text-left font-semibold border-b border-bio-700/40">{children}</th>
    ),
    td: ({ children }) => (
        <td className="px-4 py-2.5 text-white/85">{children}</td>
    ),
    tr: ({ children }) => (
        <tr className="hover:bg-white/5 transition-colors">{children}</tr>
    ),
};

interface MarkdownRendererProps {
    content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <div className="markdown-content prose-invert max-w-none">
            <ReactMarkdown components={markdownComponents}>
                {content}
            </ReactMarkdown>
        </div>
    );
}

