"use client";
import { FC, useState, useEffect } from "react";
import { ChildrenProps } from "@/type";
import Sidebar from "@/components/dashboard/sidebar.component";
import { motion } from "framer-motion";

const DashboardLayout: FC<ChildrenProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <div className="bg-[#0f0f0f] min-h-screen overflow-hidden">
      <Sidebar isMobile={isMobile} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`min-h-screen ${
          isMobile ? "pb-32" : "ml-20 md:ml-64"
        } transition-all duration-300`}
      >
        <div className="p-3 md:p-6">{children}</div>
      </motion.main>
    </div>
  );
};

export default DashboardLayout;
