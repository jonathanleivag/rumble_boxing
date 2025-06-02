import { configureStore } from "@reduxjs/toolkit";
import CommentReducer from "./features/comment/comment.slice";
import MatriculaReducer from "./features/matricula/matriculaSlice";

export const store = configureStore({
  reducer: {
    comment: CommentReducer,
    matricula: MatriculaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
