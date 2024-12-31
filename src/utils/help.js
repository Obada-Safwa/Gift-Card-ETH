const getFromLocalStorage = (key) => {
  if (typeof window === "undefined") return null;

  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

const setToLocalStorage = (key, value) => {
  if (typeof window === "undefined") return null;
  return localStorage.setItem(key, JSON.stringify(value));
};

export { getFromLocalStorage, setToLocalStorage };
