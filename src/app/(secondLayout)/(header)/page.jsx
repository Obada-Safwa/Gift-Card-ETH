"use client";

import { useState, useContext } from "react";
import Form from "@/components/form";
import FormChildren from "@/components/formchildren";
import Button from "@/components/button";
import { useToaster } from "@/store/contexts/ToasterContext";
import "@/app/globals.css";
import { getContract } from "@/utils/web3";
import { getFromLocalStorage } from "@/utils/help";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [giftCardCode, setGiftCardCode] = useState("");
  const { toggleToaster } = useToaster();

  const handleBuySubmit = async (e) => {
    // const amount = e.target.amount.value;
    console.log("What is e:", e);
    console.log("Buying gift card with amount:", amount);
    const contract = await getContract();
    const addresses = getFromLocalStorage("addresses");
    await contract.methods
      .buyGiftCard()
      .send({ from: addresses[0] })
      .then((res) => {
        console.log("Transaction successful:", res);
        // console.log(
        //   "MY RETURN VALUES EVENT: ",
        //   contract.events.CardBought().returnValues
        // );
        toggleToaster(
          `You can now redeem your gift card worth ${amount}`,
          "success",
          true
        );
        contract.events.CardBought().on("data", function (event) {
          const { code, amount } = event.returnValues;
          console.log("Gift Card Code:", code);
          console.log("Amount:", amount);
          setTimeout(() => {
            toggleToaster(`Your code is ${code}`, "success", true);
          }, 5000);
        });
      });
  };

  const handleRedeemSubmit = async (e) => {
    const contract = await getContract();
    const addresses = getFromLocalStorage("addresses");
    await contract.methods
      .redeemCard(giftCardCode)
      .send({ from: addresses[0] })
      .then((res) => {
        console.log("Transaction successful:", res);
        // console.log(
        //   "MY RETURN VALUES EVENT: ",
        //   contract.events.CardBought().returnValues
        // );
        toggleToaster("Gift card redeemed successfully", "success", true);
      });
    console.log("Redeeming gift card with code:", giftCardCode);
  };

  return (
    <div className="flex items-center justify-center flex-col w-8/12 h-4/5 rounded-xl mx-auto mt-10 gap-3">
      <Form title="Buy GiftCard" className="w-full" onSubmit={handleBuySubmit}>
        <div className="mb-5 flex flex-row">
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
