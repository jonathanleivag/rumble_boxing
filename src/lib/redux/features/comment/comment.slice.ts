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
  },
});

export const { initialComment, addComment } = commentSlice.actions;

export default commentSlice.reducer;
