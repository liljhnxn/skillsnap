"use client";

import React, { useState, useEffect } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import {
  SKILLSNAP_ABI,
  SKILLSNAP_CONTRACT_ADDRESS,
  CATEGORIES,
  ListingData,
  SkillCategory,
} from "@/config/contracts";
import { botchainTestnet } from "@/config/botchain";
import {
  X,
  Sparkles,
  AlertCircle,
  ExternalLink,
  CheckCircle2,
  Loader2,
  Trash2,
} from "lucide-react";

interface ListingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingListing?: ListingData | null;
  onSuccess: () => void;
}

export function ListingFormModal({
  isOpen,
  onClose,
  existingListing,
  onSuccess,
}: ListingFormModalProps) {
  const { isConnected, chainId } = useAccount();
  const isWrongNetwork = isConnected && chainId !== botchainTestnet.id;

  const isEditing = Boolean(existingListing && existingListing.isActive);

  // Form State
  const [nickname, setNickname] = useState("");
  const [skillName, setSkillName] = useState("");
  const [category, setCategory] = useState<SkillCategory>("Development");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  // Populate when editing
  useEffect(() => {
    if (existingListing && existingListing.isActive) {
      setNickname(existingListing.nickname);
      setSkillName(existingListing.skillName);
      setCategory(
        CATEGORIES.includes(existingListing.category as SkillCategory)
          ? (existingListing.category as SkillCategory)
          : "Other"
      );
      setDescription(existingListing.description);
    } else {
      setNickname("");
      setSkillName("");
      setCategory("Development");
      setDescription("");
    }
    setFormError(null);
  }, [existingListing, isOpen]);

  // Contract write hook
  const {
    data: txHash,
    writeContract,
    isPending: isWritePending,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract();

  // Wait for receipt
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Notify parent on success
  useEffect(() => {
    if (isConfirmed) {
      const timer = setTimeout(() => {
        onSuccess();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isConfirmed, onSuccess]);

  if (!isOpen) return null;

  const validate = () => {
    if (!nickname.trim()) return "Nickname is required.";
    if (nickname.trim().length > 32) return "Nickname must be 32 characters or less.";
    if (!skillName.trim()) return "Skill name is required.";
    if (skillName.trim().length > 64) return "Skill name must be 64 characters or less.";
    if (!category) return "Category is required.";
    if (!description.trim()) return "Description is required.";
    if (description.trim().length > 280) return "Description must be 280 characters or less.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!SKILLSNAP_CONTRACT_ADDRESS) {
      setFormError("Contract address is not configured. Please check environment.");
      return;
    }

    if (!isConnected) {
      setFormError("Please connect your wallet first.");
      return;
    }

    if (isWrongNetwork) {
      setFormError("Please switch your wallet to Botchain Testnet.");
      return;
    }

    const validationMsg = validate();
    if (validationMsg) {
      setFormError(validationMsg);
      return;
    }

    try {
      if (isEditing) {
        writeContract({
          address: SKILLSNAP_CONTRACT_ADDRESS,
          abi: SKILLSNAP_ABI,
          functionName: "updateListing",
          args: [nickname.trim(), skillName.trim(), category, description.trim()],
        });
      } else {
        writeContract({
          address: SKILLSNAP_CONTRACT_ADDRESS,
          abi: SKILLSNAP_ABI,
          functionName: "createListing",
          args: [nickname.trim(), skillName.trim(), category, description.trim()],
        });
      }
    } catch (err: any) {
      setFormError(err?.message || "Failed to initiate transaction.");
    }
  };

  const isBusy = isWritePending || isConfirming;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        className="w-full max-w-lg rounded-2xl bg-charcoal-900 border border-charcoal-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-purple-deep border border-brand-purple/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-brand-purple-soft" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">
                {isEditing ? "Update Your Skill" : "List Your Skill"}
              </h2>
              <p className="text-xs text-gray-400">
                {isEditing
                  ? "Modify your active on-chain skill listing"
                  : "Publish your skill to the Botchain directory"}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              resetWrite();
              onClose();
            }}
            disabled={isBusy}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-charcoal-800 transition-colors disabled:opacity-40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Confirmed State */}
          {isConfirmed ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-white">
                {isEditing ? "Skill Updated!" : "Skill Listed Successfully!"}
              </h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Your listing has been confirmed on Botchain Testnet.
              </p>
              {txHash && (
                <div className="pt-2">
                  <a
                    href={`https://scan.bohr.life/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-brand-purple-soft hover:underline"
                  >
                    <span>View transaction on BohrScan</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form errors */}
              {(formError || writeError || confirmError) && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="break-words">
                    {formError ||
                      (writeError as any)?.shortMessage ||
                      writeError?.message ||
                      confirmError?.message ||
                      "Transaction failed."}
                  </div>
                </div>
              )}

              {/* Status banner when confirming */}
              {isBusy && (
                <div className="p-3 rounded-xl bg-purple-950/40 border border-brand-purple/40 text-purple-200 text-xs flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin shrink-0 text-brand-purple-soft" />
                  <span>
                    {isWritePending
                      ? "Waiting for wallet signature..."
                      : "Awaiting block confirmation on Botchain..."}
                  </span>
                </div>
              )}

              {/* Nickname Field */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <label className="font-medium text-gray-300">Nickname</label>
                  <span className="text-[11px] text-gray-400">
                    {nickname.length}/32
                  </span>
                </div>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value.slice(0, 32))}
                  placeholder="e.g. SatoshiBuilder"
                  disabled={isBusy}
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-charcoal-800 border border-charcoal-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple/60 disabled:opacity-50 transition-colors"
                />
              </div>

              {/* Skill Name Field */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <label className="font-medium text-gray-300">Skill Name</label>
                  <span className="text-[11px] text-gray-400">
                    {skillName.length}/64
                  </span>
                </div>
                <input
                  type="text"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value.slice(0, 64))}
                  placeholder="e.g. Solidity & Hardhat Smart Contracts"
                  disabled={isBusy}
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-charcoal-800 border border-charcoal-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple/60 disabled:opacity-50 transition-colors"
                />
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as SkillCategory)}
                  disabled={isBusy}
                  className="w-full px-3.5 py-2 rounded-xl bg-charcoal-800 border border-charcoal-700 text-sm text-white focus:outline-none focus:border-brand-purple/60 disabled:opacity-50 transition-colors"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-charcoal-900">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description Field */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <label className="font-medium text-gray-300">
                    Short Description
                  </label>
                  <span className="text-[11px] text-gray-400">
                    {description.length}/280
                  </span>
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value.slice(0, 280))}
                  placeholder="Summarize what you can build or offer. Do not include personal contact details like phone or email."
                  rows={3}
                  disabled={isBusy}
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-charcoal-800 border border-charcoal-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple/60 disabled:opacity-50 transition-colors resize-none"
                />
              </div>

              {/* Privacy Notice */}
              <p className="text-[11px] text-gray-400">
                Skills are published immutably on Botchain Testnet with your
                connected wallet as the owner.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    resetWrite();
                    onClose();
                  }}
                  disabled={isBusy}
                  className="px-4 py-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-gray-300 text-xs font-medium transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isBusy || !nickname.trim() || !skillName.trim() || !description.trim()}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-brand-purple-muted hover:bg-brand-purple text-white text-xs font-semibold shadow-md disabled:opacity-50 transition-colors"
                >
                  {isBusy && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>
                    {isBusy
                      ? isConfirming
                        ? "Confirming..."
                        : "Submitting..."
                      : isEditing
                      ? "Update Skill"
                      : "Publish Skill"}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

