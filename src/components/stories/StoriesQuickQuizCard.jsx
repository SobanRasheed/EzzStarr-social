export default function StoriesQuickQuizCard({ onStart }) {
  return (
    <div
      style={{
        marginTop: 20,
        borderRadius: 14,
        border: "1.5px solid transparent",
        background:
          "linear-gradient(#12121a, #12121a) padding-box, linear-gradient(135deg, #06b6d4, #7c3aed) border-box",
        padding: "18px 16px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            flexShrink: 0,
            background: "linear-gradient(135deg,#1e1b4b,#312e81)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            position: "relative",
          }}
        >
          SP
          <span style={{ position: "absolute", top: -4, right: -4, fontSize: 10, color: "#a78bfa" }}>
            +
          </span>
        </div>
        <div>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: 15, margin: 0 }}>Quick Quiz</p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, margin: 0 }}>
            Did you understand Part 1?
          </p>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 14 }}>
        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 13,
            textAlign: "center",
            marginBottom: 14,
          }}
        >
          Answer questions to claim your reward Spica
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={onStart}
            style={{
              background: "linear-gradient(135deg,#06b6d4,#7c3aed)",
              border: "none",
              borderRadius: 999,
              padding: "10px 36px",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
