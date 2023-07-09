import { call, debounce, put } from "redux-saga/effects"
import { addJob, fetchPlanning, jobAdded, jobRemoved, jobUpdated, planningFetched, removeJob, updateJob } from "./planningSlice"
import axios from "axios"

function* fetchPlanningFromApi() {
    try {
        if(typeof document === "undefined") return
        const { data } = yield call(axios.get, `http://${document.location.hostname}:3000/api/plannings`)
        yield put(planningFetched(data.value))
    } catch (error) {
        console.error(error)
    }
}

function* addJobToApi(action: ReturnType<typeof addJob>) {
    try {
        const { data } = yield call(axios.post, `http://${document.location.hostname}:3000/api/plannings`, action.payload)
        yield put(jobAdded(data.value))
    } catch (error) {
        console.error(error)
    }
}

function* updateJobToApi(action: ReturnType<typeof updateJob>) {
    try {
        yield call(axios.put, `http://${document.location.hostname}:3000/api/plannings/${action.payload.id}`, action.payload.changes)
        yield put(jobUpdated(action.payload))
    } catch (error) {
        console.error(error)
    }
}

function* removeJobToApi(action: ReturnType<typeof removeJob>) {
    try {
        const { data } = yield call(axios.delete, `http://${document.location.hostname}:3000/api/plannings/${action.payload}`)
        yield put(jobRemoved(data.value.id))
    } catch (error) {
        console.error(error)
    }
}

function* planningSaga() {
    yield debounce(500, fetchPlanning, fetchPlanningFromApi)
    yield debounce(500, addJob, addJobToApi)
    yield debounce(500, updateJob, updateJobToApi)
    yield debounce(500, removeJob, removeJobToApi)
}

export default planningSaga