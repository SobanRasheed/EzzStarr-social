// wagmi.js
import { createConfig, http } from "wagmi";
import { mainnet, base } from "wagmi/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";

import {
  metaMaskWallet,
  rainbowWallet,
  trustWallet,
  binanceWallet,
  okxWallet,
  coinbaseWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

const projectId = "00a1459bb2b3b534cd9235580a7d0220";
console.log(projectId);
const connectors = connectorsForWallets(
  [
    {
      groupName: "Popular",
      wallets: [rainbowWallet, metaMaskWallet, coinbaseWallet,trustWallet, binanceWallet, okxWallet, walletConnectWallet],
    },
  ],
  { appName: "My Web3 App", projectId }
);

export const wagmiConfig = createConfig({
  chains: [mainnet, base],
  connectors,
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});