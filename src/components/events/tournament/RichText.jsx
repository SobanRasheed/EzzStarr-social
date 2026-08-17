const URL_PATTERN = /(https?:\/\/[^\s)]+)/g;

// The Figma description is one text node with inline links painted magenta.
// Split on URLs so they render as real anchors; `white-space: pre-wrap` on the
// container preserves the original line breaks.
export default function RichText({ text, className = "tmt-prose" }) {
  const parts = text.split(URL_PATTERN);

  return (
    <p className={className}>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <a key={`${part}-${index}`} href={part} target="_blank" rel="noreferrer">
            {part}
          </a>
        ) : (
          part
        ),
      )}
    </p>
  );
}
