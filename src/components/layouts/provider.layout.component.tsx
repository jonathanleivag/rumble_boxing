"use client";

import { ChildrenProps } from "@/type";
import { FC } from "react";
import ReduxLayoutComponent from "./redux.layout.component";
import SessionProvider from "@/components/auth/session-provider";

const ProviderLayoutComponent: FC<ChildrenProps> = ({ children }) => {
  return (
    <ReduxLayoutComponent>
      <SessionProvider>{children}</SessionProvider>
    </ReduxLayoutComponent>
  );
};

export default ProviderLayoutComponent;
