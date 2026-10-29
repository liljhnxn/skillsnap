"use client";

import React from "react";
import { PlusCircle, Compass, Sparkles } from "lucide-react";

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
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-800/80 border border-charcoal-700/80 text-xs text-gray-300 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-brand-purple-soft" />
          <span>Web3 Directory on Botchain Testnet</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Your Skills Deserve to Be Seen.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Discover people. Explore skills. Find your next collaborator.
          Show what you can build in the decentralized ecosystem.
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
      </div>
    </section>
  );
}

