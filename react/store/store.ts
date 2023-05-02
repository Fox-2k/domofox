
import { configureStore } from '@reduxjs/toolkit'
import statusReducer from "@/reducers/statusSlice"
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () => configureStore({
  reducer: {
    "status": statusReducer
  }
});

type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>

export const wrapper = createWrapper<AppStore>(makeStore)