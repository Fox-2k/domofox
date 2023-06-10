import axios from "axios"
import { put, call, takeEvery, debounce } from "redux-saga/effects"

function* execReboot() {
    try {
        yield call(axios.post, `http://${document.location.hostname}:3000/api/device/reboot`)
    } catch (error) {
        console.log(error)
    }
}

function* execShutdown() {
    try {
        yield call(axios.post, `http://${document.location.hostname}:3000/api/device/shutdown`)
    } catch (error) {
        console.log(error)
    }
}

function* deviceSaga() {
    yield debounce(500, "device/reboot", execReboot)
    yield debounce(500, "device/shutdown", execShutdown)
}

export default deviceSaga