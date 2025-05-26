"use client";

import { motion } from "framer-motion";
import { FC } from "react";
import Image from "next/image";
import { CuerdaSharedComponentProps } from "@/type";

const CuerdaSharedComponent: FC<CuerdaSharedComponentProps> = ({ src }) => {
  return (
    <div className="relative w-full my-5 py-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full"
      >
        <div className="relative w-full overflow-hidden">
          <div className="relative w-[110%] -mx-[5%]">
            <Image
              src={src}
              alt="Cuerda de ring de boxeo"
              width={1600}
              height={80}
              className="w-full object-cover h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
            <motion.div
              animate={{
                scaleY: [1, 0.98, 1, 1.02, 1],
                y: [0, 1, 0, -1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-transparent"
            ></motion.div>
            <motion.div
              animate={{
                opacity: [0, 0.1, 0],
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 2,
              }}
              className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            ></motion.div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-16 bg-[#0f0f0f] rounded-r-md"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-16 bg-[#0f0f0f] rounded-l-md"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CuerdaSharedComponent;
