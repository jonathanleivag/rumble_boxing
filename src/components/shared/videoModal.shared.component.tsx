import { VideoShareModalProps } from "@/type";
import { motion } from "framer-motion";
import { FC, useRef } from "react";

const VideoShareModal: FC<VideoShareModalProps> = ({ setIsModalOpen }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const closeModal = () => {
    setIsModalOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-md z-50"
        onClick={closeModal}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-4 md:inset-16 bg-[#0f0f0f] rounded-2xl overflow-hidden z-50 flex flex-col shadow-2xl border border-primary/20"
      >
        <div className="p-4 flex justify-between items-center bg-gradient-to-r from-accent-dark to-[#0f0f0f] border-b border-accent-dark/30">
          <h3 className="font-bebas text-xl text-white tracking-wider pl-2">
            RUMBLE BOXING <span className="text-primary">EXPERIENCE</span>
          </h3>
          <button
            onClick={closeModal}
            className="w-10 h-10 rounded-full bg-accent-dark hover:bg-primary flex items-center justify-center transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 p-4 relative flex items-center justify-center bg-black/20">
          <video
            ref={videoRef}
            className="max-w-full max-h-full rounded-lg"
            controls
            controlsList="nodownload"
            autoPlay
            preload="auto"
            playsInline
            style={{
              maxHeight: "calc(100vh - 180px)",
              width: "auto",
              height: "auto",
            }}
          >
            <source
              src="https://res.cloudinary.com/dq8fpb695/video/upload/v1748260489/rumble/hcy5v5c2deevkaaogdi8.mp4"
              type="video/mp4"
            />
            Tu navegador no soporta videos HTML5.
          </video>
        </div>
      </motion.div>
    </>
  );
};

export default VideoShareModal;
