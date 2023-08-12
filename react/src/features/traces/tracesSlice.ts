import { AppState } from "@/store";
import { SliceCaseReducers, createAction, createSlice } from "@reduxjs/toolkit";

export type tracesSliceType = {
    AVG_TEMP: { x: string, y: number }[];
    SETPOINT: { x: string, y: number }[];
    HEATER: { x: string, y: number }[];
}

export const tracesSlice = createSlice<tracesSliceType, SliceCaseReducers<tracesSliceType>>({
    name: "traces",
    initialState: {
        AVG_TEMP: [],
        SETPOINT: [],
        HEATER: [],
    },
    reducers: {
        allTracesFetched: (state, action) => {
            state.AVG_TEMP =  action.payload.AVG_TEMP;
            state.SETPOINT = action.payload.SETPOINT;
            state.HEATER = action.payload.HEATER;
        },
    }
})

export type FetchAllTracesParams = {
    from: string;
    to: string;
}

export const fetchAllTraces = createAction<FetchAllTracesParams>("traces/fetchTraces")

export const { allTracesFetched } = tracesSlice.actions

export const getTraces = (state: AppState) => state.traces

export default tracesSlice.reducer