import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout"; // 👈 static import

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
        path: "manga/read/:id",
        async lazy() {
          const module = await import("./components/manga/MangaReader");
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
        path: "onboarding/role",
        async lazy() {
          const module = await import("./pages/OnboardingRole");
          return { Component: module.default };
        },
      },
      {
        path: "onboarding/profile",
        async lazy() {
          const module = await import("./pages/OnboardingProfile");
          return { Component: module.default };
        },
      },
      {
        path: "wallet",
        async lazy() {
          const module = await import("./pages/WalletPage");
          return { Component: module.default };
        },
      },
      {
        path: "notifications",
        async lazy() {
          const module = await import("./pages/NotificationsPage");
          return { Component: module.default };
        },
      },
      {
        path: "profile",
        async lazy() {
          const module = await import("./pages/ProfilePage");
          return { Component: module.default };
        },
      },
      {
        path: "admin",
        async lazy() {
          const module = await import("./pages/AdminDashboard");
          return { Component: module.default };
        },
      },
      {
        path: "gists/:id",
        async lazy() {
          const module = await import("./pages/GistDetailPage");
          return { Component: module.default };
        },
      },
      {
        path: "gists/topics/:topicId",
        async lazy() {
          const module = await import("./pages/GistTopicPage");
          return { Component: module.default };
        },
      },
      {
        path: "boosts/create",
        async lazy() {
          const module = await import("./pages/BoostCreatePage");
          return { Component: module.default };
        },
      },
      {
        path: "*",
        element: <div>Page Not Found</div>,
      },
    ],
  },
]);

export default router;