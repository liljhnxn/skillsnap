# SkillSnap — Whitepaper & Pitch Deck Document

> **Tagline:** Show your skill. Make your mark.  
> **Network:** Botchain Testnet (Chain ID: `968`)  
> **Contract Address:** `0x327d72aCfD9cA960A69F8e332beE82fb7D19A562`  
> **Block Explorer:** [https://scan.bohr.life/address/0x327d72aCfD9cA960A69F8e332beE82fb7D19A562](https://scan.bohr.life/address/0x327d72aCfD9cA960A69F8e332beE82fb7D19A562#code)  
> **GitHub Repository:** [https://github.com/liljhnxn/skillsnap](https://github.com/liljhnxn/skillsnap)

---

## 1. Executive Summary

SkillSnap is a minimalist, decentralized skill directory deployed on the Botchain Testnet. Built without centralized databases or traditional authentication barriers, SkillSnap enables Web3 developers, designers, writers, creators, and marketers to register their professional offerings directly on the blockchain and discover fellow ecosystem builders through peer-to-peer verification.

---

## 2. Problem Statement

1. **Centralized Platform Bottlenecks:** Traditional freelance and skill platforms (Upwork, Fiverr, LinkedIn) collect unnecessary personal data (names, emails, KYC documents, phone numbers) and impose high commission fees.
2. **Lack of Web3-Native Discovery:** Emerging L1 and L2 ecosystems like Botchain lack a unified, permissionless, and lightweight directory where active ecosystem participants can showcase talent.
3. **Identity & Custody Risks:** Centralized profiles can be suspended, modified, or monetized by third parties without creator consent.

---

## 3. The Solution: SkillSnap

SkillSnap solves these problems by providing:
* **Zero Middlemen & No Backend:** The Ethereum Virtual Machine (EVM) on Botchain Testnet serves as the sole source of truth.
* **Wallet-Native Identity:** Interaction is powered strictly via Web3 wallets (MetaMask, Injected). No passwords, accounts, or personal details required.
* **Self-Sovereign Listings:** Only the private key holder of the wallet can create, update, or remove their skill entry.
* **Gas-Conscious Architecture:** Byte-efficient Solidity struct storage and off-chain view reads ensure low transaction costs.

---

## 4. Product Highlights & Architecture

### A. Frontend Layer
* **Framework:** Next.js (App Router) + TypeScript
* **Styling:** Tailwind CSS with a modern dark charcoal theme, muted purple accents, and subtle borders.
* **Client Performance:** Dynamic client-side search across skills, nicknames, and bios, paired with responsive category pill filtering.

### B. Blockchain & Smart Contract Layer
* **Smart Contract:** `SkillSnap.sol` compiled under Solidity `^0.8.20`.
* **State Operations:**
  * `createListing(nickname, skillName, category, description)`
  * `updateListing(nickname, skillName, category, description)`
  * `removeListing()`
  * `getListing(user)`
  * `getAllActiveListings()`
* **Validation & Security:**
  * Enforces strict length limits (Nickname: 32 bytes, Skill: 64 bytes, Category: 32 bytes, Description: 280 bytes).
  * Prevents duplicate active listings per wallet address.
  * Reverts unauthorized modification attempts.
  * Dispatches auditable events (`ListingCreated`, `ListingUpdated`, `ListingRemoved`).

---

## 5. Pitch Deck Slides Outline

### Slide 1: Cover
* **Title:** SkillSnap
* **Subtitle:** Decentralized Skill Directory on Botchain Testnet
* **Tagline:** Show your skill. Make your mark.

### Slide 2: The Opportunity
* Decentralized ecosystems need decentralized talent networks.
* Existing platforms rely on Web2 accounts, tracking, and middlemen.
* Botchain builders need an instant, permissionless directory to discover collaborators.

### Slide 3: The Solution
* Simple, fast, and 100% on-chain.
* Connect MetaMask $\rightarrow$ List your skill $\rightarrow$ Get discovered by wallets.
* Zero personal data collected.

### Slide 4: Key Features
* **One Active Listing Per Wallet:** Prevents spam and keeps listings relevant.
* **Real-time Filter & Search:** Client-side instant query without RPC latency.
* **One-Click Contact:** Copy full wallet address or inspect on BohrScan.
* **Full Self-Management:** Edit or deactivate anytime directly from the dashboard.

### Slide 5: Market Traction & Roadmap
* **Phase 1 (Current):** Contract deployed and verified on Botchain Testnet; single-page dApp live with full listing lifecycle.
* **Phase 2:** Multi-category tags, optional decentralized portfolio links (IPFS / Arweave), and social handle attestations.
* **Phase 3:** On-chain reputation signals (endorsements and Botchain ecosystem badge integrations).

---

## 6. Official Links & Resources

* **Live Demo / Localhost:** Port `3000` via Next.js
* **Smart Contract (Verified):** [`0x327d72aCfD9cA960A69F8e332beE82fb7D19A562`](https://scan.bohr.life/address/0x327d72aCfD9cA960A69F8e332beE82fb7D19A562#code)
* **GitHub Repository:** [https://github.com/liljhnxn/skillsnap](https://github.com/liljhnxn/skillsnap)
* **Botchain Testnet Explorer:** [https://scan.bohr.life](https://scan.bohr.life)

