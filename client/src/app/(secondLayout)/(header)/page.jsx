"use client";

import { useState } from "react";
import Form from "@/components/form";
import FormChildren from "@/components/formchildren";
import Button from "@/components/button";
import { useToaster } from "@/store/contexts/ToasterContext";
import "@/app/globals.css";
import { getContract } from "@/utils/web3";
import { getFromLocalStorage } from "@/utils/help";
import LoadingOverlay from "@/components/LoadingOverlay";
import { ethers } from "ethers";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [giftCardCode, setGiftCardCode] = useState("");
  const { toggleToaster } = useToaster();
  const [isLoading, setIsLoading] = useState(false);

  const handleBuySubmit = async (e) => {
    setIsLoading(true);
    const contract = await getContract();
    const addresses = getFromLocalStorage("addresses");
    if (!addresses) return;

    contract.events.CardBought().on("data", function (event) {
      const { code, amount } = event.returnValues;
      console.log("Gift Card Code:", code);
      setIsLoading(false);
      toggleToaster(`Your code is ${code}`, "success", true);
    });

    await contract.methods.buyGiftCard().send({
      from: addresses[0],
      value: ethers.parseUnits(amount, "ether"),
    });
  };

  const handleRedeemSubmit = async (e) => {
    setIsLoading(true);
    const contract = await getContract();
    const addresses = getFromLocalStorage("addresses");

    contract.events.CardRedeemed().on("data", function (event) {
      const { amount } = event.returnValues;
      setIsLoading(false);
      toggleToaster(
        `Gift card redeemed successfully! You received ${ethers.formatUnits(
          amount.toString(),
          "ether"
        )} ETH`,
        "success",
        true
      );
    });

    await contract.methods
      .redeemCard(giftCardCode)
      .send({ from: addresses[0] });
  };

  return (
    <div className="flex items-center justify-center flex-col w-8/12 h-4/5 rounded-xl mx-auto mt-10 gap-3">
      <Form title="Buy GiftCard" className="w-full" onSubmit={handleBuySubmit}>
        <div className="mb-5 flex flex-row">
          <LoadingOverlay open={isLoading} />
          <FormChildren
            type="textField"
            label="Amount"
            className="mx-3"
            stateName="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            inputType="number"
          />
          <Button title="Buy" type="submit" />
        </div>
      </Form>

      <Form
        title="Redeem GiftCard"
        className="w-full"
        onSubmit={handleRedeemSubmit}
      >
        <div className="mb-5 flex flex-row">
          <FormChildren
            type="textField"
            label="GiftCard Code"
            className="mx-3"
            stateName="giftCardCode"
            value={giftCardCode}
            onChange={(e) => setGiftCardCode(e.target.value)}
          />
          <Button type="submit" title="Redeem" />
        </div>
      </Form>
    </div>
  );
}
