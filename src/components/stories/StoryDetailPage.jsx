import {
  ChevronLeft,
  DollarSign,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Star,
  Volume2,
  Zap,
} from "lucide-react";
import { useState } from "react";
import StoriesQuickQuizCard from "./StoriesQuickQuizCard";
import StoriesQuizSection from "./StoriesQuizSection";
import { STORY_PARTS } from "./storyConstants";

export default function StoryDetailPage({ story, onBack }) {
  const [liked, setLiked] = useState(false);
  const [activePart, setActivePart] = useState(1);
  const [quizOpen, setQuizOpen] = useState(false);
  const storyContent = story.content ?? "";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        color: "#fff",
        fontFamily: "'Georgia', serif",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "280px", overflow: "hidden" }}>
        <div
          style={{
            backgroundImage: `url(${story.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(20px) brightness(0.35)",
            transform: "scale(1.15)",
            position: "absolute",
            inset: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 0%, #0a0a0a 100%)",
          }}
        />
        <button
          onClick={onBack}
          style={{
            position: "absolute",
            top: 20,
            left: 32,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: "rgba(255,255,255,0.5)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          <ChevronLeft style={{ width: 16, height: 16 }} /> Back to Stories
        </button>
      </div>

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 32px 64px",
          marginTop: "-180px",
          position: "relative",
          zIndex: 1,
          display: "flex",
          gap: 0,
          alignItems: "flex-start",
        }}
      >
        <div style={{ width: 300, flexShrink: 0, zIndex: 2 }}>
          <img
            src={story.image}
            alt={story.title}
            style={{ width: "100%", aspectRatio: "3/3.8", objectFit: "cover", borderRadius: 4, display: "block" }}
          />

          <div style={{ paddingTop: 10 }}>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginBottom: 16 }}>
              Artist: <span style={{ color: "rgba(255,255,255,0.55)" }}>{story.artist}</span>
            </p>

            <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "9px 10px",
                  background: "#27272a",
                  border: "none",
                  borderRadius: 4,
                  color: "#fff",
                  fontSize: 11,
                  cursor: "pointer",
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <Volume2 style={{ width: 13, height: 13, color: "#4ade80", flexShrink: 0 }} /> Listen Audio
              </button>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "9px 10px",
                  background: "#7e22ce",
                  border: "none",
                  borderRadius: 4,
                  color: "#fff",
                  fontSize: 11,
                  cursor: "pointer",
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <DollarSign style={{ width: 13, height: 13, flexShrink: 0 }} /> Tip Author
              </button>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "9px 10px",
                  background: "#eab308",
                  border: "none",
                  borderRadius: 4,
                  color: "#000",
                  fontSize: 11,
                  cursor: "pointer",
                  fontWeight: 700,
                  justifyContent: "center",
                }}
              >
                <Zap style={{ width: 13, height: 13, flexShrink: 0 }} /> Boost
              </button>
            </div>

            <p style={{ color: "#22d3ee", fontSize: 13, fontWeight: 500, marginBottom: 20 }}>
              Earn <strong>{story.reward}</strong>
            </p>

            <div style={{ marginBottom: 18 }}>
              <h3 style={{ color: "#fff", fontWeight: 600, fontSize: 13, marginBottom: 7 }}>About Story</h3>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, lineHeight: 1.7 }}>{story.about}</p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ color: "#fff", fontWeight: 600, fontSize: 13, marginBottom: 10 }}>Writer</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#a855f7,#ec4899)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {story.writer?.[0] ?? "W"}
                </div>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{story.writer}</span>
              </div>
            </div>

            <div>
              <h3 style={{ color: "#22d3ee", fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Parts</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {STORY_PARTS.map((part) => (
                  <div
                    key={part.id}
                    onClick={() => setActivePart(part.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: 10,
                      borderRadius: 4,
                      cursor: "pointer",
                      background: activePart === part.id ? "rgba(255,255,255,0.08)" : "transparent",
                    }}
                  >
                    <img
                      src={story.image}
                      alt=""
                      style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 4, flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: "#fff", fontSize: 12, fontWeight: 500 }}>{part.title}</p>
                      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 10 }}>{part.date}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: "rgba(255,255,255,0.4)",
                        fontSize: 10,
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Star style={{ width: 10, height: 10 }} /> {part.stars}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <MessageCircle style={{ width: 10, height: 10 }} /> ({part.comments})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {!quizOpen && <StoriesQuickQuizCard onStart={() => setQuizOpen(true)} />}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(18,18,18,0.95)",
            borderRadius: "0 6px 6px 6px",
            padding: "24px 28px",
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: 18,
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              {(story.genres ?? []).map((genre) => (
                <span
                  key={genre}
                  style={{ padding: "5px 16px", borderRadius: 4, background: "#4ade80", color: "#000", fontSize: 13, fontWeight: 700 }}
                >
                  {genre}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(6,182,212,0.15)",
                  color: "#22d3ee",
                  padding: "4px 12px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                <Eye style={{ width: 13, height: 13 }} /> {story.views}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Star style={{ width: 13, height: 13 }} /> {story.stars}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <MessageCircle style={{ width: 13, height: 13 }} /> ({story.comments})
              </span>
              <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", padding: 0, display: "flex" }}>
                <Share2 style={{ width: 13, height: 13 }} />
              </button>
              <button
                onClick={() => setLiked(!liked)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  color: liked ? "#ef4444" : "rgba(255,255,255,0.5)",
                }}
              >
                <Heart style={{ width: 13, height: 13, fill: liked ? "#ef4444" : "none" }} />
              </button>
            </div>
          </div>

          <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 20, lineHeight: 1.2 }}>
            {story.title}{" "}
            <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 400, fontSize: "1.1rem" }}>
              (Part-1)
            </span>
          </h1>

          {storyContent.split("\n\n").map((paragraph, index) => (
            <p
              key={index}
              style={{ color: "rgba(255,255,255,0.82)", fontSize: 14.5, lineHeight: 1.85, marginBottom: 18 }}
            >
              {paragraph}
            </p>
          ))}

          {quizOpen && <StoriesQuizSection onClose={() => setQuizOpen(false)} />}
        </div>
      </div>
    </div>
  );
}
