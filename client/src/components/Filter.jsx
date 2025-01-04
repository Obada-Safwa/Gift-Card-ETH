"use client";

import { useFilterCards } from "@/store/contexts/FilterCardsContext";
import { FunnelIcon } from "@heroicons/react/24/solid";
import FilterButtons from "./FilterButtons";

export default function Filter({}) {
  const { setCurrentCards, myCards, allCards, admin } = useFilterCards();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-screen-xl mx-auto mt-5">
      <div className="flex items-center gap-2 mb-4 text-gray-800 font-medium">
        <FunnelIcon className="h-5 w-5 text-purple-500" />
        <span>Filter Options</span>
      </div>
      <div className="flex flex-wrap gap-3">
        <FilterButtons
          setCurrentCards={setCurrentCards}
          myCards={myCards}
          allCards={allCards}
          admin={admin}
        />
      </div>
      <div className="h-px bg-gradient-to-r from-purple-500 to-pink-500 mt-4 opacity-50" />
    </div>
  );
}
