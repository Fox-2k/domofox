import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from "redux-saga"

import statusReducer from '@/features/status/statusSlice'
import statusSaga from '@/features/status/statusSaga';

import heaterReducer from '@/features/heater/heaterSlice'
import heaterSaga from '@/features/heater/heaterSaga'

import hysteresisReducer from '@/features/hysteresis/hysteresisSlice'
import hysteresisSaga from '@/features/hysteresis/hysteresisSaga';

import deviceSaga from '@/features/device/deviceSaga';

export function makeStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: { status: statusReducer, heater: heaterReducer, hysteresis: hysteresisReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([sagaMiddleware])
  })

  sagaMiddleware.run(statusSaga)
  sagaMiddleware.run(heaterSaga)
  sagaMiddleware.run(hysteresisSaga)
  sagaMiddleware.run(deviceSaga)

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
