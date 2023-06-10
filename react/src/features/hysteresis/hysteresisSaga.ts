import { put, call, debounce } from "redux-saga/effects"
import { fetchNeg, fetchPos, posFetched, negFetched, updateNeg, updatePos } from "./hysteresisSlice";
import axios from "axios";

function* fetchPosFromApi() {
    try {
        if(typeof document === "undefined") return
        const { data } = yield call(axios.get, `http://${document.location.hostname}:3000/api/hysteresis/pos`)
        yield put(posFetched(data.value))
    } catch (error) {
        console.error(error)
    }
}

function* fetchNegFromApi() {
    try {
        if(typeof document === "undefined") return
        const { data } = yield call(axios.get, `http://${document.location.hostname}:3000/api/hysteresis/neg`)
        yield put(negFetched(data.value))
    } catch (error) {
        console.error(error)
    }
}

function* updatePosToApi(action: ReturnType<typeof updatePos>) {
    try {
        yield call(axios.put, `http://${document.location.hostname}:3000/api/hysteresis/pos`, { value: action.payload })
        yield put(posFetched(action.payload))
    } catch (error) {
        console.error(error)
    }
}

function* updateNegToApi(action: ReturnType<typeof updateNeg>) {
    try {
        yield call(axios.put, `http://${document.location.hostname}:3000/api/hysteresis/neg`, { value: action.payload })
        yield put(negFetched(action.payload))
    } catch (error) {
        console.error(error)
    }
}

function* hysteresisSaga() {
    yield debounce(500, fetchPos, fetchPosFromApi)
    yield debounce(500, fetchNeg, fetchNegFromApi)
    yield debounce(500, updatePos, updatePosToApi)
    yield debounce(500, updateNeg, updateNegToApi)
}

export default hysteresisSaga