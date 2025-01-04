"use client";

import { Alert, Snackbar } from "@mui/material";
import { useToaster } from "@/store/contexts/ToasterContext";

export default function Toaster() {
  const { toaster, toggleToaster } = useToaster();

  const handleClose = () => {
    toggleToaster("", "", false);
  };

  return (
    <Snackbar
      open={toaster.open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={toaster.severity}>
        {toaster.message}
      </Alert>
    </Snackbar>
  );
}
