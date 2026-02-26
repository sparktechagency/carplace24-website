"use client";

import GoogleTranslate from "@/components/ui/GoogleTranslate";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

const CustomProvider = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Provider store={store}>
        <Toaster />
        {children}
      </Provider>
      <GoogleTranslate />
    </div>
  );
};

export default CustomProvider;
