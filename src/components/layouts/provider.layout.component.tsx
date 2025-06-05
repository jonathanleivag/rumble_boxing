"use client";

import { ChildrenProps } from "@/type";
import { FC } from "react";
import ReduxLayoutComponent from "./redux.layout.component";
import SessionProvider from "@/components/auth/session-provider";
import { Toaster } from "@/components/shared/toaster.shared.component";

const ProviderLayoutComponent: FC<ChildrenProps> = ({ children }) => {
  return (
    <ReduxLayoutComponent>
      <SessionProvider>
        {children}
        <Toaster />
      </SessionProvider>
    </ReduxLayoutComponent>
  );
};

export default ProviderLayoutComponent;
