import { call, debounce, put } from "redux-saga/effects";
import { addSensor, fetchSensors, removeSensor, sensorAdded, sensorRemoved, sensorUpdated, sensorsFetched, updateSensor } from "./sensorsSlice";
import axios from "axios";

function* fetchSensorsFromApi() {
    try {
        if(typeof document === "undefined") return
        const { data } = yield call(axios.get, `http://${document.location.hostname}:3000/api/sensors`)
        yield put(sensorsFetched(data.value))
    } catch (error) {
        console.error(error)
    }
}

function* addSensorToApi(action: ReturnType<typeof addSensor>) {
    try {
        yield call(axios.post, `http://${document.location.hostname}:3000/api/sensors`, action.payload)
        yield put(sensorAdded(action.payload))
    } catch (error) {
        console.error(error)
    }
}

function* updateSensorToApi(action: ReturnType<typeof updateSensor>) {
    try {
        yield call(axios.put, `http://${document.location.hostname}:3000/api/sensors/${action.payload.id}`, action.payload.changes)
        yield put(sensorUpdated(action.payload))
    } catch (error) {
        console.error(error)
    }
}

function* removeSensorToApi(action: ReturnType<typeof removeSensor>) {
    try {
        yield call(axios.delete, `http://${document.location.hostname}:3000/api/sensors/${action.payload}`)
        yield put(sensorRemoved(action.payload))
    } catch (error) {
        console.error(error)
    }
}

function* sensorsSaga() {
    yield debounce(500, fetchSensors, fetchSensorsFromApi)
    yield debounce(500, addSensor, addSensorToApi)
    yield debounce(500, updateSensor, updateSensorToApi)
    yield debounce(500, removeSensor, removeSensorToApi)
}

export default sensorsSaga;