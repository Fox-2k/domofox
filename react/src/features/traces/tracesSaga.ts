import { call, debounce, put } from "redux-saga/effects";
import { fetchAllTraces, allTracesFetched } from "./tracesSlice";
import axios from "axios";

function* fetchAllTracesFromApi(action: ReturnType<typeof fetchAllTraces>) {
    try {
        if(typeof document === "undefined") return
        const { data: { value: SETPOINT } } = yield call(axios.get, `http://${document.location.hostname}:3000/api/traces/SETPOINT`, { params: { from: action.payload.from, to: action.payload.to }})
        const { data: { value: AVG_TEMP } } = yield call(axios.get, `http://${document.location.hostname}:3000/api/traces/AVG_TEMP`, { params: { from: action.payload.from, to: action.payload.to }})
        const { data: { value: HEATER } } = yield call(axios.get, `http://${document.location.hostname}:3000/api/traces/HEATER`, { params: { from: action.payload.from, to: action.payload.to }})
        yield put(allTracesFetched({ SETPOINT, AVG_TEMP, HEATER }))
    } catch (error) {
        console.error(error)
    }
}

function* tracesSaga() {
    yield debounce(500, fetchAllTraces.toString(), fetchAllTracesFromApi)
}

export default tracesSaga