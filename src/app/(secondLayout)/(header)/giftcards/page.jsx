"use client";

import FilterProvider from "@/store/providers/FilterProvider";
import CustomTable from "@/components/CustomTable";
import Filter from "@/components/Filter";

const page = () => {
  return (
    <FilterProvider>
      <Filter />
      <CustomTable />
    </FilterProvider>
  );
};

export default page;
