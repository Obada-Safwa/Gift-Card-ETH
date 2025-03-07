import { getContract } from "./web3";

const getFromLocalStorage = (key) => {
  if (typeof window === "undefined") return null;

  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

const setToLocalStorage = (key, value) => {
  if (typeof window === "undefined") return null;
  return localStorage.setItem(key, JSON.stringify(value));
};

const isAdmin = async () => {
  const contract = await getContract();
  const addresses = getFromLocalStorage("addresses");

  return await contract.methods.isAdmin().call({
    from: addresses[0],
  });
};

export { getFromLocalStorage, setToLocalStorage, isAdmin };
