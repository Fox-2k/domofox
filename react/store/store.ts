
import { configureStore } from '@reduxjs/toolkit'
import statusReducer from "@/reducers/statusSlice"
import createSagaMiddleware from "redux-saga"
import mySaga from '@/sagas/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    "status": statusReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([sagaMiddleware])
})

sagaMiddleware.run(mySaga)

export default store