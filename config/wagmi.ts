import { http, createConfig, injected } from "wagmi";
import { botchainMainnet } from "./botchain";

export const wagmiConfig = createConfig({
  chains: [botchainMainnet],
  connectors: [
    injected({
      target: "metaMask",
    }),
    injected(),
  ],
  transports: {
    [botchainMainnet.id]: http(
      process.env.NEXT_PUBLIC_BOTCHAIN_RPC_URL || "https://rpc.botchain.ai"
    ),
  },
  ssr: true,
});
