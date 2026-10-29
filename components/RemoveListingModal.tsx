"use client";

import React, { useEffect, useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { SKILLSNAP_ABI, SKILLSNAP_CONTRACT_ADDRESS } from "@/config/contracts";
import { botchainTestnet } from "@/config/botchain";
import {
  AlertTriangle,
  Loader2,
  Trash2,
  X,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

interface RemoveListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function RemoveListingModal({
  isOpen,
  onClose,
  onSuccess,
}: RemoveListingModalProps) {
  const { isConnected, chainId } = useAccount();
  const isWrongNetwork = isConnected && chainId !== botchainTestnet.id;
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    data: txHash,
    writeContract,
    isPending: isWritePending,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    if (isConfirmed) {
      const timer = setTimeout(() => {
        onSuccess();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isConfirmed, onSuccess]);

  if (!isOpen) return null;

  const handleRemove = async () => {
    setErrorMsg(null);
    if (!SKILLSNAP_CONTRACT_ADDRESS) {
      setErrorMsg("Contract address is not configured.");
      return;
    }
    if (!isConnected || isWrongNetwork) {
      setErrorMsg("Wallet not connected to Botchain Testnet.");
      return;
    }

    try {
      writeContract({
        address: SKILLSNAP_CONTRACT_ADDRESS,
        abi: SKILLSNAP_ABI,
        functionName: "removeListing",
        args: [],
      });
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to initiate remove transaction.");
    }
  };

  const isBusy = isWritePending || isConfirming;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        className="w-full max-w-md rounded-2xl bg-charcoal-900 border border-charcoal-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-charcoal-800">
          <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
            <Trash2 className="w-4 h-4" />
            <span>Remove Skill Listing</span>
          </div>
          <button
            onClick={() => {
              resetWrite();
              onClose();
            }}
            disabled={isBusy}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-charcoal-800 transition-colors disabled:opacity-40"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {isConfirmed ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-white">
                Listing Removed
              </h3>
              <p className="text-xs text-gray-400">
                Your skill listing is no longer active in the directory.
              </p>
              {txHash && (
                <div className="pt-2">
                  <a
                    href={`https://scan.bohr.life/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-brand-purple-soft hover:underline"
                  >
                    <span>View on BohrScan</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {(errorMsg || writeError || confirmError) && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="break-words">
                    {errorMsg ||
                      (writeError as any)?.shortMessage ||
                      writeError?.message ||
                      confirmError?.message ||
                      "Failed to remove listing."}
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-300 leading-relaxed">
                Are you sure you want to remove your skill listing? This will
                deactivate your entry on-chain. You can always publish a new skill
                at any time.
              </p>

              <div className="flex items-center justify-end gap-3 pt-3">
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
                  type="button"
                  onClick={handleRemove}
                  disabled={isBusy}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors disabled:opacity-50"
                >
                  {isBusy && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{isBusy ? "Removing..." : "Confirm Removal"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

