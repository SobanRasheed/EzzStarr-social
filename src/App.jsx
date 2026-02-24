import React from "react";
import { createBrowserRouter } from "react-router-dom";

// lazy-load top level pages/routes
const Layout = React.lazy(() => import("./Layout"));
const Home = React.lazy(() => import("./pages/Home"));
const Memberships = React.lazy(() => import("./pages/Memberships"));
const Manga = React.lazy(() => import("./pages/Manga"));
const Gist = React.lazy(() => import("./pages/Gist"));
const Stories = React.lazy(() => import("./pages/Stories"));
const Events = React.lazy(() => import("./pages/Events"));

// lazy-load event sub-components
const Eventsparticipants = React.lazy(() => import("./components/events/Eventsparticipants"));
const Eventsoverview = React.lazy(() => import("./components/events/Eventsoverview"));
const EventsPrizes = React.lazy(() => import("./components/events/Eventsprizes"));
const EventsLayout = React.lazy(() => import("./components/events/EventsLayout"));

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
        path: "Gist",
        element: <Gist />,
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
