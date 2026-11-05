# SkillSnap — Decentralized Web3 Skill Directory

> **Tagline:** Show your skill. Make your mark.

SkillSnap is a simple, decentralized skill directory built on **Botchain Mainnet**. It enables developers, designers, creators, and builders to showcase the skills they offer on-chain and discover skills offered by other wallets.

---

## 1. Network Configuration (Botchain Mainnet)

SkillSnap runs on **Botchain Mainnet**. Network parameters:

| Parameter | Value |
|---|---|
| **Network Name** | Botchain |
| **Chain ID** | `677` |
| **RPC URL** | `https://rpc.botchain.ai` |
| **Currency Symbol** | `BOT` |
| **Decimals** | `18` |
| **Block Explorer** | `https://scan.botchain.ai` |
| **Official Website** | `https://botchain.ai` |

---

## 2. Technology Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS (Dark charcoal, muted purple accents, soft gray text)
- **Smart Contracts:** Solidity `^0.8.20`
- **Development & Testing:** Hardhat, ethers.js, chai
- **Web3 Client:** wagmi v2, viem v2
- **Wallet Connection:** MetaMask / Injected EVM wallets

---

## 3. Project Structure

```
├── contracts/
│   └── SkillSnap.sol          # Solidity smart contract
├── test/
│   └── SkillSnap.test.ts      # Automated contract test suite
├── scripts/
│   └── deploy.ts              # Hardhat deployment script for Botchain Mainnet
├── app/
│   ├── globals.css            # Custom charcoal & muted purple styles
│   ├── layout.tsx             # Root layout and fonts
│   ├── page.tsx               # Single-page interface
│   └── providers.tsx          # Wagmi & React Query client providers
├── components/
│   ├── Header.tsx             # Navigation, Mainnet network badge & wallet button
│   ├── Hero.tsx               # Hero section & CTA
│   ├── MyListingSection.tsx   # View, edit & remove active listing
│   ├── SkillDirectory.tsx     # Client-side search & category filtering
│   ├── SkillCard.tsx          # Card with copy wallet & BotchainScan explorer link
│   ├── ListingFormModal.tsx   # Modal for create & update listing
│   ├── RemoveListingModal.tsx # Confirmation modal for removing listing
│   ├── NetworkBanner.tsx      # Wrong network & missing config alerts
│   └── Footer.tsx             # BOT Chain website and explorer ecosystem links
├── config/
│   ├── botchain.ts            # Viem custom chain definition for Botchain Mainnet
│   ├── contracts.ts           # SkillSnap ABI and type definitions
│   └── wagmi.ts               # Wagmi connector configuration
├── hardhat.config.ts          # Hardhat configuration
├── package.json
└── README.md
```

---

## 4. Getting Started

### Prerequisites

- Node.js `v18+` or `v20+`
- npm
- MetaMask browser extension

### Installation

```bash
npm install --legacy-peer-deps
```

### Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env.local
```

Set the following variables in `.env.local`:

```env
# Verified SkillSnap contract on Botchain Mainnet:
NEXT_PUBLIC_SKILLSNAP_CONTRACT_ADDRESS=0x243AE8D5F7AFa98d00623232386F2e2fb2464F86

# Botchain Mainnet RPC URL
NEXT_PUBLIC_BOTCHAIN_RPC_URL=https://rpc.botchain.ai

# Deployer private key (ONLY needed for contract deployment, never commit to git)
DEPLOYER_PRIVATE_KEY=your_private_key_here
```

---

## 5. Smart Contract Compilation & Deployment

To compile the smart contract:

```bash
npm run contract:compile
```

To run the automated test suite:

```bash
npm run contract:test
```

To deploy to Botchain Mainnet:

```bash
npm run contract:deploy
```

Verified Mainnet contract:
`https://scan.botchain.ai/address/0x243AE8D5F7AFa98d00623232386F2e2fb2464F86#code`

---

## 6. Running the Frontend

To start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To create an optimized production build:

```bash
npm run build
npm run start
```

---

## 7. Official Ecosystem Links

* **BOT Chain Website:** [https://botchain.ai](https://botchain.ai)
* **BOT Chain Explorer:** [https://scan.botchain.ai](https://scan.botchain.ai)
* **Verified Contract:** [0x243AE8D5F7AFa98d00623232386F2e2fb2464F86](https://scan.botchain.ai/address/0x243AE8D5F7AFa98d00623232386F2e2fb2464F86#code)

---

## 8. Disclaimer

SkillSnap is a decentralized skill directory, not a job marketplace, escrow platform, or hiring service. Listings are user-submitted and skills are not independently verified. Users must exercise their own due diligence.
