import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Memberships from "./pages/Memberships";
import Manga from "./pages/Manga";
import Threads from "./pages/Threads";
import Stories from "./pages/Stories";
import Events from "./pages/Events";

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
        element: <Events />,
      },
    ],
  },
]);

export default router;
