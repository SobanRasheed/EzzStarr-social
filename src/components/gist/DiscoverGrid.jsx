import React from "react";
import GistCard from "./GistCard";

/**
 * Discover tab grid — Figma node 8475:88895.
 * 4 columns of 361px cards at gap 24px inside the widened 1590px feed column.
 */
export default function DiscoverGrid({ groups = [], onJoin }) {
  if (!groups.length) {
    return (
      <p className="py-10 text-center font-satoshi text-white/60">
        No gist groups to discover yet.
      </p>
    );
  }

  return (
    <div
      className="w-full"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 361px))",
        gap: "24px",
        justifyContent: "flex-start",
      }}
    >
      {groups.map((group) => (
        <GistCard
          key={group.id}
          group={group}
          onJoin={onJoin ? () => onJoin(group.id) : undefined}
        />
      ))}
    </div>
  );
}
