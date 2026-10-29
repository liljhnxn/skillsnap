"use client";

import React, { useState } from "react";
import { ListingData } from "@/config/contracts";
import { shortenAddress, formatTimestamp } from "@/lib/utils";
import {
  Copy,
  Check,
  ExternalLink,
  User,
  Calendar,
  Edit3,
  BadgeCheck,
} from "lucide-react";

interface SkillCardProps {
  listing: ListingData;
  isOwner?: boolean;
  onEdit?: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Development: "bg-purple-950/60 text-purple-300 border-purple-800/50",
  Design: "bg-indigo-950/60 text-indigo-300 border-indigo-800/50",
  Writing: "bg-emerald-950/60 text-emerald-300 border-emerald-800/50",
  "Video Editing": "bg-amber-950/60 text-amber-300 border-amber-800/50",
  Marketing: "bg-rose-950/60 text-rose-300 border-rose-800/50",
  Business: "bg-teal-950/60 text-teal-300 border-teal-800/50",
  Other: "bg-gray-800/80 text-gray-300 border-gray-700/60",
};

export function SkillCard({ listing, isOwner, onEdit }: SkillCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(listing.owner);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const badgeClass =
    CATEGORY_COLORS[listing.category] ||
    "bg-gray-800 text-gray-300 border-gray-700";

  return (
    <div
      className={`group relative rounded-2xl bg-charcoal-850 border p-5 transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-md ${
        isOwner
          ? "border-brand-purple/40 ring-1 ring-brand-purple/20"
          : "border-charcoal-700 hover:border-charcoal-600"
      }`}
    >
      <div>
        {/* Top bar: Category badge & Owner indicator / actions */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${badgeClass}`}
          >
            {listing.category}
          </span>

          <div className="flex items-center gap-1.5">
            {isOwner && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded bg-brand-purple-deep/70 text-brand-purple-soft border border-brand-purple/30">
                <BadgeCheck className="w-3 h-3" />
                Your Listing
              </span>
            )}
            {isOwner && onEdit && (
              <button
                onClick={onEdit}
                aria-label="Edit listing"
                className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-charcoal-700 transition-colors"
                title="Edit your listing"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Skill Title & Nickname */}
        <div className="mb-3">
          <h3 className="text-base font-semibold text-white tracking-tight leading-snug line-clamp-1 group-hover:text-purple-200 transition-colors">
            {listing.skillName}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
            <User className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-medium text-gray-300">{listing.nickname}</span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed mb-4">
          {listing.description}
        </p>
      </div>

      {/* Footer info: Wallet copy & timestamp */}
      <div className="pt-3 border-t border-charcoal-800 flex items-center justify-between text-xs text-gray-400">
        {/* Shortened address + copy button */}
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[11px] text-gray-300 bg-charcoal-800 px-2 py-0.5 rounded border border-charcoal-700">
            {shortenAddress(listing.owner)}
          </span>
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-charcoal-750 text-gray-400 hover:text-white transition-colors"
            title="Copy wallet address to contact"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
          <a
            href={`https://scan.bohr.life/address/${listing.owner}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded hover:bg-charcoal-750 text-gray-400 hover:text-white transition-colors"
            title="View on BohrScan Explorer"
          >
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Date */}
        <div className="flex items-center gap-1 text-[11px] text-gray-400">
          <Calendar className="w-3 h-3 text-gray-400" />
          <span>{formatTimestamp(listing.timestamp)}</span>
        </div>
      </div>
    </div>
  );
}

