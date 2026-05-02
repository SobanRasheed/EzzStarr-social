import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    async lazy() {
      const module = await import("./Layout");
      return { Component: module.default };
    },
    children: [
      {
        index: true,
        async lazy() {
          const module = await import("./pages/Home");
          return { Component: module.default };
        },
      },
      {
        path: "Membership",
        async lazy() {
          const module = await import("./pages/Memberships");
          return { Component: module.default };
        },
      },
      {
        path: "Manga",
        async lazy() {
          const module = await import("./pages/Manga");
          return { Component: module.default };
        },
      },
      {
        path: "Manga/:id",
        async lazy() {
          const module = await import("./components/manga/MangaDetails");
          return { Component: module.default };
        },
      },
      {
        path: "Gist",
        async lazy() {
          const module = await import("./pages/Gist");
          return { Component: module.default };
        },
      },
      {
        path: "Stories",
        async lazy() {
          const module = await import("./pages/Stories");
          return { Component: module.default };
        },
      },
      {
        path: "Events",
        children: [
          {
            index: true,
            async lazy() {
              const module = await import("./pages/Events");
              return { Component: module.default };
            },
          },
          {
            path: ":id",
            async lazy() {
              const module = await import("./components/events/EventsLayout");
              return { Component: module.default };
            },
            children: [
              {
                path: "overview",
                async lazy() {
                  const module = await import("./components/events/Eventsoverview");
                  return { Component: module.default };
                },
              },
              {
                path: "prizes",
                async lazy() {
                  const module = await import("./components/events/Eventsprizes");
                  return { Component: module.default };
                },
              },
              {
                path: "participants",
                async lazy() {
                  const module = await import("./components/events/Eventsparticipants");
                  return { Component: module.default };
                },
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <div>Page Not Found</div>,
      },
    ],
  },
]);

export default router;