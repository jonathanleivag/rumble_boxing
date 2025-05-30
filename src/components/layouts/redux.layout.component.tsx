import { ChildrenProps } from "@/type";
import { FC } from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";

const ReduxLayoutComponent: FC<ChildrenProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxLayoutComponent;
