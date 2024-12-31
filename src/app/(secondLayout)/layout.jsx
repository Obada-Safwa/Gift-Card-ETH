"use client";

import { getFromLocalStorage } from "@/utils/help";
import { getContract } from "@/utils/web3";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {
  const currentPath = usePathname();
  const [isRegistered, setIsRegistered] = useState(true);
  const addresses = getFromLocalStorage("addresses");

  useEffect(() => {
    const init = async () => {
      if (addresses && addresses.length > 0) {
        const contract = await getContract();
        const registered = await contract.methods.isRegistered().call({
          from: addresses[0],
        });
        setIsRegistered(registered);
      } else {
        setIsRegistered(false);
      }
    };

    init();
  }, []);

  const loggedIn = addresses && addresses.length > 0;
  const isLoggedInAndRegistered = !(!loggedIn && !isRegistered);

  const isRegistration = currentPath === "/registration";
  const isLoginPage = currentPath === "/login";

  if (!isLoggedInAndRegistered && !isLoginPage) redirect("/login");
  if (!isLoggedInAndRegistered && isLoginPage) return children;

  if (!isRegistered && loggedIn && !isRegistration) redirect("/registration");

  return children;
};

export default Layout;
