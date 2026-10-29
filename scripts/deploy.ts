import hre from "hardhat";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const { ethers } = hre;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("=========================================");
  console.log("Deploying SkillSnap Contract to Botchain Testnet");
  console.log("Deployer address:", deployer ? deployer.address : "None found!");

  if (!deployer) {
    throw new Error("No deployer signer available. Please check DEPLOYER_PRIVATE_KEY.");
  }

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Deployer balance:", ethers.formatEther(balance), "BOT");

  if (balance === BigInt(0)) {
    console.warn("WARNING: Deployer balance is 0 BOT! Deployment might fail due to lack of gas funds.");
  }

  console.log("Submitting deployment transaction...");
  const SkillSnapFactory = await ethers.getContractFactory("SkillSnap");
  const skillSnap = await SkillSnapFactory.deploy();

  console.log("Transaction hash:", skillSnap.deploymentTransaction()?.hash);
  console.log("Waiting for block confirmation...");

  await skillSnap.waitForDeployment();

  const contractAddress = await skillSnap.getAddress();
  console.log("-----------------------------------------");
  console.log("SkillSnap successfully deployed!");
  console.log("Contract Address:", contractAddress);
  console.log("Block Explorer: https://scan.bohr.life/address/" + contractAddress);
  console.log("-----------------------------------------");
  console.log("NEXT STEPS:");
  console.log(`Add to your .env.local file:`);
  console.log(`NEXT_PUBLIC_SKILLSNAP_CONTRACT_ADDRESS=${contractAddress}`);
  console.log("=========================================");
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
