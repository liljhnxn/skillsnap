"use client";

import React, { useState } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { botchainTestnet } from "@/config/botchain";
import { shortenAddress } from "@/lib/utils";
import {
  Wallet,
  LogOut,
  Copy,
  Check,
  ChevronDown,
  Layers,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export function Header() {
  const { address, isConnected, chainId } = useAccount();
  const { connectors, connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isWrongNetwork = isConnected && chainId !== botchainTestnet.id;

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleConnect = () => {
    // Find MetaMask connector or fallback to first available
    const mmConnector =
      connectors.find((c) => c.id === "metaMaskSDK" || c.id === "metaMask") ||
      connectors.find((c) => c.id === "injected") ||
      connectors[0];

    if (mmConnector) {
      connect({ connector: mmConnector, chainId: botchainTestnet.id });
    }
  };

  return (
    <header className="border-b border-charcoal-800 bg-charcoal-900/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-purple-deep border border-brand-purple/30 flex items-center justify-center shadow-inner">
            <Sparkles className="w-5 h-5 text-brand-purple-soft" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg tracking-tight text-white">
                SkillSnap
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-charcoal-800 text-gray-400 border border-charcoal-700">
                Directory
              </span>
            </div>
            <p className="text-[11px] text-gray-400 hidden sm:block">
              Show your skill. Make your mark.
            </p>
          </div>
        </div>

        {/* Network & Wallet Controls */}
        <div className="flex items-center gap-3">
          {/* Botchain Network Indicator */}
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-charcoal-850 border border-charcoal-700 text-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                !isConnected
                  ? "bg-gray-500"
                  : isWrongNetwork
                  ? "bg-amber-400 animate-pulse"
                  : "bg-emerald-400"
              }`}
            />
            <span className="text-gray-300 font-mono text-[11px]">
              {isWrongNetwork ? "Wrong Network" : "Botchain Testnet"}
            </span>
          </div>

          {/* Connect / Wallet State */}
          {!isConnected ? (
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-purple-muted hover:bg-brand-purple transition-all duration-200 text-white font-medium text-sm shadow-sm disabled:opacity-50"
            >
              <Wallet className="w-4 h-4" />
              <span>{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
            </button>
          ) : isWrongNetwork ? (
            <button
              onClick={() => switchChain({ chainId: botchainTestnet.id })}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600/90 hover:bg-amber-500 text-white font-medium text-xs transition-colors"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Switch to Botchain</span>
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-charcoal-850 border border-charcoal-700 hover:border-charcoal-600 transition-colors text-sm"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-mono text-xs text-gray-200">
                  {shortenAddress(address)}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-charcoal-850 border border-charcoal-700 shadow-xl p-2 z-20 text-xs">
                    <div className="px-3 py-2 border-b border-charcoal-700 text-gray-400">
                      <div className="text-[10px] uppercase font-mono tracking-wider text-gray-400">
                        Connected Wallet
                      </div>
                      <div className="font-mono text-gray-200 truncate mt-0.5">
                        {address}
                      </div>
                    </div>

                    <button
                      onClick={handleCopy}
                      className="w-full mt-1 flex items-center justify-between px-3 py-2 rounded-lg hover:bg-charcoal-800 text-gray-300 hover:text-white transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        {copied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-gray-400" />
                        )}
                        <span>{copied ? "Copied!" : "Copy Address"}</span>
                      </span>
                    </button>

                    <a
                      href={`https://scan.bohr.life/address/${address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-charcoal-800 text-gray-300 hover:text-white transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                        <span>View on Explorer</span>
                      </span>
                    </a>

                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        disconnect();
                      }}
                      className="w-full mt-1 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-rose-950/40 text-rose-300 transition-colors border-t border-charcoal-750"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-400" />
                      <span>Disconnect</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

