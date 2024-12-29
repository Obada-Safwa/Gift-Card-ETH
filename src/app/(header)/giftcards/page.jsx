import CustomTable from "@/components/CustomTable";
import React from "react";

const page = () => {
  const giftCards = [
    {
      giftCardCode: "VJGHFUcd18",
      buyerName: "Ahmed",
      giftCardUser: "test",
      status: "Valid",
      amount: 30,
    },
    {
      giftCardCode: "KJHGTR54A9",
      buyerName: "Sarah",
      giftCardUser: "user123",
      status: "Valid",
      amount: 50,
    },
    {
      giftCardCode: "PLMNBYT78F",
      buyerName: "John",
      giftCardUser: "testUser",
      status: "Expired",
      amount: 0,
    },
    {
      giftCardCode: "QAZWSX23ED",
      buyerName: "Emily",
      giftCardUser: "guest456",
      status: "Valid",
      amount: 25,
    },
    {
      giftCardCode: "XCVBNM76KL",
      buyerName: "Michael",
      giftCardUser: "alpha789",
      status: "Used",
      amount: 0,
    },
  ];

  return <CustomTable rows={giftCards} />;
};

export default page;
