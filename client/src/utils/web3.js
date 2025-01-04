"use client";

import Web3 from "web3";

const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "string", name: "code", type: "string" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "CardBought",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "CardRedeemed",
    type: "event",
  },
  { stateMutability: "payable", type: "fallback" },
  {
    inputs: [],
    name: "buyGiftCard",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllGiftCards",
    outputs: [
      {
        components: [
          { internalType: "string", name: "code", type: "string" },
          { internalType: "string", name: "buyer", type: "string" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          {
            internalType: "enum GiftCardStatus",
            name: "giftCardStatus",
            type: "uint8",
          },
          { internalType: "string", name: "getter", type: "string" },
        ],
        internalType: "struct GiftCard[]",
        name: "giftcards",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyCard",
    outputs: [
      {
        components: [
          { internalType: "string", name: "code", type: "string" },
          { internalType: "string", name: "buyer", type: "string" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          {
            internalType: "enum GiftCardStatus",
            name: "giftCardStatus",
            type: "uint8",
          },
          { internalType: "string", name: "getter", type: "string" },
        ],
        internalType: "struct GiftCard[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyData",
    outputs: [
      {
        components: [
          { internalType: "string", name: "name", type: "string" },
          { internalType: "enum Gender", name: "gender", type: "uint8" },
          { internalType: "enum UserType", name: "userType", type: "uint8" },
        ],
        internalType: "struct User",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isAdmin",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isRegistered",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_code", type: "string" }],
    name: "redeemCard",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "enum Gender", name: "gender", type: "uint8" },
    ],
    name: "registration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

const address = "0xbC0B9CF8511cad51988d9F8a3292A922a6E10B27";

export const connectWallet = async () => {
  if (window.ethereum) {
    let addresses = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    window.web3 = new Web3(window.ethereum);

    return addresses;
  }

  return [];
};

export const getContract = async () => {
  if (!window.ethereum || !window.web3) {
    throw new Error("Please install MetaMask!");
  }

  const web3 = new Web3(window.ethereum);
  return new web3.eth.Contract(abi, address);
};
