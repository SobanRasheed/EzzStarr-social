import React from 'react'
import MangaList from "../components/manga/MangaList";
import DailyUpdates from "../components/manga/DailyUpdates";


export default function Manga() {
  return (
    <div className="px-6 pt-10">
      <MangaList />
      <DailyUpdates/>
    </div>
  );
}

