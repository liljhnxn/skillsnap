import { Address } from "viem";

export const SKILLSNAP_CONTRACT_ADDRESS: Address | undefined =
  (process.env.NEXT_PUBLIC_SKILLSNAP_CONTRACT_ADDRESS as Address) || undefined;

export const SKILLSNAP_ABI = [
  {
    type: "function",
    name: "createListing",
    inputs: [
      { name: "nickname", type: "string" },
      { name: "skillName", type: "string" },
      { name: "category", type: "string" },
      { name: "description", type: "string" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateListing",
    inputs: [
      { name: "nickname", type: "string" },
      { name: "skillName", type: "string" },
      { name: "category", type: "string" },
      { name: "description", type: "string" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "removeListing",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getListing",
    inputs: [{ name: "user", type: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "owner", type: "address" },
          { name: "nickname", type: "string" },
          { name: "skillName", type: "string" },
          { name: "category", type: "string" },
          { name: "description", type: "string" },
          { name: "timestamp", type: "uint256" },
          { name: "isActive", type: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAllActiveListings",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        components: [
          { name: "owner", type: "address" },
          { name: "nickname", type: "string" },
          { name: "skillName", type: "string" },
          { name: "category", type: "string" },
          { name: "description", type: "string" },
          { name: "timestamp", type: "uint256" },
          { name: "isActive", type: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getListingCount",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getActiveListingCount",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getListingOwners",
    inputs: [],
    outputs: [{ name: "", type: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "ListingCreated",
    inputs: [
      { indexed: true, name: "owner", type: "address" },
      { indexed: false, name: "nickname", type: "string" },
      { indexed: false, name: "skillName", type: "string" },
      { indexed: false, name: "category", type: "string" },
      { indexed: false, name: "timestamp", type: "uint256" },
    ],
  },
  {
    type: "event",
    name: "ListingUpdated",
    inputs: [
      { indexed: true, name: "owner", type: "address" },
      { indexed: false, name: "nickname", type: "string" },
      { indexed: false, name: "skillName", type: "string" },
      { indexed: false, name: "category", type: "string" },
      { indexed: false, name: "timestamp", type: "uint256" },
    ],
  },
  {
    type: "event",
    name: "ListingRemoved",
    inputs: [
      { indexed: true, name: "owner", type: "address" },
      { indexed: false, name: "timestamp", type: "uint256" },
    ],
  },
  {
    type: "error",
    name: "FieldRequired",
    inputs: [{ name: "fieldName", type: "string" }],
  },
  {
    type: "error",
    name: "StringTooLong",
    inputs: [
      { name: "fieldName", type: "string" },
      { name: "maxLength", type: "uint256" },
    ],
  },
  {
    type: "error",
    name: "ListingAlreadyActive",
    inputs: [],
  },
  {
    type: "error",
    name: "ListingNotFound",
    inputs: [],
  },
  {
    type: "error",
    name: "Unauthorized",
    inputs: [],
  },
] as const;

export interface ListingData {
  owner: Address;
  nickname: string;
  skillName: string;
  category: string;
  description: string;
  timestamp: bigint;
  isActive: boolean;
}

export const CATEGORIES = [
  "Development",
  "Design",
  "Writing",
  "Video Editing",
  "Marketing",
  "Business",
  "Other",
] as const;

export type SkillCategory = (typeof CATEGORIES)[number];

