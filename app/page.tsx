"use client";

import React, { useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import {
  SKILLSNAP_ABI,
  SKILLSNAP_CONTRACT_ADDRESS,
  ListingData,
} from "@/config/contracts";
import { Header } from "@/components/Header";
import { NetworkBanner } from "@/components/NetworkBanner";
import { Hero } from "@/components/Hero";
import { MyListingSection } from "@/components/MyListingSection";
import { SkillDirectory } from "@/components/SkillDirectory";
import { ListingFormModal } from "@/components/ListingFormModal";
import { RemoveListingModal } from "@/components/RemoveListingModal";
import { Footer } from "@/components/Footer";

export default function Home() {
  const { address, isConnected } = useAccount();

  // Modals state
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  // Fetch all active listings from the smart contract
  const {
    data: activeListingsRaw,
    isLoading: isLoadingAll,
    refetch: refetchAll,
  } = useReadContract({
    address: SKILLSNAP_CONTRACT_ADDRESS,
    abi: SKILLSNAP_ABI,
    functionName: "getAllActiveListings",
    query: {
      enabled: Boolean(SKILLSNAP_CONTRACT_ADDRESS),
    },
  });

  // Fetch current user's listing
  const {
    data: myListingRaw,
    isLoading: isLoadingMine,
    refetch: refetchMine,
  } = useReadContract({
    address: SKILLSNAP_CONTRACT_ADDRESS,
    abi: SKILLSNAP_ABI,
    functionName: "getListing",
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(SKILLSNAP_CONTRACT_ADDRESS && address),
    },
  });

  // Map listing tuples
  const activeListings: ListingData[] = React.useMemo(() => {
    if (!activeListingsRaw || !Array.isArray(activeListingsRaw)) return [];
    return (activeListingsRaw as any[]).map((item) => ({
      owner: item.owner,
      nickname: item.nickname,
      skillName: item.skillName,
      category: item.category,
      description: item.description,
      timestamp: BigInt(item.timestamp || 0),
      isActive: Boolean(item.isActive),
    }));
  }, [activeListingsRaw]);

  const myListing: ListingData | null = React.useMemo(() => {
    if (!myListingRaw) return null;
    const raw = myListingRaw as any;
    if (!raw.isActive) return null;
    return {
      owner: raw.owner,
      nickname: raw.nickname,
      skillName: raw.skillName,
      category: raw.category,
      description: raw.description,
      timestamp: BigInt(raw.timestamp || 0),
      isActive: Boolean(raw.isActive),
    };
  }, [myListingRaw]);

  const handleRefresh = () => {
    if (SKILLSNAP_CONTRACT_ADDRESS) {
      refetchAll();
      if (address) refetchMine();
    }
  };

  const handleTransactionSuccess = () => {
    handleRefresh();
    setFormModalOpen(false);
    setRemoveModalOpen(false);
  };

  const handleScrollToDirectory = () => {
    const el = document.getElementById("directory-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-charcoal-950">
      {/* Network & Configuration Warnings */}
      <NetworkBanner />

      {/* Main Header */}
      <Header />

      {/* Hero Section */}
      <Hero
        hasListing={Boolean(myListing && myListing.isActive)}
        onOpenListingModal={() => setFormModalOpen(true)}
        onScrollToDirectory={handleScrollToDirectory}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10">
        {/* User's own listing management */}
        <MyListingSection
          listing={myListing}
          isConnected={isConnected}
          onOpenCreate={() => setFormModalOpen(true)}
          onOpenEdit={() => setFormModalOpen(true)}
          onOpenRemove={() => setRemoveModalOpen(true)}
        />

        {/* Directory Header Title */}
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-white">
            Skill Directory
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Browse verified wallet listings or search for specialized Web3 talent.
          </p>
        </div>

        {/* Directory Grid */}
        <SkillDirectory
          listings={activeListings}
          isLoading={isLoadingAll}
          currentUserAddress={address}
          onRefresh={handleRefresh}
          onEditListing={() => setFormModalOpen(true)}
          onOpenCreateModal={() => setFormModalOpen(true)}
        />
      </main>

      {/* Modals */}
      <ListingFormModal
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        existingListing={myListing}
        onSuccess={handleTransactionSuccess}
      />

      <RemoveListingModal
        isOpen={removeModalOpen}
        onClose={() => setRemoveModalOpen(false)}
        onSuccess={handleTransactionSuccess}
      />

      {/* Footer with Disclaimer */}
      <Footer />
    </div>
  );
}

