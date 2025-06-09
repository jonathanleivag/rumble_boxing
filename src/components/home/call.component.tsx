"use client";

import { env } from "@/lib/env";
import { fadeInUp, staggerContainer } from "@/utils/motionEffect.util";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FC, useState, useEffect, useCallback } from "react";
import VideoShareModal from "../shared/videoModal.shared.component";
import CommentModal from "../shared/commentModal.shared.component";
import LoginButton from "../auth/login-button";
import { signOut, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { getComments, oneComment } from "@/lib/db/actions/comment.action";
import {
  addComment,
  editComment,
  initialComment,
} from "@/lib/redux/features/comment/comment.slice";
import { ICommentData, StatusComment } from "@/type";
import { textRating } from "@/utils/rating.util";

const CallComponent: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [quote, setQuote] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [status, setStatus] = useState<StatusComment | "">("");
  const [edit, setEdit] = useState<boolean>(false);
  const { data: session } = useSession();
  const comments = useAppSelector((state) => state.comment.comments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const commentsData = await getComments("approved");
        dispatch(initialComment(commentsData));
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    void dataFetch();
    return () => {};
  }, [dispatch]);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const openCommentModal = async () => {
    if (session?.user?.email) {
      const data = await oneComment(session?.user?.email);
      if (data) {
        setQuote(data.quote);
        setRating(data.rating);
        setStatus(data.status as StatusComment);
        setEdit(true);
      } else {
        setQuote("");
        setStatus("");
        setRating(5);
        setEdit(false);
      }
    }
    setIsCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  const handleCommentSubmit = (commentData: ICommentData) => {
    console.log({ commentData });

    if (session?.user) {
      if (!edit) {
        dispatch(addComment(commentData));
        setCurrentTestimonial(comments.length);
      } else {
        dispatch(editComment(commentData));
      }
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }

    closeCommentModal();
  };

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % comments.length);
  }, [comments.length]);

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + comments.length) % comments.length
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        nextTestimonial();
      }, 5000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoPlaying, currentTestimonial, nextTestimonial]);

  return (
    <section
      id="call"
      className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-[#0f0f0f]/90">
        <div className="absolute inset-0 bg-[url('/boxing-pattern.svg')] opacity-5 mix-blend-overlay"></div>
      </div>

      <div className="absolute right-0 bottom-0 w-1/3 h-2/3 opacity-10">
        <div className="w-full h-full bg-[url('/boxing-gloves.svg')] bg-no-repeat bg-contain bg-right-bottom"></div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="text-center">
          <motion.div variants={fadeInUp} className="mb-6 inline-block">
            <span className="inline-block px-6 py-2 rounded-full border-2 border-primary text-primary font-oswald text-sm tracking-widest">
              EMPIEZA HOY
            </span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="font-bebas text-5xl md:text-7xl text-white mb-8 leading-tight"
          >
            ¿LISTO PARA{" "}
            <span className="text-primary relative inline-block">
              SUBIR AL RING
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/30"></span>
            </span>
            ?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="font-montserrat text-accent-light text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Prueba una clase gratuita y experimenta la energía, la intensidad y
            la comunidad que hacen de RUMBLE BOXING un lugar único para
            transformar tu cuerpo y mente.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              href={`https://wa.me/${
                env.NEXT_PUBLIC_PHONE
              }?text=${encodeURIComponent(env.NEXT_PUBLIC_MESSAGE)}`}
              target="_blank"
              className="bg-primary hover:bg-primary-dark transition-all duration-300 font-oswald text-xl uppercase tracking-wider py-4 px-10 rounded-full text-white shadow-xl shadow-primary/20 hover:shadow-primary/40 transform hover:translate-y-[-2px]"
            >
              PROGRAMA TU CLASE GRATIS
            </Link>
            <button
              onClick={openModal}
              className="inline-flex items-center justify-center gap-2 font-oswald text-white hover:text-primary transition-colors cursor-pointer"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M10 8L16 12L10 16V8Z" fill="currentColor" />
              </svg>
              <span>VER VIDEO INTRODUCTORIO</span>
            </button>
          </motion.div>
        </div>

        <AnimatePresence>
          {isModalOpen && <VideoShareModal setIsModalOpen={setIsModalOpen} />}
        </AnimatePresence>

        <AnimatePresence>
          {isCommentModalOpen && (
            <CommentModal
              isOpen={isCommentModalOpen}
              onClose={closeCommentModal}
              onSubmit={handleCommentSubmit}
              quote={quote}
              rating={rating}
              edit={edit}
              status="pending"
            />
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-20 max-w-4xl mx-auto bg-gradient-to-r from-accent-dark/80 to-[#0f0f0f]/80 p-8 rounded-2xl backdrop-blur-sm border border-accent-dark/30"
        >
          <AnimatePresence mode="wait">
            {comments.length > 0 && comments[currentTestimonial] && (
              <motion.div
                key={comments[currentTestimonial]._id?.toString()}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-accent-medium flex-shrink-0 overflow-hidden">
                  {comments[currentTestimonial]?.image ? (
                    <Image
                      src={comments[currentTestimonial].image}
                      alt={comments[currentTestimonial].name}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/20">
                      <span className="font-bebas text-white text-xl">
                        {comments[currentTestimonial].name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) =>
                      i < comments[currentTestimonial].rating ? (
                        <svg
                          key={i}
                          className="w-4 h-4 text-primary"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ) : (
                        <svg
                          key={i}
                          className="w-4 h-4 text-primary"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      )
                    )}
                  </div>
                  <div className="text-primary mb-5">
                    <p className="text-xs">
                      {textRating(comments[currentTestimonial].rating)}{" "}
                    </p>
                  </div>
                  <p className="font-montserrat text-accent-light italic mb-2 text-sm">
                    &ldquo;{comments[currentTestimonial].quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-oswald text-white">
                      {comments[currentTestimonial].name}
                    </p>
                    <p className="font-montserrat text-accent-medium text-xs">
                      {comments[currentTestimonial].createdAt
                        ? new Date(
                            comments[currentTestimonial].createdAt
                          ).toLocaleDateString()
                        : ""}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {comments.length !== 0 && (
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={prevTestimonial}
                className="w-8 h-8 rounded-full bg-accent-dark/50 text-white hover:bg-primary/30 transition-colors flex items-center justify-center"
                aria-label="Testimonio anterior"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="flex justify-center gap-2 items-center">
                {comments.docs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentTestimonial === index
                        ? "w-8 bg-primary"
                        : "w-2 bg-accent-medium/50"
                    }`}
                    aria-label={`Ir al testimonio ${index + 1}`}
                  ></button>
                ))}
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="ml-2 w-6 h-6 rounded-full bg-accent-dark/70 hover:bg-primary/30 text-white transition-colors flex items-center justify-center"
                  aria-label={
                    isAutoPlaying
                      ? "Pausar reproducción automática"
                      : "Activar reproducción automática"
                  }
                >
                  {isAutoPlaying ? (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="6"
                        y="4"
                        width="4"
                        height="16"
                        rx="1"
                        fill="currentColor"
                      />
                      <rect
                        x="14"
                        y="4"
                        width="4"
                        height="16"
                        rx="1"
                        fill="currentColor"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5 4v16l16-8-16-8z" fill="currentColor" />
                    </svg>
                  )}
                </button>
              </div>

              <button
                onClick={nextTestimonial}
                className="w-8 h-8 rounded-full bg-accent-dark/50 text-white hover:bg-primary/30 transition-colors flex items-center justify-center"
                aria-label="Siguiente testimonio"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 6L15 12L9 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-accent-dark/30 flex justify-center">
            {session && session?.provider === "google" && (
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={openCommentModal}
                  className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary font-oswald py-3 px-6 rounded-full transition-all duration-300 border border-primary/30 cursor-pointer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary"
                  >
                    <path
                      d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  COMENTAR
                </button>
                <button
                  onClick={() => signOut({ callbackUrl: "/#call" })}
                  className="text-primary cursor-pointer"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
            {session?.provider !== "google" && (
              <div className="flex flex-col items-center gap-3">
                <p className="text-accent-light font-oswald text-sm">
                  Inicia sesión para comentar y compartir tu experiencia
                </p>
                <LoginButton />
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-5 right-5 bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-6 rounded-lg shadow-lg z-50 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div>
              <p className="font-oswald text-sm">¡COMENTARIO ENVIADO!</p>
              <p className="text-xs">Gracias por compartir tu experiencia</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CallComponent;
