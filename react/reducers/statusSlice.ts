import { createSlice } from "@reduxjs/toolkit";

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

    }
})

export default statusSlice.reducer