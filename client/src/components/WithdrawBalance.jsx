"use client";

import Button from "@/components/button";
import { getContract } from "@/utils/web3";
import { useEffect, useState } from "react";
import { getFromLocalStorage } from "@/utils/help";
import { ethers } from "ethers";
import LoadingOverlay from "./LoadingOverlay";

const WithdrawBalance = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    const contract = await getContract();
    const addresses = getFromLocalStorage("addresses");
    if (!addresses) return;

    await contract.methods.withdrawBalance().send({
      from: addresses[0],
    });
    const balance = await contract.methods.contractBalance().call({
      from: addresses[0],
    });

    setBalance(balance);
    setLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      const contract = await getContract();
      const addresses = getFromLocalStorage("addresses");
      if (!addresses) return;

      const balance = await contract.methods.contractBalance().call({
        from: addresses[0],
      });

      setBalance(balance);
    };

    init();
  }, []);

  return (
    <div className="flex items-center justify-between p-4 mb-4 bg-purple-100 rounded-lg shadow">
      <LoadingOverlay open={loading} />
      <div className="text-lg font-semibold text-purple-800">
        Contract Balance: {ethers.formatUnits(balance, "ether")} ETH
      </div>
      <Button
        title="Withdraw Balance"
        variant="contained"
        onClick={onClick}
        className="px-4 py-2 hover:bg-purple-700 transition-all duration-300"
      />
    </div>
  );
};

export default WithdrawBalance;
