import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISchedulesData, IScheduleSlice } from "@/type";

const initialState: IScheduleSlice = {
  schedules: [],
  edit: false,
  nameEdit: "",
  idEdit: "",
};

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    initialSchedule: (state, action: PayloadAction<ISchedulesData[]>) => {
      state.schedules = action.payload;
    },
    addSchedule: (state, action: PayloadAction<ISchedulesData>) => {
      state.schedules.push(action.payload);
    },
    deleteScheduleSlice: (state, action: PayloadAction<string>) => {
      state.schedules = state.schedules.filter(
        (cls) => cls._id.toString() !== action.payload
      );
    },
    isEditSchedule: (
      state,
      action: PayloadAction<{ name: string; isEdit: boolean; id: string }>
    ) => {
      state.edit = action.payload.isEdit;
      state.nameEdit = action.payload.name;
      state.idEdit = action.payload.id;
    },
    editSchedule: (state, action: PayloadAction<ISchedulesData>) => {
      const index = state.schedules.findIndex(
        (cls) => cls._id.toString() === action.payload._id.toString()
      );
      if (index !== -1) {
        state.schedules[index] = action.payload;
      }
    },
  },
});

export const {
  initialSchedule,
  deleteScheduleSlice,
  editSchedule,
  addSchedule,
  isEditSchedule,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
