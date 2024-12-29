"use client";

import { useState } from "react";
import Button from "../../components/button";
import Form from "../../components/form";
import FormChildren from "../../components/formchildren";

export default function Registration() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Submitting registration with:", { name, gender });
  };

  const handleLinkAccount = () => {
    // Handle link account logic here
    console.log("Linking account...");
  };

  return (
    <div className="w-full flex items-center justify-center flex-col h-screen">
      <Form title="Create Account" onSubmit={handleSubmit}>
        <div className="mb-4">
          <FormChildren
            type="textField"
            label="Name"
            stateName="nameInput"
            value={name}
            onNameChange={setName}
          />
        </div>

        <FormChildren
          type="select"
          value={gender}
          onGenderChange={setGender}
        />

        <div className="mb-1" />
        <div className="flex items-center justify-center gap-2 ">
          <Button title="Link Account" type="button" onClick={handleLinkAccount} />
          <Button title="Submit" type="submit" />
        </div>
      </Form>
    </div>
  );
}
