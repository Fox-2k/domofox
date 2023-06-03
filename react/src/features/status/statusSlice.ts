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
        avgTemp: 0,
    },
    reducers: {
        modeFetched: (state, action) => {
            state.mode = action.payload;
        },
        setpointFetched: (state, action) => {
            state.setpoint = action.payload;
        },
        avgTempFetched: (state, action) => {
            state.avgTemp = action.payload
        }
    }
})

export const fetchMode = createAction("mode/fetchMode")
export const fetchSetpoint = createAction("mode/fetchSetpoint")
export const fetchAvgTemp = createAction("mode/fetchAvgTemp")

export const updateMode = createAction<number>("mode/updateMode")
export const updateSetpoint = createAction<number>("mode/updateSetPoint")

export const { modeFetched, setpointFetched, avgTempFetched } = statusSlice.actions

export const getMode = (state: AppState) => state.status.mode
export const getSetpoint = (state: AppState) => state.status.setpoint
export const getAvgTemp = (state: AppState) => state.status.avgTemp

export default statusSlice.reducer