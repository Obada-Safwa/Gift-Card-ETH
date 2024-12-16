// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

enum UserType {
    ADMIN,
    NORMAL
}

enum GiftCardStatus {
    EXPIRED,
    VALID
}

struct User {
    string name;
    UserType userType;
}

struct GiftCard {
    address buyer;
    uint256 amount;
    GiftCardStatus giftCardStatus;
}

contract GiftCardETH {
    mapping(address => User) users;
    mapping(string => GiftCard) giftCards;
    bool private locked;

    string[] giftCardCodes;
    address[] userAddresses;

    constructor() {
        users[0x8dC03105bA1A429fc962EbE37766B8601D70e0D6] = User(
            "Ibrahim Mohamed",
            UserType.ADMIN
        );
        userAddresses.push(0x8dC03105bA1A429fc962EbE37766B8601D70e0D6);

        users[0xAd009219D5052664e665c2A95f12e4aBeA6730C0] = User(
            "Obada Safwa",
            UserType.ADMIN
        );
        userAddresses.push(0xAd009219D5052664e665c2A95f12e4aBeA6730C0);
    }

    event CardBought(string code, uint256 amount);

    modifier adminOnly() {
        require(
            bytes(users[msg.sender].name).length > 0,
            "User does not exist"
        );

        require(
            users[msg.sender].userType == UserType.ADMIN,
            "You are not an admin"
        );
        _; // Continue executing the function
    }

    modifier reentrancyGuard() {
        require(!locked, "ReentrancyGuard: reentrant call");
        locked = true;
        _;
        locked = false;
    }

    modifier checkGiftCardStatus(string memory code) {
        require(
            giftCards[code].giftCardStatus == GiftCardStatus.VALID,
            "Card is Invalid"
        );
        _;
    }

    modifier checkGiftCardUniqueness(string memory code) {
        bool isExist = false;

        for (uint256 i = 0; i < giftCardCodes.length; i++) {
            if (
                keccak256(abi.encodePacked(giftCardCodes[i])) ==
                keccak256(abi.encodePacked(code))
            ) {
                isExist = true;
                break;
            }
        }
        require(!isExist, "Code is Not Unique");
        _;
    }

    function getGiftCardByStatus(GiftCardStatus status)
        external
        view
        returns (GiftCard[] memory giftcards)
    {
        uint256 count = 0;
        uint256 length = giftCardCodes.length;

        for (uint256 i = 0; i < length; i++) {
            if (giftCards[giftCardCodes[i]].giftCardStatus == status) {
                count++;
            }
        }

        GiftCard[] memory result = new GiftCard[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < length; i++) {
            if (giftCards[giftCardCodes[i]].giftCardStatus == status) {
                result[index] = giftCards[giftCardCodes[i]];
                index++;
            }
        }

        return result;
    }

    function getAllGiftCards()
        external
        view
        adminOnly
        returns (GiftCard[] memory giftcards)
    {
        uint256 length = giftCardCodes.length;

        GiftCard[] memory result = new GiftCard[](length);
        for (uint256 i = 0; i < length; i++) {
            result[i] = giftCards[giftCardCodes[i]];
        }

        return result;
    }

    function getRandomNumber(uint256 seed) private view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.timestamp, block.prevrandao, seed)
                )
            ) % 10000;
    }

    function generateGiftCardCode() private view returns (string memory) {
        bytes memory randomString = new bytes(8);
        for (uint256 i = 0; i < 8; i++) {
            uint256 randomCharCode = getRandomNumber(i);
            randomString[i] = bytes1(uint8(97 + (randomCharCode % 26)));
        }
        return string(randomString);
    }

    function addCard(string memory code, uint256 amount)
        private
        checkGiftCardUniqueness(code)
    {
        giftCardCodes.push(code);
        giftCards[code] = GiftCard(msg.sender, amount, GiftCardStatus.VALID);
    }

    function buyGiftCard() external payable {
        uint256 amount = msg.value / 1 ether;
        string memory code = generateGiftCardCode();

        addCard(code, amount);

        emit CardBought(code, amount);
    }

    fallback() external payable {}

    receive() external payable {}
}
