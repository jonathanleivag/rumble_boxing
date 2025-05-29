import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICommentData, ICommentSlice } from "@/type";
import type { WritableDraft } from "immer";

const initialState: ICommentSlice = {
  comments: [],
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    initialComment: (state, action: PayloadAction<ICommentData[]>) => {
      state.comments = action.payload as WritableDraft<ICommentData[]>;
    },
    addComment: (state, action: PayloadAction<ICommentData>) => {
      state.comments.push(action.payload as WritableDraft<ICommentData>);
    },
    editComment: (state, action: PayloadAction<ICommentData>) => {
      const index = state.comments.findIndex(
        (comment) => comment._id === action.payload._id
      );
      if (index !== -1) {
        state.comments[index] = action.payload as WritableDraft<ICommentData>;
      }
    },
  },
});

export const { initialComment, addComment, editComment } = commentSlice.actions;

export default commentSlice.reducer;
