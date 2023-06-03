import { AppState } from "@/store";
import { createAction, createSlice } from "@reduxjs/toolkit";

export const heaterSlice = createSlice({
    name: "heater",
    initialState: {
        value: false
    },
    reducers: {
        valueFetched: (state, action) => {
            state.value = action.payload
        }
    }
})

export const fetchHeaterValue = createAction("heater/fetchValue")

export const { valueFetched } = heaterSlice.actions

export const getHeaterValue = (state: AppState) => state.heater.value

export default heaterSlice.reducer