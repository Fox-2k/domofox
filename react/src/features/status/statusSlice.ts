import { createSlice, createAction } from "@reduxjs/toolkit"
import { AppState } from "@/store";

export const statusSlice = createSlice({
    name: "status",
    initialState: {
        isOnline: false,
        date: (new Date()).toISOString(),
        mode: 0,
        heating: false,
        setpoint: 0,
    },
    reducers: {
        modeFetched: (state, action) => {
            state.mode = action.payload;
        }
    }
})

export const fetchMode = createAction("mode/fetchMode")
export const updateMode = createAction<number>("mode/updateMode")
export const { modeFetched } = statusSlice.actions

export const getMode = (state: AppState) => state.status.mode

export default statusSlice.reducer