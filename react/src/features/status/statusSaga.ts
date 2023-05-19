import { put, call, takeEvery, debounce } from "redux-saga/effects"
import { fetchMode, fetchSetpoint, updateMode, updateSetpoint, modeFetched, setpointFetched } from "./statusSlice"
import axios from "axios"

function* fetchModeFromApi() {
    try {
        if(typeof document === "undefined") return
        const { data } = yield call(axios.get, `http://${document.location.hostname}:3000/api/mode`)
        yield put(modeFetched(data.value))
    } catch (error) {
        console.error(error)
    }
}

function* fetchSetPointFromApi() {
    try {
        if(typeof document === "undefined") return
        const { data } = yield call(axios.get, `http://${document.location.hostname}:3000/api/setpoint`)
        yield put(setpointFetched(data.value))
    } catch (error) {
        console.error(error)
    }
}

function* updateModeToApi(action: ReturnType<typeof updateMode>) {
    try {
        yield call(axios.put, `http://${document.location.hostname}:3000/api/mode`, { value: action.payload })
        yield put(modeFetched(action.payload))
    } catch (error) {
        console.error(error)
    }
}

function* updateSetpointToApi(action: ReturnType<typeof updateMode>) {
    try {
        yield call(axios.put, `http://${document.location.hostname}:3000/api/setpoint`, { value: action.payload })
        yield put(setpointFetched(action.payload))
    } catch (error) {
        console.error(error)
    }
}

function* statusSaga() {
    yield debounce(500, fetchMode.toString(), fetchModeFromApi)
    yield debounce(500, fetchSetpoint.toString(), fetchSetPointFromApi)
    yield debounce(500, updateMode.toString(), updateModeToApi)
    yield debounce(500, updateSetpoint.toString(), updateSetpointToApi)
}

export default statusSaga