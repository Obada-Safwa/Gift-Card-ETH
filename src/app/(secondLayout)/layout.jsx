"use client";

import { getFromLocalStorage } from "@/utils/help";
import { getContract } from "@/utils/web3";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {
  const currentPath = usePathname();
  const [isRegistered, setIsRegistered] = useState(false);
  const [addresses, setAddresses] = useState(null);

  useEffect(() => {
    setAddresses(getFromLocalStorage("addresses"));

    const checkRegistration = async () => {
      if (addresses && addresses.length > 0) {
        const contract = await getContract();
        const registered = await contract.methods.isRegistered().call({
          from: addresses[0],
        });
        setIsRegistered(registered);
      }
    };

    checkRegistration();
  }, []);

  const connectedToWallet = addresses && addresses.length > 0;
  const connectButNotRegistered = connectedToWallet && !isRegistered;

  if (connectButNotRegistered === null && connectButNotRegistered === null)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Loading ...
      </div>
    );
  if (
    isRegistered === false &&
    currentPath !== "/registration" &&
    connectedToWallet
  )
    redirect("/registration");
  if (!connectedToWallet && currentPath !== "/login") redirect("/login");

  return children;
};

export default Layout;
