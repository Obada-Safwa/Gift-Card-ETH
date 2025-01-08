"use client";

import Button from "@/components/button";
import Form from "@/components/form";
import { connectWallet } from "@/utils/web3";

export default function Login() {
  const onClick = async () => {
    const addresses = await connectWallet();
    localStorage.setItem("addresses", JSON.stringify(addresses));
    location.reload();
  };

  return (
    <div className="w-full flex items-center justify-center flex-col h-screen">
      <Form title="Login">
        <Button type="Submit" title="Connect To MetaMask" onClick={onClick} />
      </Form>
    </div>
  );
}
