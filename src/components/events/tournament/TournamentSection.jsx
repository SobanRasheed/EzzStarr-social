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
