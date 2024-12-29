"use client";

import { createContext, useContext } from "react";

export const ToasterContext = createContext({
  toaster: {
    open: false,
    message: "",
    severity: "success",
  },
  toggleToaster: () => {},
});

export const useToaster = () => {
  return useContext(ToasterContext);
};

export default ToasterContext;
