import FilterChild from "./FilterChild";

const FilterButtons = ({ setCurrentCards, myCards, allCards, admin }) => {
  const valid = allCards.filter((card) => card.giftCardStatus === 1n);
  const expired = allCards.filter((card) => card.giftCardStatus === 0n);
  const myValid = myCards.filter((card) => card.giftCardStatus === 1n);
  const myExpired = myCards.filter((card) => card.giftCardStatus === 0n);

  const filterBtns = [
    {
      name: "My Cards",
      number: myCards.length,
      onClick: () => {
        setCurrentCards(myCards);
      },
    },
    {
      name: "Valid",
      number: valid.length,
      onClick: () => {
        setCurrentCards(myValid);
      },
    },
    {
      name: "Expired",
      number: expired.length,
      onClick: () => {
        setCurrentCards(myExpired);
      },
    },
  ];

  if (admin) {
    filterBtns.push({
      name: "All Cards",
      number: allCards.length,
      onClick: () => {
        setCurrentCards(allCards);
      },
    });
    filterBtns.push({
      name: "All Cards valid cards",
      number: valid.length,
      onClick: () => {
        setCurrentCards(valid);
      },
    });
    filterBtns.push({
      name: "All Cards expired cards",
      number: expired.length,
      onClick: () => {
        setCurrentCards(expired);
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

  return <>{filterBtnsElement}</>;
};

export default FilterButtons;
