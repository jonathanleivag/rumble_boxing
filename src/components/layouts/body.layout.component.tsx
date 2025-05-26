import { ChildrenProps } from "@/type";
import { FC } from "react";
import Navbar from "../shared/navbar.shared.component";
import FooterSharedComponent from "../shared/footer.shared.component";

const BodyLayoutComponent: FC<ChildrenProps> = ({ children }) => {
  return (
    <body className="font-montserrat bg-boxing-black text-boxing-white">
      <Navbar />
      <main className="min-h-screen bg-[#0f0f0f] text-white overflow-hidden">
        {children}
      </main>
      <FooterSharedComponent />
    </body>
  );
};

export default BodyLayoutComponent;
