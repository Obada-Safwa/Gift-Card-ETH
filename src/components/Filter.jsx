import { useFilter } from "@/store/contexts/FilterContext";
import FilterChild from "./FilterChild";
import { FunnelIcon } from "@heroicons/react/24/solid";

export default function Filter() {
  const { myCards, allCards, setFilter } = useFilter();

  const valid = myCards.filter((card) => card.status === "Valid");
  const expired = myCards.filter((card) => card.status === "Expired");

  const filterBtns = [
    {
      name: "My Cards",
      number: myCards.length,
      onClick: () => {
        setFilter(myCards);
      },
    },
    {
      name: "Valid",
      number: valid.length,
      onClick: () => {
        setFilter(valid);
      },
    },
    {
      name: "Expired",
      number: expired.length,
      onClick: () => {
        setFilter(expired);
      },
    },
  ];

  const isAdmin = true;

  if (isAdmin) {
    filterBtns.push({
      name: "All Cards",
      number: allCards.length,
      onClick: () => {
        setFilter(allCards);
      },
    });
    filterBtns.push({
      name: "All Cards valid cards",
      number: allCards.filter((card) => card.status === "Valid").length,
      onClick: () => {
        setFilter(allCards.filter((card) => card.status === "Valid"));
      },
    });
    filterBtns.push({
      name: "All Cards expired cards",
      number: allCards.filter((card) => card.status === "Expired").length,
      onClick: () => {
        setFilter(allCards.filter((card) => card.status === "Expired"));
      },
    });
  }

  const filterBtnsElement = filterBtns.map((btn) => (
    <FilterChild
      key={btn.name}
      name={btn.name}
      number={btn.number}
      onClick={btn.onClick}
    />
  ));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-screen-xl mx-auto mt-5">
      <div className="flex items-center gap-2 mb-4 text-gray-800 font-medium">
        <FunnelIcon className="h-5 w-5 text-purple-500" />
        <span>Filter Options</span>
      </div>
      <div className="flex flex-wrap gap-3">{filterBtnsElement}</div>
      <div className="h-px bg-gradient-to-r from-purple-500 to-pink-500 mt-4 opacity-50" />
    </div>
  );
}
