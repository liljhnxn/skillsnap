"use client";

import React, { useState, useMemo } from "react";
import { ListingData, CATEGORIES, SkillCategory } from "@/config/contracts";
import { SkillCard } from "./SkillCard";
import {
  Search,
  Filter,
  RefreshCw,
  FolderOpen,
  PlusCircle,
  Sparkles,
} from "lucide-react";

interface SkillDirectoryProps {
  listings: ListingData[];
  isLoading: boolean;
  currentUserAddress?: string;
  onRefresh: () => void;
  onEditListing: () => void;
  onOpenCreateModal: () => void;
}

export function SkillDirectory({
  listings,
  isLoading,
  currentUserAddress,
  onRefresh,
  onEditListing,
  onOpenCreateModal,
}: SkillDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Filter listings client-side
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      if (!item.isActive) return false;

      // Category filter
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }

      // Search query (skill name, nickname, or description)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesSkill = item.skillName.toLowerCase().includes(query);
        const matchesNick = item.nickname.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesSkill && !matchesNick && !matchesDesc) {
          return false;
        }
      }

      return true;
    });
  }, [listings, selectedCategory, searchQuery]);

  return (
    <section id="directory-section" className="space-y-6">
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by skill name, nickname, or keywords..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple/60 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Refresh button & total count */}
        <div className="flex items-center justify-between md:justify-end gap-3">
          <span className="text-xs text-gray-400">
            Showing <strong className="text-white">{filteredListings.length}</strong>{" "}
            {filteredListings.length === 1 ? "skill" : "skills"}
          </span>
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-charcoal-850 border border-charcoal-700 hover:bg-charcoal-800 text-gray-300 hover:text-white text-xs font-medium transition-colors disabled:opacity-50"
            title="Refresh on-chain data"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
            selectedCategory === "All"
              ? "bg-brand-purple-muted text-white shadow-sm"
              : "bg-charcoal-850 border border-charcoal-700 text-gray-400 hover:text-gray-200 hover:bg-charcoal-800"
          }`}
        >
          All Categories
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? "bg-brand-purple-muted text-white shadow-sm"
                : "bg-charcoal-850 border border-charcoal-700 text-gray-400 hover:text-gray-200 hover:bg-charcoal-800"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Listings Grid or Empty State */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-44 rounded-2xl bg-charcoal-850/60 border border-charcoal-800 animate-pulse p-5 space-y-3"
            >
              <div className="w-20 h-4 bg-charcoal-700 rounded" />
              <div className="w-3/4 h-5 bg-charcoal-700 rounded" />
              <div className="w-full h-10 bg-charcoal-750 rounded" />
            </div>
          ))}
        </div>
      ) : filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredListings.map((item) => {
            const isOwner =
              Boolean(currentUserAddress) &&
              item.owner.toLowerCase() === currentUserAddress?.toLowerCase();

            return (
              <SkillCard
                key={item.owner}
                listing={item}
                isOwner={isOwner}
                onEdit={isOwner ? onEditListing : undefined}
              />
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 px-4 text-center rounded-2xl bg-charcoal-850/40 border border-charcoal-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-charcoal-800 border border-charcoal-700 text-gray-400 flex items-center justify-center mx-auto">
            <FolderOpen className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-white">
            {searchQuery || selectedCategory !== "All"
              ? "No matching skills found"
              : "No skills listed yet"}
          </h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            {searchQuery || selectedCategory !== "All"
              ? "Try adjusting your search keywords or clear your category filter."
              : "Be the first to list your skill on Botchain Testnet."}
          </p>
          <div className="pt-2">
            {searchQuery || selectedCategory !== "All" ? (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-4 py-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-xs font-medium text-gray-200 transition-colors"
              >
                Clear Filters
              </button>
            ) : (
              <button
                onClick={onOpenCreateModal}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-purple-muted hover:bg-brand-purple text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>List the First Skill</span>
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

