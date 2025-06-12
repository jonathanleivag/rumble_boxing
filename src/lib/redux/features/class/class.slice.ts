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
    deleteClassSlice: (state, action: PayloadAction<string>) => {
      state.class = state.class.filter(
        (cls) => cls._id.toString() !== action.payload
      );
    },
  },
});

export const { initialClass, addClass, deleteClassSlice } = classSlice.actions;

export default classSlice.reducer;
