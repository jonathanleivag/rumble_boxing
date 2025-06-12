import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClassDocumentData, IClassSlice } from "@/type";

const initialState: IClassSlice = {
  class: [],
};

export const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    initialClass: (state, action: PayloadAction<ClassDocumentData[]>) => {
      state.class = action.payload;
    },
    addClass: (state, action: PayloadAction<ClassDocumentData>) => {
      state.class.push(action.payload);
    },
  },
});

export const { initialClass, addClass } = classSlice.actions;

export default classSlice.reducer;
