export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const iconVariants = {
  initial: { opacity: 0, x: -15, scale: 0.8 },
  animate: (custom: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: 1.2 + custom * 0.2,
      duration: 0.8,
      type: "spring",
      stiffness: 100,
    },
  }),
  hover: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
};

export const rippleVariants = {
  initial: { opacity: 0, scale: 0.3 },
  animate: {
    opacity: [0, 0.5, 0],
    scale: 1.8,
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      times: [0, 0.4, 1],
    },
  },
};
