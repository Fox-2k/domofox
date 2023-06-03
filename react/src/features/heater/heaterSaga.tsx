import { put, call, takeEvery, debounce } from "redux-saga/effects"
import { fetchHeaterValue, valueFetched } from '@/features/heater/heaterSlice'
import axios from "axios"

function* fetchValueFromApi() {
    try {
        if(typeof document === "undefined") return
        const { data } = yield call(axios.get, `http://${document.location.hostname}:3000/api/heater/heating`)
        yield put(valueFetched(data.value))
    } catch (error) {
        console.error(error)
    }
}

function* heaterSaga() {
    yield debounce(500, fetchHeaterValue.toString(), fetchValueFromApi)
}

export default heaterSaga