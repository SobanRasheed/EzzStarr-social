import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Memberships from "./pages/Memberships";
import Manga from "./pages/Manga";
import Threads from "./pages/Threads";
import Stories from "./pages/Stories";
import Events from "./pages/Events";
import Eventsparticipants from "./components/events/Eventsparticipants";
import Eventsoverview from "./components/events/Eventsoverview";
import EventsPrizes from "./components/events/Eventsprizes";
import EventsLayout from "./components/events/EventsLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "Membership",
        element: <Memberships />,
      },
      {
        path: "Manga",
        element: <Manga />,
      },
      {
        path: "Threads",
        element: <Threads />,
      },
      {
        path: "Stories",
        element: <Stories />,
      },
      {
        path: "Events",
        children: [
          {
            index: true,
            element: <Events />, // /Events
          },
          {
            path: ":id", // 👈 group dynamic event
            element: <EventsLayout />, // layout for one event
            children: [
              { path: "overview", element: <Eventsoverview /> },
              { path: "prizes", element: <EventsPrizes /> },
              { path: "participants", element: <Eventsparticipants /> },
            ],
          },
        ],
      }
    ],
  },
]);

export default router;
