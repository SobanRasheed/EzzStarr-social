import React, { Suspense } from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./App";
import Loader from "./Loader";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-black text-white"><Loader /></div>}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
