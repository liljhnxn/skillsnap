import { defineChain } from "viem";

export const botchainMainnet = defineChain({
  id: 677,
  name: "Botchain",
  nativeCurrency: {
    name: "BOT",
    symbol: "BOT",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        process.env.NEXT_PUBLIC_BOTCHAIN_RPC_URL || "https://rpc.botchain.ai",
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "BotchainScan",
      url: "https://scan.botchain.ai",
    },
  },
});

export const botchain = botchainMainnet;
