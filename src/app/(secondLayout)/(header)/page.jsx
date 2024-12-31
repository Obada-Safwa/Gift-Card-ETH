"use client";

import { useState, useContext } from "react";
import Form from "@/components/form";
import FormChildren from "@/components/formchildren";
import Button from "@/components/button";
import { useToaster } from "@/store/contexts/ToasterContext";
import "@/app/globals.css";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [giftCardCode, setGiftCardCode] = useState("");
  const { toggleToaster } = useToaster();

  const handleBuySubmit = (e) => {
    toggleToaster("Gift card bought successfully", "success", true);
    console.log("Buying gift card with amount:", amount);
  };

  const handleRedeemSubmit = (e) => {
    toggleToaster("Gift card redeemed successfully", "success", true);
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
