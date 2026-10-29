"use client";

import React from "react";
import { Sparkles, ExternalLink, ShieldAlert } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-charcoal-800 bg-charcoal-900/60 py-8 text-xs text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-charcoal-800">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-brand-purple-deep border border-brand-purple/30 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-brand-purple-soft" />
            </div>
            <span className="font-semibold text-white tracking-tight">
              SkillSnap
            </span>
            <span className="text-gray-400">— Show your skill. Make your mark.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a
              href="https://scan.bohr.life"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Botchain Explorer (BohrScan)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-charcoal-700">|</span>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Chain ID: 968
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

