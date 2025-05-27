import { ChildrenProps } from "@/type";
import { FC } from "react";
import Navbar from "../shared/navbar.shared.component";
import FooterSharedComponent from "../shared/footer.shared.component";
import SessionProvider from "@/components/auth/session-provider";

const BodyLayoutComponent: FC<ChildrenProps> = ({ children }) => {
  return (
    <SessionProvider>
      <body className="font-montserrat bg-boxing-black text-boxing-white">
        <Navbar />
        {children}
        <FooterSharedComponent />
      </body>
    </SessionProvider>
  );
};

export default BodyLayoutComponent;
