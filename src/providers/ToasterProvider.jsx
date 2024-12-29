"use client";

import { useState } from "react";
import { ToasterContext } from "@/contexts/ToasterContext";
import Toaster from "@/components/toaster";

export const ToasterProvider = ({ children }) => {
  const [toaster, setToaster] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const toggleToaster = (message, severity = "success", open = true) => {
    setToaster({
      open,
      message,
      severity,
    });
  };

  return (
    <ToasterContext.Provider
      value={{
        toaster,
        toggleToaster,
      }}
    >
      {children}
      <Toaster />
    </ToasterContext.Provider>
  );
};

export default ToasterProvider;
