// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;
enum UserType {
    NORMAL,
    ADMIN
}
enum GiftCardStatus {
    EXPIRED,
    VALID
}
enum Gender {
    FEMALE,
    MALE
}
struct User {
    string name;
    Gender gender;
    UserType userType;
}
struct GiftCard {
    string buyer;
    uint256 amount;
    GiftCardStatus giftCardStatus;
    string getter;
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
            Gender.MALE,
            UserType.ADMIN
        );
        userAddresses.push(0x8dC03105bA1A429fc962EbE37766B8601D70e0D6);
        users[0xAd009219D5052664e665c2A95f12e4aBeA6730C0] = User(
            "Obada Safwa",
            Gender.MALE,
            UserType.ADMIN
        );
        userAddresses.push(0xAd009219D5052664e665c2A95f12e4aBeA6730C0);
    }

    event CardBought(string code, uint256 amount);
    event CardRedeemed(uint256 amount);
    modifier registeredUsersOnly() {
        require(
            bytes(users[msg.sender].name).length > 0,
            "User does not exist"
        );
        _;
    }
    modifier adminOnly() {
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

    function registration(string calldata name, Gender gender) external {
        userAddresses.push(msg.sender);
        users[msg.sender] = User(name, gender, UserType.NORMAL);
    }

    function isAdmin() public view registeredUsersOnly returns (bool) {
        return users[msg.sender].userType == UserType.ADMIN;
    }

    function getMyData() public registeredUsersOnly view returns (User memory) {
        return users[msg.sender];
    }

    function isRegistered() public view returns(bool){
        return bytes(users[msg.sender].name).length > 0;
    }

    function getGiftCardByStatus(GiftCardStatus status)
        external
        view
        registeredUsersOnly
        adminOnly
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
        registeredUsersOnly
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
        bytes memory randomString = new bytes(15);
        for (uint256 i = 0; i < 15; i++) {
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
        giftCards[code] = GiftCard(
            users[msg.sender].name,
            amount,
            GiftCardStatus.VALID,
            ""
        );
    }

    function buyGiftCard() external payable registeredUsersOnly {
        uint256 amount = (msg.value * 90) / 100;
        string memory code = generateGiftCardCode();
        addCard(code, amount);
        emit CardBought(code, amount);
    }

    function getMyCard()
        public
        view
        registeredUsersOnly
        returns (GiftCard[] memory)
    {
        uint256 count = 0;
        bytes32 senderNameHash = keccak256(
            abi.encodePacked(users[msg.sender].name)
        );

        for (uint256 i = 0; i < giftCardCodes.length; i++) {
            if (
                keccak256(
                    abi.encodePacked(giftCards[giftCardCodes[i]].buyer)
                ) ==
                senderNameHash ||
                keccak256(
                    abi.encodePacked(giftCards[giftCardCodes[i]].getter)
                ) ==
                senderNameHash
            ) {
                count++;
            }
        }

        GiftCard[] memory myCards = new GiftCard[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < giftCardCodes.length; i++) {
            if (
                keccak256(
                    abi.encodePacked(giftCards[giftCardCodes[i]].buyer)
                ) ==
                senderNameHash ||
                keccak256(
                    abi.encodePacked(giftCards[giftCardCodes[i]].getter)
                ) ==
                senderNameHash
            ) {
                myCards[index] = giftCards[giftCardCodes[i]];
                index++;
            }
        }

        return myCards;
    }

    function redeemCard(string calldata _code)
        public
        checkGiftCardStatus(_code)
        registeredUsersOnly
        reentrancyGuard
    {
        (bool status, ) = msg.sender.call{value: giftCards[_code].amount}("");
        if (status) {
            giftCards[_code].giftCardStatus = GiftCardStatus.EXPIRED;
            giftCards[_code].getter = users[msg.sender].name;
            emit CardRedeemed(giftCards[_code].amount);
        }
    }

    fallback() external payable {}

    receive() external payable {}
}
