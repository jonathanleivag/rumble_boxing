"use client";
import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LoginPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Credenciales inválidas. Por favor intenta de nuevo.");
        setIsLoading(false);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log("Error during sign-in:", error);

      setError(
        "Ocurrió un error al iniciar sesión. Intenta de nuevo más tarde."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f0f] px-4 py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-[#0f0f0f]/90">
        <div className="absolute inset-0 bg-[url('/boxing-pattern.svg')] opacity-5 mix-blend-overlay"></div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0f0f0f] to-transparent pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.webp"
              alt="Rumble Boxing"
              width={80}
              height={80}
              className="mx-auto mb-4 filter drop-shadow-[0_0_8px_rgba(224,32,32,0.6)]"
            />
          </Link>
          <h1 className="font-bebas text-4xl text-white mb-2">
            ACCEDE A TU CUENTA
          </h1>
          <p className="text-accent-medium font-montserrat">
            Ingresa para reservar clases y más
          </p>
        </div>

        <div className="bg-gradient-to-r from-accent-dark/80 to-[#0f0f0f]/80 p-8 rounded-2xl backdrop-blur-sm border border-accent-dark/30 shadow-xl">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-primary/20 border border-primary/30 text-white rounded-lg px-4 py-3 mb-6"
            >
              <p className="font-montserrat text-sm">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block font-oswald text-white mb-2"
              >
                CORREO ELECTRÓNICO
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-accent-dark/40 border border-accent-dark/50 rounded-lg p-3 text-white placeholder-accent-medium focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-montserrat"
                placeholder="tu@correo.com"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="font-oswald text-white">
                  CONTRASEÑA
                </label>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-accent-dark/40 border border-accent-dark/50 rounded-lg p-3 text-white placeholder-accent-medium focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-montserrat"
                placeholder="Tu contraseña"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full font-oswald bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-full text-lg uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 relative overflow-hidden group cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    INICIANDO SESIÓN...
                  </>
                ) : (
                  "INICIAR SESIÓN"
                )}
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
          </form>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-accent-medium hover:text-white transition-colors font-montserrat text-sm flex items-center justify-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver a la página principal
          </Link>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f0f0f] to-transparent pointer-events-none"></div>
    </div>
  );
};

export default LoginPage;
