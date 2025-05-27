"use client";
import { signIn, useSession } from "next-auth/react";
import { motion } from "framer-motion";

export default function LoginButton() {
  const { status } = useSession();
  const isLoading = status === "loading";

  if (isLoading) {
    return (
      <button
        className="font-oswald bg-accent-dark text-white py-2 px-4 rounded-full text-sm uppercase tracking-wider transition-all duration-300 flex items-center space-x-2 opacity-70"
        disabled
      >
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        <span>Cargando...</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/#call" })}
      className="font-oswald bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-full text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 relative overflow-hidden group cursor-pointer"
    >
      <span className="relative z-10 flex items-center">
        Iniciar Sesión con Google
      </span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#e02020] to-[#ff4d4d] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          x: ["0%", "100%", "0%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </button>
  );
}
