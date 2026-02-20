import { Outlet } from "react-router-dom";
import EventsSubHero from "./EventsSubHero";
import EventsTabs from "./EventsTabs";
import EventsFaq from "./EventsFaq";

export default function EventsLayout() {
  return (
    <>
      <EventsSubHero />
      <EventsTabs />
      <Outlet />
      <EventsFaq />
    </>
  )
}
