import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { createConfig, http } from "wagmi";
import { mainnet, polygon, bsc } from "wagmi/chains";

// 👇 define chains separately
export const chains = [mainnet, polygon, bsc];

const { connectors } = getDefaultWallets({
  appName: "Ezzstar",
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  chains,
});

export const wagmiConfig = createConfig({
  chains,
  connectors,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [bsc.id]: http(),
  },
});