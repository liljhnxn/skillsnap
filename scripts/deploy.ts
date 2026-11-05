import hre from "hardhat";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const { ethers } = hre;

async function main() {
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log("=========================================");
  console.log(`Deploying SkillSnap Contract to Chain ID: ${network.chainId}`);
  console.log("Deployer address:", deployer ? deployer.address : "None found!");

  if (!deployer) {
    throw new Error("No deployer signer available. Please check DEPLOYER_PRIVATE_KEY.");
  }

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Deployer balance:", ethers.formatEther(balance), "BOT");

  if (balance === BigInt(0)) {
    throw new Error("Deployer balance is 0 BOT! Fund wallet with BOT for gas.");
  }

  const feeData = await ethers.provider.getFeeData();
  console.log("Network Gas Price:", feeData.gasPrice ? `${ethers.formatUnits(feeData.gasPrice, "gwei")} Gwei` : "Unknown");

  console.log("Submitting deployment transaction with optimized gas parameters...");
  const SkillSnapFactory = await ethers.getContractFactory("SkillSnap");
  
  // Deploy with exact gasPrice to ensure no overpayment
  const skillSnap = await SkillSnapFactory.deploy({
    gasPrice: feeData.gasPrice ?? undefined,
  });

  const txHash = skillSnap.deploymentTransaction()?.hash;
  console.log("Transaction hash:", txHash);
  console.log("Waiting for block confirmation...");

  await skillSnap.waitForDeployment();

  const contractAddress = await skillSnap.getAddress();
  const explorerUrl = Number(network.chainId) === 677 
    ? `https://scan.botchain.ai/address/${contractAddress}` 
    : `https://scan.bohr.life/address/${contractAddress}`;

  console.log("-----------------------------------------");
  console.log("SkillSnap successfully deployed on Mainnet!");
  console.log("Contract Address:", contractAddress);
  console.log("Block Explorer:", explorerUrl);
  console.log("-----------------------------------------");
  console.log("NEXT STEPS:");
  console.log(`Update your .env.local file:`);
  console.log(`NEXT_PUBLIC_SKILLSNAP_CONTRACT_ADDRESS=${contractAddress}`);
  console.log(`NEXT_PUBLIC_BOTCHAIN_RPC_URL=https://rpc.botchain.ai`);
  console.log("=========================================");
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
