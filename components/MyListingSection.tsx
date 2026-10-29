"use client";

import React from "react";
import { ListingData } from "@/config/contracts";
import { shortenAddress, formatTimestamp } from "@/lib/utils";
import {
  Sparkles,
  Edit3,
  Trash2,
  Calendar,
  User,
  PlusCircle,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

interface MyListingSectionProps {
  listing?: ListingData | null;
  isConnected: boolean;
  onOpenCreate: () => void;
  onOpenEdit: () => void;
  onOpenRemove: () => void;
}

export function MyListingSection({
  listing,
  isConnected,
  onOpenCreate,
  onOpenEdit,
  onOpenRemove,
}: MyListingSectionProps) {
  if (!isConnected) {
    return null;
  }

  const hasActiveListing = Boolean(listing && listing.isActive);

  return (
    <div className="mb-10 p-5 rounded-2xl bg-charcoal-850/80 border border-charcoal-700/80 backdrop-blur-sm">
      <div className="flex items-center justify-between pb-3 border-b border-charcoal-700 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-purple" />
          <h2 className="text-sm font-semibold text-white tracking-tight">
            My Skill Listing
          </h2>
        </div>
        {hasActiveListing && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-800/50">
            <CheckCircle className="w-3 h-3" />
            Active on Botchain
          </span>
        )}
      </div>

      {hasActiveListing && listing ? (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base font-semibold text-white">
                {listing.skillName}
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-purple-950/60 text-purple-300 border border-purple-800/40">
                {listing.category}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1 text-gray-300">
                <User className="w-3.5 h-3.5" />
                {listing.nickname}
              </span>
              <span className="flex items-center gap-1 text-gray-400">
                <Calendar className="w-3.5 h-3.5" />
                Updated {formatTimestamp(listing.timestamp)}
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed max-w-2xl pt-1">
              {listing.description}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
            <button
              onClick={onOpenEdit}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-charcoal-700 hover:bg-charcoal-600 text-gray-200 text-xs font-medium transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-gray-300" />
              <span>Edit</span>
            </button>
            <button
              onClick={onOpenRemove}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/30 hover:bg-rose-950/60 text-rose-300 border border-rose-800/30 text-xs font-medium transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="py-4 text-center space-y-2">
          <p className="text-xs text-gray-400">
            You haven't listed a skill yet. Make your mark on Botchain Testnet!
          </p>
          <button
            onClick={onOpenCreate}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-brand-purple-muted hover:bg-brand-purple text-white text-xs font-medium transition-colors shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create Your Listing</span>
          </button>
        </div>
      )}
    </div>
  );
}

