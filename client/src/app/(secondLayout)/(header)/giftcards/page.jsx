"use client";

import FilterProvider from "@/store/providers/FilterProvider";
import CustomTable from "@/components/CustomTable";
import Filter from "@/components/Filter";
import WithdrawBalance from "@/components/WithdrawBalance";
import { useEffect, useState } from "react";
import { isAdmin } from "@/utils/help";

const GiftCardsPage = () => {
  const [admin, setAdmin] = useState();

  useEffect(() => {
    const init = async () => {
      const admin = await isAdmin();
      setAdmin(admin);
    };

    init();
  }, []);

  return (
    <FilterProvider>
      <Filter />
      {admin && <WithdrawBalance />}
      <CustomTable />
    </FilterProvider>
  );
};

export default GiftCardsPage;
