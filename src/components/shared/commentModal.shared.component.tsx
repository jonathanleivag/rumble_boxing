"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FC, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { CommentModalProps, ICommentData } from "@/type";
import { textRating } from "@/utils/rating.util";
import { addComment } from "@/lib/db/comment/actions";

const CommentModal: FC<CommentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  quote,
  rating: valueRating,
  edit,
}) => {
  const [rating, setRating] = useState<number>(valueRating);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>(quote);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      let data: ICommentData;
      if (!edit) {
        data = await addComment({
          name: session?.user?.name || "Usuario Anónimo",
          quote: comment,
          image: session?.user?.image || "",
          textRating: textRating(rating),
          email: session?.user?.email || "",
          rating,
        });
      } else {
        data = {} as ICommentData;
      }

      onSubmit(data);
      setIsSubmitting(false);
      onClose();
      setRating(5);
      setComment("");
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.2 }}
          className="w-full max-w-md mx-4 bg-[#0f0f0f] border border-accent-dark/30 rounded-xl overflow-hidden shadow-2xl"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bebas text-white text-2xl">
                COMPARTE TU EXPERIENCIA
              </h2>
              <button
                className="text-accent-medium hover:text-white transition-colors"
                onClick={onClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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

            {session && (
              <div className="flex items-center mb-6 border-b border-accent-dark/30 pb-4">
                {session.user?.image ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "Usuario"}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <span className="font-bebas text-white">
                      {session.user?.name?.charAt(0) || "U"}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-white font-oswald">
                    {session.user?.name || "Usuario"}
                  </p>
                  <p className="text-accent-medium text-xs">
                    {session.user?.email}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-oswald text-white mb-2">
                  CALIFICACIÓN
                </label>
                <div className="flex flex-col space-y-2">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="focus:outline-none transition-transform duration-200 hover:scale-110 relative"
                        aria-label={`Calificar con ${star} ${
                          star === 1 ? "estrella" : "estrellas"
                        }`}
                      >
                        <motion.div
                          whileTap={{ scale: 0.8 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 10,
                          }}
                        >
                          <svg
                            className={`w-8 h-8 ${
                              (
                                hoverRating !== null
                                  ? star <= hoverRating
                                  : star <= rating
                              )
                                ? "text-primary"
                                : "text-accent-dark"
                            } transition-colors duration-200`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        </motion.div>
                      </button>
                    ))}
                  </div>
                  <p className="text-sm font-montserrat text-accent-medium">
                    {hoverRating !== null ? (
                      <span className="text-primary transition-colors duration-200">
                        {textRating(hoverRating)}
                      </span>
                    ) : (
                      <span className="text-primary">{textRating(rating)}</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="comment"
                  className="block font-oswald text-white mb-2"
                >
                  TU EXPERIENCIA
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Cuéntanos cómo ha sido tu experiencia en RUMBLE BOXING CLUB..."
                  className="w-full h-32 bg-accent-dark/40 border border-accent-dark/50 rounded-lg p-3 text-white placeholder-accent-medium focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-montserrat resize-none"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="font-oswald bg-accent-dark/70 hover:bg-accent-dark text-white py-2 px-5 rounded-full text-sm uppercase tracking-wider transition-all duration-300"
                >
                  CANCELAR
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="font-oswald bg-primary hover:bg-primary-dark text-white py-2 px-5 rounded-full text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center">
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                        {edit ? "ACTUALIZANDO..." : "ENVIANDO..."}
                      </>
                    ) : edit ? (
                      "EDITAR COMENTARIO"
                    ) : (
                      "ENVIAR COMENTARIO"
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
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CommentModal;
