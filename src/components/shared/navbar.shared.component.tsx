"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { fadeInUp, staggerContainer } from "@/utils/motionEffect.util";

const Navbar: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ["hero", "about", "classes", "trainers", "pricing"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveLink(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sectionId: string
  ) => {
    e.preventDefault();
    const section = document.querySelector(sectionId);
    if (section) {
      if (mobileMenuOpen) setMobileMenuOpen(false);

      setActiveLink(sectionId.substring(1));

      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-2 bg-[#0f0f0f]/85 backdrop-blur-md shadow-lg"
            : "py-4 bg-transparent"
        }`}
      >
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#e02020]/30 to-transparent"></div>

        {isScrolled && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#e02020]/20 to-transparent"
            ></motion.div>

            <div className="absolute top-0 left-0 right-0 h-full overflow-hidden pointer-events-none">
              <div className="flex justify-around">
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: i % 2 === 0 ? "100%" : "70%" }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.05,
                      ease: "easeOut",
                    }}
                    className={`w-[0.5px] bg-gradient-to-b ${
                      i % 3 === 0 ? "from-[#e02020]/10" : "from-[#e02020]/5"
                    } to-transparent opacity-40`}
                  ></motion.div>
                ))}
              </div>
            </div>

            <motion.div
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#e02020]/20"
            ></motion.div>
          </>
        )}

        <div className="container mx-auto px-4 flex justify-between items-center relative">
          <Link href="/" className="flex items-center group relative z-10">
            <Image
              src="/logo.webp"
              alt="Rumble Boxing"
              width={isScrolled ? 28 : 32}
              height={isScrolled ? 28 : 32}
              className={`block sm:hidden h-8 w-auto transition-all duration-300 ${
                isScrolled ? "h-7" : "h-8"
              } group-hover:filter group-hover:drop-shadow-[0_0_8px_rgba(224,32,32,0.6)]`}
            />

            <Image
              src="/logo.webp"
              alt="Rumble Boxing"
              width={isScrolled ? 28 : 32}
              height={isScrolled ? 28 : 32}
              className={`hidden sm:block h-8 md:h-10 w-auto transition-all duration-300 ${
                isScrolled ? "h-7 md:h-9" : "h-8 md:h-10"
              } group-hover:filter group-hover:drop-shadow-[0_0_8px_rgba(224,32,32,0.6)]`}
            />

            <motion.div
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -inset-1 rounded-full bg-[#e02020]/10 filter blur-md -z-10"
            ></motion.div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 relative">
            <Link
              href="#"
              className={`font-oswald text-white hover:text-primary transition-colors text-sm uppercase tracking-wider relative ${
                activeLink === "hero" ? "text-primary" : ""
              }`}
              onClick={(e) => scrollToSection(e, "#hero")}
            >
              Inicio
              {activeLink === "hero" && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
            <Link
              href="#about"
              className={`font-oswald text-white hover:text-primary transition-colors text-sm uppercase tracking-wider relative ${
                activeLink === "about" ? "text-primary" : ""
              }`}
              onClick={(e) => scrollToSection(e, "#about")}
            >
              Sobre Nosotros
              {activeLink === "about" && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
            <Link
              href="#classes"
              className={`font-oswald text-white hover:text-primary transition-colors text-sm uppercase tracking-wider relative ${
                activeLink === "classes" ? "text-primary" : ""
              }`}
              onClick={(e) => scrollToSection(e, "#classes")}
            >
              Clases
              {activeLink === "classes" && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
            <Link
              href="#trainers"
              className={`font-oswald text-white hover:text-primary transition-colors text-sm uppercase tracking-wider relative ${
                activeLink === "trainers" ? "text-primary" : ""
              }`}
              onClick={(e) => scrollToSection(e, "#trainers")}
            >
              Entrenadores
              {activeLink === "trainers" && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
            <Link
              href="#pricing"
              className={`font-oswald text-white hover:text-primary transition-colors text-sm uppercase tracking-wider relative ${
                activeLink === "pricing" ? "text-primary" : ""
              }`}
              onClick={(e) => scrollToSection(e, "#pricing")}
            >
              Precios
              {activeLink === "pricing" && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
            <div className="flex items-center space-x-3">
              <Link
                href="#call"
                className="font-oswald bg-primary hover:bg-primary-dark text-white py-2 px-5 rounded-full text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 relative overflow-hidden group"
                onClick={(e) => scrollToSection(e, "#call")}
              >
                <span className="relative z-10">Comentarios</span>
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
              </Link>
            </div>
          </nav>

          <button
            className="md:hidden text-white focus:outline-none relative z-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <motion.div
              initial={false}
              animate={mobileMenuOpen ? "open" : "closed"}
              className="w-6 h-6 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.div>

            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.3, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute -inset-2 rounded-full bg-[#e02020]/20 filter blur-sm -z-10"
              />
            )}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[60px] left-0 right-0 bg-[#0f0f0f]/95 backdrop-blur-lg z-40 shadow-xl border-t border-accent-dark/20 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#e02020]/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#e02020]/30 to-transparent"></div>

            <div className="container mx-auto py-6 relative">
              <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-gradient-to-b from-[#e02020]/20 via-transparent to-[#e02020]/20 opacity-50"></div>
              <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-gradient-to-b from-[#e02020]/20 via-transparent to-[#e02020]/20 opacity-50"></div>

              <nav className="flex flex-col space-y-4 px-4">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeInUp}>
                    <Link
                      href="#"
                      className={`font-oswald text-white hover:text-primary transition-colors text-lg uppercase tracking-wider py-2 border-b border-accent-dark/20 block relative ${
                        activeLink === "hero" ? "text-primary" : ""
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Inicio
                      {activeLink === "hero" && (
                        <motion.div
                          layoutId="mobileActiveIndicator"
                          className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Link
                      href="#about"
                      className={`font-oswald text-white hover:text-primary transition-colors text-lg uppercase tracking-wider py-2 border-b border-accent-dark/20 block relative ${
                        activeLink === "about" ? "text-primary" : ""
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sobre Nosotros
                      {activeLink === "about" && (
                        <motion.div
                          layoutId="mobileActiveIndicator"
                          className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Link
                      href="#classes"
                      className={`font-oswald text-white hover:text-primary transition-colors text-lg uppercase tracking-wider py-2 border-b border-accent-dark/20 block relative ${
                        activeLink === "classes" ? "text-primary" : ""
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Clases
                      {activeLink === "classes" && (
                        <motion.div
                          layoutId="mobileActiveIndicator"
                          className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Link
                      href="#trainers"
                      className={`font-oswald text-white hover:text-primary transition-colors text-lg uppercase tracking-wider py-2 border-b border-accent-dark/20 block relative ${
                        activeLink === "trainers" ? "text-primary" : ""
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Entrenadores
                      {activeLink === "trainers" && (
                        <motion.div
                          layoutId="mobileActiveIndicator"
                          className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Link
                      href="#pricing"
                      className={`font-oswald text-white hover:text-primary transition-colors text-lg uppercase tracking-wider py-2 border-b border-accent-dark/20 block relative ${
                        activeLink === "pricing" ? "text-primary" : ""
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Precios
                      {activeLink === "pricing" && (
                        <motion.div
                          layoutId="mobileActiveIndicator"
                          className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Link
                      href="#call"
                      className="font-oswald bg-primary hover:bg-primary-dark text-white py-3 px-5 rounded-full text-center text-lg uppercase tracking-wider transition-all duration-300 mt-2 block relative overflow-hidden group"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="relative z-10">Comentarios</span>
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
                    </Link>
                  </motion.div>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
