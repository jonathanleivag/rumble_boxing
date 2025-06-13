import { configureStore } from "@reduxjs/toolkit";
import CommentReducer from "./features/comment/comment.slice";
import StudentReducer from "./features/student/student.slice";
import ClassReducer from "./features/class/class.slice";
import ScheduleReducer from "./features/schedule/schedule.slice";

export const store = configureStore({
  reducer: {
    comment: CommentReducer,
    student: StudentReducer,
    class: ClassReducer,
    schedule: ScheduleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["class/selectEditClass"],
        ignoredPaths: ["class.class"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
