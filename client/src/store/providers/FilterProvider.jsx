"use client";

import { FilterCardsContext } from "@/store/contexts/FilterCardsContext";
import LoadingOverlay from "@/components/LoadingOverlay";
import { getFromLocalStorage, isAdmin } from "@/utils/help";
import { useEffect, useState } from "react";
import { getContract } from "@/utils/web3";

const FilterProvider = ({ children }) => {
  const [initialValues, setInitialValues] = useState(null);
  const [currentCards, setCurrentCards] = useState();

  useEffect(() => {
    const init = async () => {
      const contract = await getContract();
      const addresses = getFromLocalStorage("addresses");
      const admin = await isAdmin(contract, addresses);
      if (!addresses) return;

      const registered = await contract.methods.isRegistered().call({
        from: addresses[0],
      });
      if (!registered) return;

      const myCards = await contract.methods.getMyCard().call({
        from: addresses[0],
      });

      if (admin) {
        const allCards = await contract.methods
          .getAllGiftCards()
          .call({ from: addresses[0] });
        setInitialValues({ allCards, myCards, admin });
      } else {
        setInitialValues({ allCards: [], myCards });
      }

      setCurrentCards(myCards);
    };

    init();
  }, []);

  const value = {
    ...initialValues,
    currentCards,
    setCurrentCards,
  };

  if (!initialValues) return <LoadingOverlay open={true} />;

  return (
    <FilterCardsContext.Provider value={value}>
      {children}
    </FilterCardsContext.Provider>
  );
};

export default FilterProvider;
