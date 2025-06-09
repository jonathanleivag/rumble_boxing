"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";

import { StatusComment } from "@/type";
import {
  countStatusComments,
  getComments,
  updateCommentStatus,
} from "@/lib/db/actions/comment.action";
import {
  initialComment,
  initialCountStatusComments,
} from "@/lib/redux/features/comment/comment.slice";
import StatusCommentComponent from "./statusComment.component";
import PaginationCommentComponent from "./paginationComment.component";

const PageCommentPage: FC = () => {
  const comments = useAppSelector((state) => state.comment.comments);
  const page = useAppSelector((state) => state.comment.page);
  const limit = useAppSelector((state) => state.comment.limit);
  const status = useAppSelector((state) => state.comment.status);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const data = await getComments(status, page, limit);
        dispatch(initialComment(data));
      } finally {
        setIsLoading(false);
      }
    };
    void fetchComments();
    return () => {};
  }, [dispatch, limit, page, status]);

  const renderRating = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={index < rating ? "currentColor" : "none"}
            stroke="currentColor"
            className={`w-4 h-4 ${
              index < rating ? "text-primary" : "text-accent-medium"
            }`}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
    );
  };

  const handleEstadoChange = async (id: string, nuevoEstado: StatusComment) => {
    setIsLoading(true);
    try {
      await updateCommentStatus(id, nuevoEstado);
      const data = await getComments("pending", page, limit);
      dispatch(initialComment(data));
      const dataStatus = await countStatusComments();
      dispatch(initialCountStatusComments(dataStatus));
    } catch (error) {
      console.error("Error al cambiar estado del comentario:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatus = (status: StatusComment) => {
    switch (status) {
      case "pending":
        return "PENDIENTES";
      case "approved":
        return "APROBADOS";
      case "rejected":
        return "RECHAZADOS";
      default:
        return "TODOS";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <h1 className="font-bebas text-white text-xl sm:text-knockout sm:text-4xl mb-1 sm:mb-0 tracking-wider">
          COMENTARIOS {getStatus(status)}
        </h1>
      </div>
      <StatusCommentComponent setIsLoading={setIsLoading} />
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.docs.length > 0 ? (
            comments.docs.map((comment) => (
              <motion.div
                key={comment._id.toString()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm p-4"
              >
                <div className="flex items-start">
                  <Image
                    src={comment.image!}
                    alt={comment.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <div>
                        <h3 className="font-oswald text-white text-sm sm:text-base">
                          {comment.name}
                        </h3>
                      </div>
                      <div className="flex items-center mt-1 sm:mt-0">
                        {renderRating(comment.rating || 0)}
                        <span className="text-accent-medium font-montserrat text-xs ml-2">
                          {format(comment.createdAt, "dd/MM/yyyy")}
                        </span>
                      </div>
                    </div>
                    <p className="text-white font-montserrat text-sm mb-2">
                      {comment.quote}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex space-x-2">
                        {comment.status! !== "approved" && (
                          <button
                            onClick={() =>
                              handleEstadoChange(
                                comment._id.toString(),
                                "approved"
                              )
                            }
                            className="cursor-pointer bg-green-500/20 hover:bg-green-500/40 text-green-400 p-1.5 rounded-md transition-all duration-300"
                            title="Aprobar comentario"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-4 h-4"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </button>
                        )}

                        {comment.status !== "rejected" && (
                          <button
                            onClick={() =>
                              handleEstadoChange(
                                comment._id.toString(),
                                "rejected"
                              )
                            }
                            className="cursor-pointer bg-red-500/20 hover:bg-red-500/40 text-red-400 p-1.5 rounded-md transition-all duration-300"
                            title="Rechazar comentario"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-4 h-4"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-12 h-12 text-accent-dark mx-auto mb-4"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <p className="text-accent-medium font-montserrat">
                No hay comentarios que coincidan con los filtros aplicados
              </p>
            </div>
          )}
        </div>
      )}
      <div className="mt-4">
        <PaginationCommentComponent
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
};

export default PageCommentPage;
