import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CountStatusComments,
  ICommentData,
  ICommentSlice,
  StatusComment,
} from "@/type";
import type { WritableDraft } from "immer";
import { PaginateResult } from "mongoose";

const initialState: ICommentSlice = {
  comments: {
    docs: [],
    totalDocs: 0,
    limit: 0,
    hasPrevPage: false,
    hasNextPage: false,
    totalPages: 0,
    offset: 0,
    pagingCounter: 0,
  },
  countStatusComments: {
    approved: 0,
    pending: 0,
    rejected: 0,
  },
  page: 1,
  limit: 1,
  status: "pending",
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    initialComment: (
      state,
      action: PayloadAction<PaginateResult<ICommentData>>
    ) => {
      state.comments = action.payload as WritableDraft<
        PaginateResult<ICommentData>
      >;
    },
    initialCountStatusComments: (
      state,
      action: PayloadAction<CountStatusComments>
    ) => {
      state.countStatusComments =
        action.payload as WritableDraft<CountStatusComments>;
    },
    addComment: (state, action: PayloadAction<ICommentData>) => {
      const newComment = action.payload as WritableDraft<ICommentData>;
      state.comments.docs.push(newComment);
      state.comments.totalDocs += 1;
      state.comments.pagingCounter = state.comments.docs.length;
      state.comments.hasNextPage =
        state.comments.docs.length < state.comments.totalPages;
      state.comments.hasPrevPage = state.comments.docs.length > 0;
    },
    editComment: (state, action: PayloadAction<ICommentData>) => {
      const updatedComment = action.payload as WritableDraft<ICommentData>;
      const index = state.comments.docs.findIndex(
        (comment) => comment._id === updatedComment._id
      );
      if (index !== -1) {
        state.comments.docs[index] = updatedComment;
      }
      state.comments.hasNextPage =
        state.comments.docs.length < state.comments.totalPages;
      state.comments.hasPrevPage = state.comments.docs.length > 0;
      state.comments.pagingCounter = state.comments.docs.length;
      state.comments.totalDocs = state.comments.docs.length;
    },
    deleteComment: (state, action: PayloadAction<string>) => {
      const commentId = action.payload;
      state.comments.docs = state.comments.docs.filter(
        (comment) => comment._id.toString() !== commentId
      );
      state.comments.totalDocs -= 1;
      state.comments.pagingCounter = state.comments.docs.length;
      state.comments.hasNextPage =
        state.comments.docs.length < state.comments.totalPages;
      state.comments.hasPrevPage = state.comments.docs.length > 0;
    },
    setPageComment: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimitComment: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setStatusComment: (state, action: PayloadAction<StatusComment>) => {
      state.status = action.payload;
    },
  },
});

export const {
  initialComment,
  addComment,
  editComment,
  deleteComment,
  initialCountStatusComments,
  setPageComment,
  setLimitComment,
  setStatusComment,
} = commentSlice.actions;

export default commentSlice.reducer;
