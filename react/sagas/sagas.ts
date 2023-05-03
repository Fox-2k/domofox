import { put, takeEvery } from "redux-saga/effects"
import { fetchMode, modeFetched } from "@/reducers/statusSlice"
import axios from "axios"

const APIBASE = "http://document.location.hostname:3000" // "https://3000-fox2k-domofox-30xyhbg65fi.ws-eu96b.gitpod.io"

function* fetchModeFromApi() {
    try {
        const { data } = yield axios.get(`${APIBASE}/api/mode`)
        yield put(modeFetched(data.value))
    } catch (error) {
        console.error(error)
    }
}

function* mySaga() {
    yield takeEvery(fetchMode.toString(), fetchModeFromApi)
}

export default mySaga