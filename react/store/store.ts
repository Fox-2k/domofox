
import { configureStore } from '@reduxjs/toolkit'
import statusReducer from "@/reducers/statusSlice"
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () => configureStore({
  reducer: {
    "status": statusReducer
  }
});

export type AppStore = ReturnType<typeof makeStore>

export const wrapper = createWrapper<AppStore>(makeStore)