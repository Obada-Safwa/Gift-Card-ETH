"use client";

import { useState } from "react";
import Button from "@/components/button";
import Form from "@/components/form";
import FormChildren from "@/components/formchildren";
import { GENDER_OPTIONS } from "@/utils/constants";
import { getContract } from "@/utils/web3";
import { useRouter } from "next/navigation";
import { getFromLocalStorage } from "@/utils/help";

export default function Registration() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
  });

  const handleSubmit = async () => {
    console.log("Name:", formData.name);
    console.log("Gender:", formData.gender);
    const contract = await getContract();
    const result = await contract.methods
      .registration(formData.name, formData.gender)
      .send({ from: getFromLocalStorage("addresses")[0] });
    console.log(result);
    router.push("/");
  };

  const onValueChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full flex items-center justify-center flex-col h-screen">
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
