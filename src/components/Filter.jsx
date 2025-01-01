import { useFilter } from "@/store/contexts/FilterContext";
import FilterChild from "./FilterChild";
import { FunnelIcon } from "@heroicons/react/24/solid";
import { getContract } from "@/utils/web3";
import { getFromLocalStorage } from "@/utils/help";
import isAdmin from "@/utils/help";

export default function Filter() {
  const { myCards, allCards, setFilter } = useFilter();

  const valid = myCards.filter((card) => card.status === "Valid");
  const expired = myCards.filter((card) => card.status === "Expired");

  const statusAssigner = (cards) => {
    cards.map((card) => {
      // console.log("Raw cards data: FILTER", card[2]);
      card[2] === 1n ? (card[2] = 1) : (card[2] = 0);
    });
  };

  const filterBtns = [
    {
      name: "My Cards",
      number: myCards.length,
      onClick: async () => {
        const contract = await getContract();
        const addresses = getFromLocalStorage("addresses");
        const cards = await contract.methods.getMyCard().call({
          from: addresses[0],
        });
        // console.log("Raw cards data: FILTER", cards);
        statusAssigner(cards);
        // console.log(
        //   "Raw cards data: FILTER AFTER AFTER AFTER",
        //   typeof cards[0][2]
        // );
        // myCards.push(...cards);
        setFilter(cards);
      },
    },
    {
      name: "Valid",
      number: valid.length,
      onClick: async () => {
        const contract = await getContract();
        const addresses = getFromLocalStorage("addresses");
        const cards = await contract.methods.getMyCard().call({
          from: addresses[0],
        });

        const myValidCards = cards.filter((card) => card[2] === 1n);
        // console.log("Raw cards data: FILTER", myValidCards);
        statusAssigner(myValidCards);
        // console.log(
        //   "Raw cards data: FILTER AFTER AFTER AFTER",
        //   typeof cards[0][2]
        // );
        // myCards.push(...cards);
        setFilter(myValidCards);
      },
    },
    {
      name: "Expired",
      number: expired.length,
      onClick: async () => {
        const contract = await getContract();
        const addresses = getFromLocalStorage("addresses");
        const cards = await contract.methods.getMyCard().call({
          from: addresses[0],
        });

        const myExpiredCards = cards.filter((card) => card[2] === 0n);
        // console.log("Raw cards data: FILTER", myExpiredCards);
        statusAssigner(myExpiredCards);
        // console.log(
        //   "Raw cards data: FILTER AFTER AFTER AFTER",
        //   typeof cards[0][2]
        // );
        // myCards.push(...cards);
        setFilter(myExpiredCards);
      },
    },
  ];

  // const isAdmin = true;

  if (isAdmin) {
    filterBtns.push({
      name: "All Cards",
      number: allCards.length,
      onClick: async () => {
        const contract = await getContract();
        const addresses = getFromLocalStorage("addresses");
        const cards = await contract.methods
          .getAllGiftCards()
          .call({ from: addresses[0] });
        // console.log("Raw cards data: FILTER", typeof cards[0][2]);
        statusAssigner(cards);
        // console.log(
        //   "Raw cards data: FILTER AFTER AFTER AFETR",
        //   typeof cards[0][2]
        // );
        setFilter(cards);
      },
    });
    filterBtns.push({
      name: "All Cards valid cards",
      number: allCards.filter((card) => card.status === "Valid").length,
      onClick: async () => {
        const contract = await getContract();
        const addresses = getFromLocalStorage("addresses");
        const cards = await contract.methods
          .getGiftCardByStatus(1)
          .call({ from: addresses[0] });
        // console.log("Raw cards data: FILTER", typeof cards[0][2]);
        statusAssigner(cards);
        setFilter(cards);
      },
    });
    filterBtns.push({
      name: "All Cards expired cards",
      number: allCards.filter((card) => card.status === "Expired").length,
      onClick: async () => {
        const contract = await getContract();
        const addresses = getFromLocalStorage("addresses");
        const cards = await contract.methods
          .getGiftCardByStatus(0)
          .call({ from: addresses[0] });
        // console.log("Raw cards data: FILTER", typeof cards[0][2]);
        statusAssigner(cards);
        setFilter(cards);
        // setFilter(allCards.filter((card) => card.status === "Expired"));
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
