import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "@/store/store";

export const statusSlice = createSlice({
    name: "status",
    initialState: {
        isOnline: false,
        date: new Date(),
        mode: 0,
        heating: false,
        setpoint: 0,
    },
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
        }
    }
})

export const { setMode } = statusSlice.actions

export const getMode = (state: AppState) => state.status.mode

export default statusSlice.reducer