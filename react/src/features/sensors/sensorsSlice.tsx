import { AppState } from "@/store"
import { Update, createAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit"

type Sensor = {
    id: string,
    label: string,
    driver: string,
    params: object,
    weight: number,
    calibration: {
        a: number,
        b: number
    },
    active: boolean,
    created: string,
    raw: number,
    value?: number,
    last?: string
}

const sensorsAdapter = createEntityAdapter<Sensor>()

export const sensorsSlice = createSlice({
    name: "sensors",
    initialState: sensorsAdapter.getInitialState(),
    reducers: {
        sensorAdded: sensorsAdapter.addOne,
        sensorUpdated: sensorsAdapter.updateOne,
        sensorRemoved: sensorsAdapter.removeOne,
    },
})

export const fetchSensors = createAction("sensors/fetchSensors")
export const updateSensor = createAction<Update<Sensor>>("sensors/updateSensors")
export const removeSensor = createAction<string>("sensors/updateSensors")

export const { sensorAdded, sensorUpdated, sensorRemoved } = sensorsSlice.actions

export const { selectAll, selectById } = sensorsAdapter.getSelectors<AppState>(state => state.sensors)

export default sensorsSlice.reducer