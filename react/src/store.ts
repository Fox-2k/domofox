import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from "redux-saga"

import statusReducer from '@/features/status/statusSlice'
import statusSaga from '@/features/status/statusSaga';

import heaterReducer from '@/features/heater/heaterSlice'
import heaterSaga from '@/features/heater/heaterSaga'

export function makeStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: { status: statusReducer, heater: heaterReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([sagaMiddleware])
  })

  sagaMiddleware.run(statusSaga)
  sagaMiddleware.run(heaterSaga)

  return store
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   AppState,
//   unknown,
//   Action<string>
// >

export default store
