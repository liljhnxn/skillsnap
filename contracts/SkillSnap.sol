// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title SkillSnap
 * @notice Simple, decentralized skill directory for Botchain Testnet.
 * @dev Allows wallets to publish, update, and remove a single active skill listing.
 * Tagline: Show your skill. Make your mark.
 */
contract SkillSnap {
    // Limits to keep storage clean and gas costs minimal
    uint256 public constant MAX_NICKNAME_LENGTH = 32;
    uint256 public constant MAX_SKILL_NAME_LENGTH = 64;
    uint256 public constant MAX_CATEGORY_LENGTH = 32;
    uint256 public constant MAX_DESCRIPTION_LENGTH = 280;

    struct Listing {
        address owner;
        string nickname;
        string skillName;
        string category;
        string description;
        uint256 timestamp;
        bool isActive;
    }

    // Mapping from wallet address to their listing
    mapping(address => Listing) private listings;

    // Track all registered owner addresses for off-chain and view enumeration
    address[] private listingOwners;
    mapping(address => bool) private hasEverListed;

    // Total count of currently active listings
    uint256 private activeListingCount;

    // Events
    event ListingCreated(
        address indexed owner,
        string nickname,
        string skillName,
        string category,
        uint256 timestamp
    );

    event ListingUpdated(
        address indexed owner,
        string nickname,
        string skillName,
        string category,
        uint256 timestamp
    );

    event ListingRemoved(
        address indexed owner,
        uint256 timestamp
    );

    // Custom errors for clarity and gas efficiency
    error FieldRequired(string fieldName);
    error StringTooLong(string fieldName, uint256 maxLength);
    error ListingAlreadyActive();
    error ListingNotFound();
    error Unauthorized();

    /**
     * @dev Validates input lengths and presence
     */
    function _validateInputs(
        string calldata nickname,
        string calldata skillName,
        string calldata category,
        string calldata description
    ) private pure {
        bytes memory nickBytes = bytes(nickname);
        if (nickBytes.length == 0) revert FieldRequired("nickname");
        if (nickBytes.length > MAX_NICKNAME_LENGTH) {
            revert StringTooLong("nickname", MAX_NICKNAME_LENGTH);
        }

        bytes memory skillBytes = bytes(skillName);
        if (skillBytes.length == 0) revert FieldRequired("skillName");
        if (skillBytes.length > MAX_SKILL_NAME_LENGTH) {
            revert StringTooLong("skillName", MAX_SKILL_NAME_LENGTH);
        }

        bytes memory catBytes = bytes(category);
        if (catBytes.length == 0) revert FieldRequired("category");
        if (catBytes.length > MAX_CATEGORY_LENGTH) {
            revert StringTooLong("category", MAX_CATEGORY_LENGTH);
        }

        bytes memory descBytes = bytes(description);
        if (descBytes.length == 0) revert FieldRequired("description");
        if (descBytes.length > MAX_DESCRIPTION_LENGTH) {
            revert StringTooLong("description", MAX_DESCRIPTION_LENGTH);
        }
    }

    /**
     * @notice Create a new skill listing for the caller.
     * @dev Reverts if the caller already has an active listing.
     */
    function createListing(
        string calldata nickname,
        string calldata skillName,
        string calldata category,
        string calldata description
    ) external {
        Listing storage current = listings[msg.sender];
        if (current.isActive) {
            revert ListingAlreadyActive();
        }

        _validateInputs(nickname, skillName, category, description);

        // Track address if new
        if (!hasEverListed[msg.sender]) {
            hasEverListed[msg.sender] = true;
            listingOwners.push(msg.sender);
        }

        listings[msg.sender] = Listing({
            owner: msg.sender,
            nickname: nickname,
            skillName: skillName,
            category: category,
            description: description,
            timestamp: block.timestamp,
            isActive: true
        });

        activeListingCount += 1;

        emit ListingCreated(
            msg.sender,
            nickname,
            skillName,
            category,
            block.timestamp
        );
    }

    /**
     * @notice Update an existing active listing for the caller.
     */
    function updateListing(
        string calldata nickname,
        string calldata skillName,
        string calldata category,
        string calldata description
    ) external {
        Listing storage current = listings[msg.sender];
        if (!current.isActive) {
            revert ListingNotFound();
        }

        _validateInputs(nickname, skillName, category, description);

        current.nickname = nickname;
        current.skillName = skillName;
        current.category = category;
        current.description = description;
        current.timestamp = block.timestamp;

        emit ListingUpdated(
            msg.sender,
            nickname,
            skillName,
            category,
            block.timestamp
        );
    }

    /**
     * @notice Remove the caller's active skill listing.
     */
    function removeListing() external {
        Listing storage current = listings[msg.sender];
        if (!current.isActive) {
            revert ListingNotFound();
        }

        current.isActive = false;
        current.timestamp = block.timestamp;
        activeListingCount -= 1;

        emit ListingRemoved(msg.sender, block.timestamp);
    }

    /**
     * @notice Get a specific listing by wallet address.
     * @param user The address of the listing owner.
     */
    function getListing(address user) external view returns (Listing memory) {
        return listings[user];
    }

    /**
     * @notice Get total count of all unique wallets that have ever listed.
     */
    function getListingCount() external view returns (uint256) {
        return listingOwners.length;
    }

    /**
     * @notice Get total count of currently active listings.
     */
    function getActiveListingCount() external view returns (uint256) {
        return activeListingCount;
    }

    /**
     * @notice Returns all currently active listings in a single read call.
     * @dev Gas-free for view calls; enables clean, reliable listing browsing.
     */
    function getAllActiveListings() external view returns (Listing[] memory) {
        uint256 count = activeListingCount;
        Listing[] memory active = new Listing[](count);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < listingOwners.length; i++) {
            address owner = listingOwners[i];
            if (listings[owner].isActive) {
                active[currentIndex] = listings[owner];
                currentIndex++;
                if (currentIndex == count) {
                    break;
                }
            }
        }

        return active;
    }

    /**
     * @notice Returns all listing owner addresses.
     */
    function getListingOwners() external view returns (address[] memory) {
        return listingOwners;
    }
}

