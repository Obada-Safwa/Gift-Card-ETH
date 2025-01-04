"use client";

import { createContext, useContext } from "react";

export const FilterCardsContext = createContext();

export const useFilterCards = () => {
  return useContext(FilterCardsContext);
};

export default FilterCardsContext;
