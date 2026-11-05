"use client";

import React from "react";
import { PlusCircle, Compass, Sparkles, ExternalLink, Globe } from "lucide-react";
import Image from "next/image";
import { SKILLSNAP_CONTRACT_ADDRESS } from "@/config/contracts";
import { shortenAddress } from "@/lib/utils";

interface HeroProps {
  onOpenListingModal: () => void;
  hasListing: boolean;
  onScrollToDirectory: () => void;
}

export function Hero({
  onOpenListingModal,
  hasListing,
  onScrollToDirectory,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20 border-b border-charcoal-800 bg-gradient-to-b from-charcoal-900 to-charcoal-950">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* BOT Chain Ecosystem Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-charcoal-850 border border-charcoal-750 text-xs text-gray-200 shadow-sm">
            <div className="w-4 h-4 rounded-sm overflow-hidden relative shrink-0">
              <Image
                src="/botchain-logo.png"
                alt="BOT Chain Logo"
                width={16}
                height={16}
                className="object-contain"
              />
            </div>
            <span className="font-medium text-emerald-400">BOT Chain</span>
            <span className="text-gray-400">|</span>
            <span>Mainnet</span>
            <span className="font-mono text-[11px] text-gray-400">#677</span>
          </div>

          <a
            href={`https://scan.botchain.ai/address/${SKILLSNAP_CONTRACT_ADDRESS}#code`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-750 text-xs text-purple-300 hover:text-purple-200 transition-colors shadow-sm"
            title="View verified Mainnet contract on BotchainScan"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono">Contract: {shortenAddress(SKILLSNAP_CONTRACT_ADDRESS)}</span>
            <ExternalLink className="w-3 h-3 text-gray-400" />
          </a>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Your Skills Deserve to Be Seen.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Discover people. Explore skills. Find your next collaborator.
          Show what you can build in the decentralized BOT Chain ecosystem.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onOpenListingModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-purple-muted hover:bg-brand-purple text-white font-semibold text-sm transition-all shadow-md hover:shadow-brand-purple/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{hasListing ? "Manage Your Skill" : "List Your Skill"}</span>
          </button>

          <button
            onClick={onScrollToDirectory}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-700 text-gray-300 hover:text-white font-medium text-sm transition-colors"
          >
            <Compass className="w-4 h-4 text-gray-400" />
            <span>Explore Skills</span>
          </button>
        </div>

        {/* Quick Official Links Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 pt-6 border-t border-charcoal-800/60 text-xs">
          <a
            href="https://botchain.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
          >
            <div className="w-3.5 h-3.5 rounded-sm overflow-hidden relative shrink-0">
              <Image
                src="/botchain-logo.png"
                alt="BOT Chain Logo"
                width={14}
                height={14}
                className="object-contain"
              />
            </div>
            <span>BOT Chain website</span>
            <ExternalLink className="w-3 h-3 text-gray-400" />
          </a>
          <span className="text-charcoal-700">•</span>
          <a
            href="https://scan.botchain.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3 h-3 text-emerald-400" />
            <span>BOT Chain explorer</span>
          </a>
          <span className="text-charcoal-700">•</span>
          <a
            href={`https://scan.botchain.ai/address/${SKILLSNAP_CONTRACT_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors font-mono"
          >
            <span>Verified Contract ({shortenAddress(SKILLSNAP_CONTRACT_ADDRESS)})</span>
          </a>
        </div>
      </div>
    </section>
  );
}
