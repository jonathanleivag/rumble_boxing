import { ChildrenProps } from "@/type";
import { FC } from "react";
import DashboardLayout from "@/components/dashboard/layout.component";

const LayoutDashboard: FC<ChildrenProps> = ({ children }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default LayoutDashboard;
