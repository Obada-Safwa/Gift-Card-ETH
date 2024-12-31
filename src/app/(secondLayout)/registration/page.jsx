"use client";

import { useState, useEffect } from "react";
import Button from "@/components/button";
import Form from "@/components/form";
import FormChildren from "@/components/formchildren";
import { GENDER_OPTIONS } from "@/utils/constants";
import { getContract } from "@/utils/web3";
import { redirect } from "next/navigation";
import { getFromLocalStorage } from "@/utils/help";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    gender: 0,
  });
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const init = async () => {
      const addresses = getFromLocalStorage("addresses");

      const contract = await getContract();
      const registered = await contract.methods.isRegistered().call({
        from: addresses[0],
      });
      if (registered) redirect("/");
    };

    init();
  }, []);

  const handleSubmit = async () => {
    setBlocked(true);
    const contract = await getContract();
    const addresses = getFromLocalStorage("addresses");
    await contract.methods
      .registration(formData.name, formData.gender)
      .send({ from: addresses[0] });

    const registered = await contract.methods.isRegistered().call({
      from: addresses[0],
    });
    setBlocked(false);

    if (registered) redirect("/");
  };

  const onValueChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full flex items-center justify-center flex-col h-screen">
      <LoadingOverlay open={blocked} />
      <Form title="Create Account" onSubmit={handleSubmit}>
        <div className="mb-4">
          <FormChildren
            type="textField"
            label="name"
            stateName="nameInput"
            value={formData.name}
            onChange={onValueChange}
          />
        </div>

        <FormChildren
          type="select"
          label="gender"
          stateName="genderInput"
          value={formData.gender}
          onChange={onValueChange}
          menuItems={GENDER_OPTIONS}
        />

        <div className="mb-1" />
        <div className="flex items-center justify-center gap-2 ">
          <Button title="Submit" type="submit" />
        </div>
      </Form>
    </div>
  );
}
