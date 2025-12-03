"use client";

import { motion } from "framer-motion";

const CarLoader = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background select-none">
      <div className="flex flex-col items-center gap-6">
        {/* Modern Smooth Rotating Loader */}
        <motion.svg
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-20 w-20 text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            className="opacity-30"
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.8, 1, 0.8] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
          <path d="M12 2v4M12 22v-4M2 12h4M22 12h-4" />
          <circle cx="12" cy="12" r="3" />
        </motion.svg>

        {/* Smooth Fade Pulse Text */}
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut",
          }}
          className="text-lg font-medium tracking-wide text-primary"
        >
          Carplace24 ...
        </motion.div>
      </div>
    </div>
  );
};

export default CarLoader;
