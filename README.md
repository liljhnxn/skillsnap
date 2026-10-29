# SkillSnap — Decentralized Web3 Skill Directory

> **Tagline:** Show your skill. Make your mark.

SkillSnap is a simple, decentralized skill directory built on **Botchain Testnet**. It enables developers, designers, creators, and builders to showcase the skills they offer on-chain and discover skills offered by other wallets.

---

## 1. Network Configuration (Botchain Testnet)

SkillSnap runs on **Botchain Testnet**. Add the network to your Web3 wallet (e.g. MetaMask):

| Parameter | Value |
|---|---|
| **Network Name** | Botchain Testnet |
| **Chain ID** | `968` |
| **RPC URL** | `https://rpc.bohr.life` |
| **Currency Symbol** | `BOT` |
| **Decimals** | `18` |
| **Block Explorer** | `https://scan.bohr.life` |

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
│   └── deploy.ts              # Hardhat deployment script for Botchain
├── app/
│   ├── globals.css            # Custom charcoal & muted purple styles
│   ├── layout.tsx             # Root layout and fonts
│   ├── page.tsx               # Single-page interface
│   └── providers.tsx          # Wagmi & React Query client providers
├── components/
│   ├── Header.tsx             # Navigation, network badge & wallet button
│   ├── Hero.tsx               # Hero section & CTA
│   ├── MyListingSection.tsx   # View, edit & remove active listing
│   ├── SkillDirectory.tsx     # Client-side search & category filtering
│   ├── SkillCard.tsx          # Card with copy wallet & explorer link
│   ├── ListingFormModal.tsx   # Modal for create & update listing
│   ├── RemoveListingModal.tsx # Confirmation modal for removing listing
│   ├── NetworkBanner.tsx      # Wrong network & missing config alerts
│   └── Footer.tsx             # Legal disclaimer & explorer link
├── config/
│   ├── botchain.ts            # Viem custom chain definition for Botchain
│   ├── contracts.ts           # SkillSnap ABI and type definitions
│   └── wagmi.ts               # Wagmi connector configuration
├── hardhat.config.ts          # Hardhat configuration
├── package.json
└── README.md
```

---

## 4. Getting Started

### Prerequisites

- Node.js `v18+` or `v20+` (compatible with modern Node releases)
- npm or pnpm
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
# Set after deploying your SkillSnap contract:
NEXT_PUBLIC_SKILLSNAP_CONTRACT_ADDRESS=0xYourContractAddressHere

# Optional: custom RPC if needed
NEXT_PUBLIC_BOTCHAIN_RPC_URL=https://rpc.bohr.life

# Deployer private key (ONLY needed for contract deployment, never commit to git)
DEPLOYER_PRIVATE_KEY=your_private_key_here
```

---

## 5. Smart Contract Compilation & Testing

To compile the smart contract:

```bash
npm run contract:compile
```

To run the automated test suite (verifying creation, updates, input validation, duplicate prevention, unauthorized access protection, and events):

```bash
npm run contract:test
```

---

## 6. Smart Contract Deployment

1. Fund your deployer wallet with testnet `BOT` tokens on Botchain Testnet.
2. Ensure `DEPLOYER_PRIVATE_KEY` is set in `.env.local` or environment variables.
3. Run the deployment script:

```bash
npm run contract:deploy
```

4. The deployment script will output the deployed contract address and BohrScan block explorer link.
5. Copy the address into `.env.local`:
   ```env
   NEXT_PUBLIC_SKILLSNAP_CONTRACT_ADDRESS=0x...
   ```

---

## 7. Running the Frontend

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

## 8. Gas Requirements & On-Chain Actions

SkillSnap strictly interacts with the smart contract for state changes:

| Action | Gas Required? | Details |
|---|---|---|
| **Browsing Skills** | **No (Free)** | Read-only view call from Botchain RPC |
| **Search & Filtering** | **No (Free)** | Executed client-side on fetched listings |
| **Connecting Wallet** | **No (Free)** | Client-side wallet handshake |
| **Create Listing** | **Yes (Testnet BOT)** | Writes listing data to smart contract |
| **Update Listing** | **Yes (Testnet BOT)** | Updates on-chain listing struct |
| **Remove Listing** | **Yes (Testnet BOT)** | Marks listing as inactive on-chain |

---

## 9. Disclaimer

SkillSnap is a decentralized skill directory, not a job marketplace, escrow platform, or hiring service. Listings are user-submitted and skills are not independently verified. Users must exercise their own due diligence.

