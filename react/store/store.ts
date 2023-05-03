
import { configureStore } from '@reduxjs/toolkit'
import statusReducer from "@/reducers/statusSlice"
import createSagaMiddleware from "redux-saga"
import { createWrapper } from 'next-redux-wrapper';
import mySaga from '@/sagas/sagas';


const makeStore = () => {

  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: {
      "status": statusReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([sagaMiddleware])
  })

  sagaMiddleware.run(mySaga)

  return store
};

type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>

export const wrapper = createWrapper<AppStore>(makeStore)