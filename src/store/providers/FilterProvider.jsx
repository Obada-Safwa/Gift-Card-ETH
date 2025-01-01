import { useState } from "react";
import { FilterContext } from "@/store/contexts/FilterContext";

const myCards = [];

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
