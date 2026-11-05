"use client";

import React from "react";
import { Sparkles, ExternalLink, ShieldAlert, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-charcoal-800 bg-charcoal-900/80 py-8 text-xs text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-charcoal-800">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-brand-purple-deep border border-brand-purple/30 flex items-center justify-center shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-brand-purple-soft" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white tracking-tight">
                  SkillSnap
                </span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-charcoal-800 text-gray-300 border border-charcoal-700">
                  BOT Chain Ecosystem
                </span>
              </div>
              <p className="text-[11px] text-gray-400">Show your skill. Make your mark.</p>
            </div>
          </div>

          {/* BOT Chain Official Links & Status */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <a
              href="https://botchain.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-700 text-gray-300 hover:text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-brand-purple-soft" />
              <span>BOT Chain website</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </a>

            <a
              href="https://scan.botchain.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-700 text-gray-300 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>BOT Chain explorer</span>
            </a>

            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-gray-300 px-2.5 py-1 rounded-lg bg-charcoal-850 border border-charcoal-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Chain ID: 677
            </span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pt-5 flex items-start gap-2.5 text-gray-400">
          <ShieldAlert className="w-4 h-4 shrink-0 text-gray-400 mt-0.5" />
          <p className="leading-relaxed text-[11px]">
            <strong>Disclaimer:</strong> Listings are user-submitted and skills are
            not independently verified. SkillSnap is a decentralized skill
            directory, not a job marketplace, escrow platform, or employment
            service. Always exercise due diligence before engaging or
            collaborating.
          </p>
        </div>
      </div>
    </footer>
  );
}
