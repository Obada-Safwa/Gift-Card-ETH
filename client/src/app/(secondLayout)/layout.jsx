"use client";

import LoadingOverlay from "@/components/LoadingOverlay";
import { getFromLocalStorage } from "@/utils/help";
import { getContract } from "@/utils/web3";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {
  const currentPath = usePathname();
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const addresses = getFromLocalStorage("addresses");

  useEffect(() => {
    const init = async () => {
      if (addresses && addresses.length > 0) {
        const contract = await getContract();
        const registered = await contract.methods.isRegistered().call({
          from: addresses[0],
        });
        setIsRegistered(registered);
      }
      setLoading(false);
    };

    init();
  }, []);

  if (loading) return <LoadingOverlay open={loading} />;

  const loggedIn = Boolean(addresses && addresses.length > 0);
  const isLoggedInAndRegistered = loggedIn && isRegistered;

  const isRegistration = currentPath === "/registration";
  const isLogin = currentPath === "/login";

  const isLoginOrRegistration = isRegistration || isLogin;

  if (!loggedIn && !isLogin) redirect("/login");
  if (!isRegistered && loggedIn && !isRegistration) redirect("/registration");

  if (isLoggedInAndRegistered && isLoginOrRegistration) redirect("/");

  return children;
};

export default Layout;
