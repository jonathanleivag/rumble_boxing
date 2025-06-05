import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStudentData, IStudentSlice } from "@/type";
import type { WritableDraft } from "immer";
import { PaginateResult } from "mongoose";

const initialState: IStudentSlice = {
  students: {
    docs: [],
    totalDocs: 0,
    limit: 10,
    page: 1,
    prevPage: null,
    nextPage: null,
    hasPrevPage: false,
    hasNextPage: false,
    totalPages: 0,
    offset: 0,
    pagingCounter: 0,
  },
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    initialStudents: (
      state,
      action: PayloadAction<PaginateResult<IStudentData>>
    ) => {
      state.students = action.payload as WritableDraft<
        PaginateResult<IStudentData>
      >;
    },
    addStudent: (state, action: PayloadAction<IStudentData>) => {
      state.students.docs.push(action.payload);
      state.students.totalDocs += 1;
      state.students.totalPages = Math.ceil(
        state.students.totalDocs / state.students.limit
      );
      state.students.hasNextPage =
        (state.students.page ?? 1) < state.students.totalPages;
      state.students.hasPrevPage = (state.students.page ?? 1) > 1;
    },
  },
});

export const { initialStudents, addStudent } = studentSlice.actions;

export default studentSlice.reducer;
