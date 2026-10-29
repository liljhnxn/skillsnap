import { expect } from "chai";
import hre from "hardhat";
import { SkillSnap } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

const { ethers } = hre;

describe("SkillSnap Contract", function () {
  let skillSnap: SkillSnap;
  let owner: HardhatEthersSigner;
  let alice: HardhatEthersSigner;
  let bob: HardhatEthersSigner;

  const validListing = {
    nickname: "AliceDev",
    skillName: "Fullstack Solidity Dev",
    category: "Development",
    description: "Building reliable dApps and smart contracts on EVM chains.",
  };

  beforeEach(async function () {
    [owner, alice, bob] = await ethers.getSigners();
    const SkillSnapFactory = await ethers.getContractFactory("SkillSnap");
    skillSnap = (await SkillSnapFactory.deploy()) as unknown as SkillSnap;
    await skillSnap.waitForDeployment();
  });

  describe("1. Creating a listing", function () {
    it("should allow a user to create a listing and verify listing data", async function () {
      await skillSnap
        .connect(alice)
        .createListing(
          validListing.nickname,
          validListing.skillName,
          validListing.category,
          validListing.description
        );

      const listing = await skillSnap.getListing(alice.address);
      expect(listing.owner).to.equal(alice.address);
      expect(listing.nickname).to.equal(validListing.nickname);
      expect(listing.skillName).to.equal(validListing.skillName);
      expect(listing.category).to.equal(validListing.category);
      expect(listing.description).to.equal(validListing.description);
      expect(listing.isActive).to.be.true;
      expect(listing.timestamp).to.be.gt(0);

      expect(await skillSnap.getActiveListingCount()).to.equal(1n);
      expect(await skillSnap.getListingCount()).to.equal(1n);
    });

    it("should emit ListingCreated event with correct arguments", async function () {
      const tx = await skillSnap
        .connect(alice)
        .createListing(
          validListing.nickname,
          validListing.skillName,
          validListing.category,
          validListing.description
        );

      await expect(tx)
        .to.emit(skillSnap, "ListingCreated")
        .withArgs(
          alice.address,
          validListing.nickname,
          validListing.skillName,
          validListing.category,
          (timestamp: bigint) => timestamp > 0n
        );
    });
  });

  describe("2. Rejecting empty or oversized inputs", function () {
    it("should revert if nickname is empty", async function () {
      await expect(
        skillSnap
          .connect(alice)
          .createListing("", validListing.skillName, validListing.category, validListing.description)
      ).to.be.revertedWithCustomError(skillSnap, "FieldRequired");
    });

    it("should revert if skillName is empty", async function () {
      await expect(
        skillSnap
          .connect(alice)
          .createListing(validListing.nickname, "", validListing.category, validListing.description)
      ).to.be.revertedWithCustomError(skillSnap, "FieldRequired");
    });

    it("should revert if category is empty", async function () {
      await expect(
        skillSnap
          .connect(alice)
          .createListing(validListing.nickname, validListing.skillName, "", validListing.description)
      ).to.be.revertedWithCustomError(skillSnap, "FieldRequired");
    });

    it("should revert if description is empty", async function () {
      await expect(
        skillSnap
          .connect(alice)
          .createListing(validListing.nickname, validListing.skillName, validListing.category, "")
      ).to.be.revertedWithCustomError(skillSnap, "FieldRequired");
    });

    it("should revert if nickname exceeds 32 characters", async function () {
      const longNickname = "a".repeat(33);
      await expect(
        skillSnap
          .connect(alice)
          .createListing(longNickname, validListing.skillName, validListing.category, validListing.description)
      ).to.be.revertedWithCustomError(skillSnap, "StringTooLong");
    });

    it("should revert if skillName exceeds 64 characters", async function () {
      const longSkill = "s".repeat(65);
      await expect(
        skillSnap
          .connect(alice)
          .createListing(validListing.nickname, longSkill, validListing.category, validListing.description)
      ).to.be.revertedWithCustomError(skillSnap, "StringTooLong");
    });

    it("should revert if category exceeds 32 characters", async function () {
      const longCategory = "c".repeat(33);
      await expect(
        skillSnap
          .connect(alice)
          .createListing(validListing.nickname, validListing.skillName, longCategory, validListing.description)
      ).to.be.revertedWithCustomError(skillSnap, "StringTooLong");
    });

    it("should revert if description exceeds 280 characters", async function () {
      const longDesc = "d".repeat(281);
      await expect(
        skillSnap
          .connect(alice)
          .createListing(validListing.nickname, validListing.skillName, validListing.category, longDesc)
      ).to.be.revertedWithCustomError(skillSnap, "StringTooLong");
    });
  });

  describe("3. Preventing duplicate active listings", function () {
    it("should revert if a user tries to create a second listing while one is active", async function () {
      await skillSnap
        .connect(alice)
        .createListing(
          validListing.nickname,
          validListing.skillName,
          validListing.category,
          validListing.description
        );

      await expect(
        skillSnap
          .connect(alice)
          .createListing(
            "AliceDev2",
            "Smart Contract Auditor",
            "Development",
            "Security audits"
          )
      ).to.be.revertedWithCustomError(skillSnap, "ListingAlreadyActive");
    });
  });

  describe("4. Updating an existing listing", function () {
    beforeEach(async function () {
      await skillSnap
        .connect(alice)
        .createListing(
          validListing.nickname,
          validListing.skillName,
          validListing.category,
          validListing.description
        );
    });

    it("should allow owner to update their listing", async function () {
      const updatedData = {
        nickname: "AliceWeb3",
        skillName: "Senior Solidity Engineer",
        category: "Development",
        description: "Specialized in DeFi protocols and EVM optimizations.",
      };

      const tx = await skillSnap
        .connect(alice)
        .updateListing(
          updatedData.nickname,
          updatedData.skillName,
          updatedData.category,
          updatedData.description
        );

      await expect(tx)
        .to.emit(skillSnap, "ListingUpdated")
        .withArgs(
          alice.address,
          updatedData.nickname,
          updatedData.skillName,
          updatedData.category,
          (timestamp: bigint) => timestamp > 0n
        );

      const listing = await skillSnap.getListing(alice.address);
      expect(listing.nickname).to.equal(updatedData.nickname);
      expect(listing.skillName).to.equal(updatedData.skillName);
      expect(listing.description).to.equal(updatedData.description);
      expect(listing.isActive).to.be.true;
    });

    it("should reject update with invalid or empty fields", async function () {
      await expect(
        skillSnap
          .connect(alice)
          .updateListing("", validListing.skillName, validListing.category, validListing.description)
      ).to.be.revertedWithCustomError(skillSnap, "FieldRequired");
    });
  });

  describe("5. Removing a listing", function () {
    beforeEach(async function () {
      await skillSnap
        .connect(alice)
        .createListing(
          validListing.nickname,
          validListing.skillName,
          validListing.category,
          validListing.description
        );
    });

    it("should allow owner to remove their active listing", async function () {
      expect(await skillSnap.getActiveListingCount()).to.equal(1n);

      const tx = await skillSnap.connect(alice).removeListing();
      await expect(tx)
        .to.emit(skillSnap, "ListingRemoved")
        .withArgs(alice.address, (timestamp: bigint) => timestamp > 0n);

      const listing = await skillSnap.getListing(alice.address);
      expect(listing.isActive).to.be.false;
      expect(await skillSnap.getActiveListingCount()).to.equal(0n);
    });

    it("should allow user to create a new listing after removing the old one", async function () {
      await skillSnap.connect(alice).removeListing();

      await skillSnap
        .connect(alice)
        .createListing(
          "AliceNew",
          "UI Designer",
          "Design",
          "Modern Web3 interface design."
        );

      const listing = await skillSnap.getListing(alice.address);
      expect(listing.nickname).to.equal("AliceNew");
      expect(listing.isActive).to.be.true;
      expect(await skillSnap.getActiveListingCount()).to.equal(1n);
    });
  });

  describe("6. Preventing unauthorized updates and removals", function () {
    it("should revert if a wallet without an active listing attempts updateListing", async function () {
      await expect(
        skillSnap
          .connect(bob)
          .updateListing(
            validListing.nickname,
            validListing.skillName,
            validListing.category,
            validListing.description
          )
      ).to.be.revertedWithCustomError(skillSnap, "ListingNotFound");
    });

    it("should revert if a wallet without an active listing attempts removeListing", async function () {
      await expect(
        skillSnap.connect(bob).removeListing()
      ).to.be.revertedWithCustomError(skillSnap, "ListingNotFound");
    });

    it("should ensure a user cannot modify or remove another user's listing", async function () {
      await skillSnap
        .connect(alice)
        .createListing(
          validListing.nickname,
          validListing.skillName,
          validListing.category,
          validListing.description
        );

      await expect(
        skillSnap.connect(bob).removeListing()
      ).to.be.revertedWithCustomError(skillSnap, "ListingNotFound");

      const aliceListing = await skillSnap.getListing(alice.address);
      expect(aliceListing.isActive).to.be.true;
      expect(aliceListing.nickname).to.equal(validListing.nickname);
    });
  });

  describe("7. Listing queries & active listings enumeration", function () {
    it("getAllActiveListings returns only active listings", async function () {
      await skillSnap
        .connect(alice)
        .createListing("Alice", "Frontend", "Development", "Next.js dev");

      await skillSnap
        .connect(bob)
        .createListing("Bob", "Copywriting", "Writing", "Web3 technical writer");

      let activeListings = await skillSnap.getAllActiveListings();
      expect(activeListings.length).to.equal(2);

      await skillSnap.connect(alice).removeListing();

      activeListings = await skillSnap.getAllActiveListings();
      expect(activeListings.length).to.equal(1);
      expect(activeListings[0].owner).to.equal(bob.address);
      expect(activeListings[0].nickname).to.equal("Bob");
    });
  });
});
