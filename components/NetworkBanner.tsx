"use client";

import React from "react";
import { useAccount, useSwitchChain } from "wagmi";
import { botchainTestnet } from "@/config/botchain";
import { SKILLSNAP_CONTRACT_ADDRESS } from "@/config/contracts";
import { AlertCircle, AlertTriangle, ArrowRight, Network } from "lucide-react";

export function NetworkBanner() {
  const { isConnected, chainId } = useAccount();
  const { switchChain, isPending: isSwitching } = useSwitchChain();

  const isWrongNetwork = isConnected && chainId !== botchainTestnet.id;
  const isContractMissing = !SKILLSNAP_CONTRACT_ADDRESS;

  if (!isContractMissing && !isWrongNetwork) {
    return null;
  }

  return (
    <div className="w-full border-b border-charcoal-700">
      {isContractMissing && (
        <div className="bg-amber-950/40 border-b border-amber-800/40 px-4 py-2.5 text-xs sm:text-sm text-amber-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Contract Not Configured:</strong> Set{" "}
              <code className="bg-charcoal-900 px-1.5 py-0.5 rounded text-amber-300">
                NEXT_PUBLIC_SKILLSNAP_CONTRACT_ADDRESS
              </code>{" "}
              in your environment to enable blockchain actions.
            </span>
          </div>
          <span className="text-amber-400/80 text-xs hidden md:inline">
            Follow README instructions to deploy
          </span>
        </div>
      )}

      {isWrongNetwork && (
        <div className="bg-purple-950/40 border-b border-purple-800/40 px-4 py-2.5 text-xs sm:text-sm text-purple-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-purple-400 shrink-0" />
            <span>
              You are connected to an unsupported network. Please switch to{" "}
              <strong>Botchain Testnet</strong> (Chain ID: 968).
            </span>
          </div>
          <button
            onClick={() => switchChain({ chainId: botchainTestnet.id })}
            disabled={isSwitching}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white rounded text-xs font-medium transition-colors shrink-0 shadow-sm"
          >
            <Network className="w-3.5 h-3.5" />
            {isSwitching ? "Switching..." : "Switch Network"}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

