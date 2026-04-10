import { useState } from "react";
import { QUIZ_QUESTIONS } from "./storyConstants";

export default function StoriesQuizSection({ onClose }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const select = (questionId, answerIndex) => {
    if (!submitted) {
      setAnswers((previous) => ({ ...previous, [questionId]: answerIndex }));
    }
  };

  const score = submitted
    ? QUIZ_QUESTIONS.filter((question) => answers[question.id] === question.correct).length
    : 0;
  const allAnswered = Object.keys(answers).length === QUIZ_QUESTIONS.length;

  return (
    <div
      style={{
        marginTop: 32,
        borderRadius: 14,
        border: "1.5px solid transparent",
        background:
          "linear-gradient(#0f0f1a, #0f0f1a) padding-box, linear-gradient(135deg, #06b6d4, #7c3aed) border-box",
        padding: "24px 28px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          paddingBottom: 16,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            flexShrink: 0,
            background: "linear-gradient(135deg,#1e1b4b,#312e81)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            position: "relative",
          }}
        >
          SP
          <span style={{ position: "absolute", top: -4, right: -4, fontSize: 10, color: "#a78bfa" }}>
            +
          </span>
        </div>
        <div>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: 17, margin: 0 }}>Quick Check</p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: 0 }}>
            Did you understand Part 1?
          </p>
        </div>
      </div>

      {submitted ? (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <p
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: score === QUIZ_QUESTIONS.length ? "#4ade80" : "#f59e0b",
              marginBottom: 8,
            }}
          >
            {score === QUIZ_QUESTIONS.length ? "Perfect Score!" : `${score} / ${QUIZ_QUESTIONS.length} Correct`}
          </p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 24 }}>
            {score === QUIZ_QUESTIONS.length ? "You earned your Spica reward!" : "Try reading again to improve your score."}
          </p>
          {QUIZ_QUESTIONS.map((question) => (
            <div key={question.id} style={{ marginBottom: 20, textAlign: "left" }}>
              <p style={{ color: "#fff", fontSize: 13, fontWeight: 600, marginBottom: 10 }}>
                {question.id}. {question.question}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {question.options.map((option, index) => {
                  const isCorrect = index === question.correct;
                  const isChosen = answers[question.id] === index;
                  let background = "rgba(255,255,255,0.05)";
                  let border = "1px solid rgba(255,255,255,0.1)";

                  if (isCorrect) {
                    background = "rgba(74,222,128,0.15)";
                    border = "1px solid #4ade80";
                  } else if (isChosen) {
                    background = "rgba(239,68,68,0.15)";
                    border = "1px solid #ef4444";
                  }

                  return (
                    <div
                      key={index}
                      style={{
                        padding: "10px 14px",
                        borderRadius: 8,
                        background,
                        border,
                        color: "rgba(255,255,255,0.8)",
                        fontSize: 13,
                      }}
                    >
                      {option}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          <button
            onClick={onClose}
            style={{
              background: "linear-gradient(135deg,#06b6d4,#7c3aed)",
              border: "none",
              borderRadius: 999,
              padding: "10px 32px",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              marginTop: 8,
            }}
          >
            Close Quiz
          </button>
        </div>
      ) : (
        <>
          {QUIZ_QUESTIONS.map((question) => (
            <div key={question.id} style={{ marginBottom: 24 }}>
              <p style={{ color: "#fff", fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
                {question.id}. {question.question}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {question.options.map((option, index) => {
                  const chosen = answers[question.id] === index;
                  return (
                    <button
                      key={index}
                      onClick={() => select(question.id, index)}
                      style={{
                        padding: "12px 16px",
                        borderRadius: 10,
                        textAlign: "left",
                        background: chosen ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.05)",
                        border: chosen ? "1.5px solid #7c3aed" : "1.5px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.8)",
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>
              Answer both questions to claim your reward
            </p>
            <button
              onClick={() => allAnswered && setSubmitted(true)}
              style={{
                background: allAnswered ? "linear-gradient(135deg,#06b6d4,#7c3aed)" : "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: 999,
                padding: "11px 28px",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                cursor: allAnswered ? "pointer" : "default",
                opacity: allAnswered ? 1 : 0.5,
              }}
            >
              Submit Answers
            </button>
          </div>
        </>
      )}
    </div>
  );
}
