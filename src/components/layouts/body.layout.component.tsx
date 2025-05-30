import { ChildrenProps } from "@/type";
import { FC } from "react";
import Navbar from "../shared/navbar.shared.component";
import FooterSharedComponent from "../shared/footer.shared.component";

const BodyLayoutComponent: FC<ChildrenProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <FooterSharedComponent />
    </>
  );
};

export default BodyLayoutComponent;
