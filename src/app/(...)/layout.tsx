import BodyLayoutComponent from "@/components/layouts/body.layout.component";
import { ChildrenProps } from "@/type";
import { FC } from "react";

const LayoutHome: FC<ChildrenProps> = ({ children }) => {
  return <BodyLayoutComponent>{children}</BodyLayoutComponent>;
};

export default LayoutHome;
