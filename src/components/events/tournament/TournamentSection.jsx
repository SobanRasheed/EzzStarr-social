// Ambient blur circles that sit behind every section in the Figma frames
// (the `div.framer-ta9n66` rectangles). Offsets are relative to the section top.
const TEAL = { tone: "teal", top: -66, left: 0, size: 535 };
const MAGENTA = { tone: "magenta", top: 29, right: 149, size: 641 };

export const GLOWS = {
  // node 8475:90894 — behind the tab strip
  tabs: [
    { ...TEAL, opacity: 0.2 },
    { ...MAGENTA, opacity: 0.15 },
  ],
  // node 8475:91437 — Participants pushes the magenta circle to the right edge
  participants: [
    { tone: "magenta", top: 44, right: 10, size: 641, opacity: 0.09 },
  ],
  // node 8475:91686 — Brackets keeps both, magenta at full strength
  brackets: [
    { ...TEAL, opacity: 0.06 },
    { ...MAGENTA, opacity: 0.15 },
  ],
};

export default function TournamentSection({ glows = [], className = "", children }) {
  return (
    <section className={`tmt-section ${className}`.trim()}>
      {glows.map((glow) => (
        <div
          key={`${glow.tone}-${glow.top}-${glow.opacity}`}
          className={`tmt-glow tmt-glow--${glow.tone}`}
          style={{
            top: glow.top,
            left: glow.left,
            right: glow.right,
            width: glow.size,
            height: glow.size,
            opacity: glow.opacity,
          }}
        />
      ))}
      {children}
    </section>
  );
}
