import { AppState } from "@/store"
import { createAction, createSlice } from "@reduxjs/toolkit"

export const hysteresisSlice = createSlice({
    name: "hysteresis",
    initialState: {
        pos: 0.5,
        neg: 0.5
    },
    reducers: {
        posFetched: (state, action) => {
            state.pos = action.payload
        },
        negFetched: (state, action) => {
            state.neg = action.payload
        }
    }
})

export const fetchPos = createAction("hysteresis/fetchPos")
export const fetchNeg = createAction("hysteresis/fetchNeg")

export const updatePos = createAction<number>("hysteresis/updatePos")
export const updateNeg = createAction<number>("hysteresis/updateNeg")

export const { posFetched, negFetched } = hysteresisSlice.actions

export const getPos = (state: AppState) => state.hysteresis.pos
export const getNeg = (state: AppState) => state.hysteresis.neg

export default hysteresisSlice.reducer