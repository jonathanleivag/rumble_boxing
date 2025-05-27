import { ChildrenProps } from "@/type";
import { FC } from "react";
import Navbar from "../shared/navbar.shared.component";
import FooterSharedComponent from "../shared/footer.shared.component";

const BodyLayoutComponent: FC<ChildrenProps> = ({ children }) => {
  return (
    <body className="font-montserrat bg-boxing-black text-boxing-white">
      <Navbar />
      {children}
      <FooterSharedComponent />
    </body>
  );
};

export default BodyLayoutComponent;
