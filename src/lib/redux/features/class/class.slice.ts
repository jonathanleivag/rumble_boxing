import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClassDocumentData, IClassSlice } from "@/type";

const initialState: IClassSlice = {
  class: [],
  edit: false,
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
    selectEditClass: (
      state,
      action: PayloadAction<ClassDocumentData | false>
    ) => {
      state.edit = action.payload;
    },
    editClass: (state, action: PayloadAction<ClassDocumentData>) => {
      const index = state.class.findIndex(
        (cls) => cls._id.toString() === action.payload._id.toString()
      );
      if (index !== -1) {
        state.class[index] = action.payload;
      }
    },
  },
});

export const {
  initialClass,
  addClass,
  deleteClassSlice,
  selectEditClass,
  editClass,
} = classSlice.actions;

export default classSlice.reducer;
