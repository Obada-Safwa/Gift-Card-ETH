"use client";

import React from "react";
import Alert from "@mui/material/Alert";
import { useRecoilState } from "recoil";
import { toasterState } from "@/store/atoms/toaster";

export default function Toaster() {
  const [toaster, setToaster] = useRecoilState(toasterState);

  return (
    <Alert
      onClose={() => {
        setToaster({
          open: false,
          message: "",
          severity: "success",
        });
      }}
      open={toaster.open}
      variant="filled"
      severity={toaster.severity}
      className="absolute top-20 right-10"
    >
      {toaster.message || "This is a filled success Alert."}
    </Alert>
  );
}
