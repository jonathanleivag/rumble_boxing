import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  countStatusComments,
  getComments,
} from "@/lib/db/actions/comment.action";
import {
  initialComment,
  initialCountStatusComments,
  setPageComment,
} from "@/lib/redux/features/comment/comment.slice";
import { StatusComment } from "@/type";

interface StatusCommentComponentProps {
  setIsLoading?: (loading: boolean) => void;
}

const StatusCommentComponent: FC<StatusCommentComponentProps> = ({
  setIsLoading,
}) => {
  const countStatus = useAppSelector(
    (status) => status.comment.countStatusComments
  );
  const page = useAppSelector((state) => state.comment.page);
  const limit = useAppSelector((state) => state.comment.limit);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchCountStatusComments = async () => {
      const data = await countStatusComments();
      dispatch(initialCountStatusComments(data));
    };
    void fetchCountStatusComments();
    return () => {};
  }, [dispatch]);

  const handlerChangeStatus = async (status: StatusComment) => {
    if (setIsLoading) setIsLoading(true);
    try {
      const data = await getComments(status, page, limit);
      dispatch(initialComment(data));
      dispatch(setPageComment(1));
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error changing status:", error.message);
      }
    } finally {
      if (setIsLoading) setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <button
        onClick={() => handlerChangeStatus("pending")}
        className="cursor-pointer bg-gradient-to-br from-yellow-500/10 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm p-4 flex flex-col items-center"
      >
        <div className="bg-yellow-500/20 rounded-full p-3 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-yellow-400"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <h3 className="font-oswald text-white text-lg">
          {countStatus.pending}
        </h3>
        <p className="text-accent-medium font-montserrat text-sm">
          Comentarios Pendientes
        </p>
      </button>
      <button
        onClick={() => handlerChangeStatus("approved")}
        className="cursor-pointer bg-gradient-to-br from-green-500/10 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm p-4 flex flex-col items-center"
      >
        <div className="bg-green-500/20 rounded-full p-3 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-green-400"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 className="font-oswald text-white text-lg">
          {countStatus.approved}
        </h3>
        <p className="text-accent-medium font-montserrat text-sm">
          Comentarios Aprobados
        </p>
      </button>
      <button
        onClick={() => handlerChangeStatus("rejected")}
        className="cursor-pointer bg-gradient-to-br from-red-500/10 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm p-4 flex flex-col items-center"
      >
        <div className="bg-red-500/20 rounded-full p-3 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-red-400"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
        <h3 className="font-oswald text-white text-lg">
          {countStatus.rejected}
        </h3>
        <p className="text-accent-medium font-montserrat text-sm">
          Comentarios Rechazados
        </p>
      </button>
    </div>
  );
};

export default StatusCommentComponent;
