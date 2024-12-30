import { useState } from "react";
import { FilterContext } from "@/store/contexts/FilterContext";

const myCards = [
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

let allCards;

const isAdmin = true;
if (isAdmin) {
  allCards = [
    ...myCards,
    {
      giftCardCode: "123",
      buyerName: "123",
      giftCardUser: "123",
      status: "123",
      amount: 25,
    },
    {
      giftCardCode: "XCVBN=dsM76KL",
      buyerName: "Michael",
      giftCardUser: "alpha789",
      status: "Used",
      amount: 0,
    },
  ];
}

const FilterProvider = ({ children }) => {
  let initialValues;
  if (isAdmin) {
    initialValues = { allCards: allCards, myCards: myCards };
  } else {
    initialValues = { myCards: myCards };
  }

  const [filter, setFilter] = useState(initialValues);

  let value = {
    filter,
    myCards: myCards,
    setFilter: (filteredCards) => {
      setFilter((prev) => ({
        myCards: filteredCards,
      }));
    },
  };

  if (isAdmin) value["allCards"] = allCards;

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export default FilterProvider;
