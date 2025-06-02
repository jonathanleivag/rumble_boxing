import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface MatriculaState {
  value: number;
  description: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: MatriculaState = {
  value: 0,
  description: "",
  isLoading: false,
  error: null,
};

export const fetchMatricula = createAsyncThunk(
  "matricula/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/matricula");

      if (!response.ok) {
        throw new Error("Error al cargar el valor de la matrícula");
      }

      const data = await response.json();

      if (data && data.data) {
        return {
          value: data.data.value || 0,
          description: data.data.description || "",
        };
      }

      return {
        value: 0,
        description: "",
      };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Error desconocido al cargar la matrícula");
    }
  }
);

// Thunk para actualizar el valor de la matrícula
export const updateMatricula = createAsyncThunk(
  "matricula/update",
  async (
    { id, data }: { id?: string; data: { value: number; description: string } },
    { rejectWithValue }
  ) => {
    try {
      const url = id ? `/api/matricula/${id}` : "/api/matricula";
      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el valor de la matrícula");
      }

      const responseData = await response.json();

      return {
        value: responseData.data.value || 0,
        description: responseData.data.description || "",
      };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Error desconocido al actualizar la matrícula");
    }
  }
);

export const matriculaSlice = createSlice({
  name: "matricula",
  initialState,
  reducers: {
    resetMatriculaState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatricula.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchMatricula.fulfilled,
        (
          state,
          action: PayloadAction<{ value: number; description: string }>
        ) => {
          state.isLoading = false;
          state.value = action.payload.value;
          state.description = action.payload.description;
        }
      )
      .addCase(fetchMatricula.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updateMatricula.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        updateMatricula.fulfilled,
        (
          state,
          action: PayloadAction<{ value: number; description: string }>
        ) => {
          state.isLoading = false;
          state.value = action.payload.value;
          state.description = action.payload.description;
        }
      )
      .addCase(updateMatricula.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetMatriculaState } = matriculaSlice.actions;
export default matriculaSlice.reducer;
