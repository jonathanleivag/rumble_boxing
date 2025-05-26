"use client";

import { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/utils/motionEffect.util";

const HomeComponent: FC = () => {
  return (
    <div id="hero" className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute object-cover w-full h-full"
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-[#0f0f0f]/50 to-[#240808]/40 z-10">
        <div className="absolute inset-0 bg-[url('/boxing-pattern.svg')] opacity-5 bg-repeat"></div>
      </div>

      <div className="absolute bottom-8 right-8 z-10 w-36 animate-pulse-slow pointer-events-none">
        <Image
          src="/logo.webp"
          alt="Rumble Boxing Logo"
          width={800}
          height={250}
          className="w-full h-auto filter brightness-110"
          priority
        />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-20 h-full flex flex-col justify-center items-center px-4 sm:px-6 pt-20"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-knockout text-5xl md:text-7xl lg:text-9xl mb-4 text-center text-shadow-lg"
        >
          RUMBLE BOXING CLUB
        </motion.h1>
        <motion.div
          variants={fadeInUp}
          className="text-banner text-xl md:text-2xl mb-8 transform -rotate-1 text-shadow-md"
        >
          ENTRENA COMO UN CAMPEÓN
        </motion.div>
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 mt-6"
        >
          <button className="bg-[#e02020] hover:bg-[#c01818] transition-all duration-300 font-oswald text-lg uppercase tracking-wider py-3 px-8 rounded-md hover:shadow-[0_0_15px_rgba(224,32,32,0.5)] transform hover:-translate-y-1">
            Programa una clase
          </button>
          <button className="border-2 border-white hover:border-[#e02020] hover:text-[#e02020] transition-all duration-300 font-oswald text-lg uppercase tracking-wider py-3 px-8 rounded-md backdrop-blur-sm bg-black/20 text-shadow-sm">
            Conoce más
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomeComponent;
