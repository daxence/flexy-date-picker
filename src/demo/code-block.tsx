import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

/**
 * Collapsible "View code" snippet used throughout the demo page so each
 * example can be copy-pasted directly (also deployed alongside Storybook).
 */
export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable — ignore
    }
  }

  return (
    <details style={{ marginTop: 16 }}>
      <summary
        style={{
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: 600,
          color: '#0f766e',
          userSelect: 'none',
        }}
      >
        View code
      </summary>
      <div style={{ position: 'relative', marginTop: 8 }}>
        <button
          type="button"
          onClick={handleCopy}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            border: '1px solid #334155',
            background: '#1e293b',
            color: '#e2e8f0',
            borderRadius: 6,
            padding: '4px 8px',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <pre
          style={{
            margin: 0,
            padding: '16px',
            borderRadius: 10,
            background: '#0f172a',
            color: '#e2e8f0',
            fontSize: 13,
            lineHeight: 1.5,
            overflowX: 'auto',
          }}
        >
          <code>{code.trim()}</code>
        </pre>
      </div>
    </details>
  );
}
