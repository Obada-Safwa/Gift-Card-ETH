"use client";

import { RecoilRoot } from "recoil";
import Toaster from "./toaster";

const RecoilWrapper = ({ children }) => {
  return (
    <RecoilRoot>
      {children}
      <Toaster />
    </RecoilRoot>
  );
};

export default RecoilWrapper;
