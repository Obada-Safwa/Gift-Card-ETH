import { atom } from "recoil";

export const toasterState = atom({
  key: "toasterState",
  default: {
    open: false,
    message: "",
    severity: "success",
  },
});
