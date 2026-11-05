"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ExternalLink, ShieldAlert, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-charcoal-800 bg-charcoal-900/90 py-10 text-xs text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-charcoal-800">
          {/* Left: SkillSnap Brand with BOT Chain Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-brand-purple-deep border border-brand-purple/30 flex items-center justify-center shadow-inner">
              <Sparkles className="w-4 h-4 text-brand-purple-soft" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white tracking-tight text-sm">
                  SkillSnap
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-charcoal-800 text-gray-200 border border-charcoal-700">
                  <div className="w-3.5 h-3.5 rounded-sm overflow-hidden relative shrink-0">
                    <Image
                      src="/botchain-logo.png"
                      alt="BOT Chain Logo"
                      width={14}
                      height={14}
                      className="object-contain"
                    />
                  </div>
                  <span>BOT Chain Ecosystem</span>
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">Show your skill. Make your mark.</p>
            </div>
          </div>

          {/* Right: BOT Chain Official Website & Explorer with Logos */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
            <a
              href="https://botchain.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-700/80 text-gray-200 hover:text-white transition-all shadow-sm group"
            >
              <div className="w-4 h-4 rounded-sm overflow-hidden relative shrink-0">
                <Image
                  src="/botchain-logo.png"
                  alt="BOT Chain Logo"
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </div>
              <span className="font-medium">BOT Chain website</span>
              <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-emerald-400 transition-colors" />
            </a>

            <a
              href="https://scan.botchain.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-700/80 text-gray-200 hover:text-white transition-all shadow-sm group"
            >
              <div className="w-4 h-4 rounded-sm overflow-hidden relative shrink-0">
                <Image
                  src="/botchain-logo.png"
                  alt="BOT Chain Logo"
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </div>
              <span className="font-medium">BOT Chain explorer</span>
              <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-emerald-400 transition-colors" />
            </a>

            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-gray-300 px-3 py-2 rounded-xl bg-charcoal-850 border border-charcoal-700">
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
