import React, { Suspense } from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./App";
import Loader from "./Loader";
import { Provider } from "react-redux";
import { store } from "./store/index";
import '@rainbow-me/rainbowkit/styles.css';
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@rainbow-me/rainbowkit/styles.css";
import { wagmiConfig } from "./config/wagmi";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider >
            <Suspense
              fallback={
                <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
                  <Loader />
                </div>
              }
            >
              <RouterProvider router={router} />
            </Suspense>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </Provider>
  </React.StrictMode>
);