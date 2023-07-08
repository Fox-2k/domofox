import { AppState } from "@/store"
import { Update, createAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit"

interface Sensor extends NewSensor{
    id: string,
    active: boolean,
    created: string,
    raw: number,
    value?: number,
    last?: string
}

interface NewSensor {
    label: string,
    driver: string,
    params: {
        id?: string,
    },
    weight: number,
    calibration: {
        a: number,
        b: number
    },
}

const sensorsAdapter = createEntityAdapter<Sensor>()

export const sensorsSlice = createSlice({
    name: "sensors",
    initialState: sensorsAdapter.getInitialState(),
    reducers: {
        sensorsFetched: (state, action) => {
            sensorsAdapter.removeAll(state)
            sensorsAdapter.addMany(state, action.payload)
        },
        sensorAdded: sensorsAdapter.addOne,
        sensorUpdated: sensorsAdapter.updateOne,
        sensorRemoved: sensorsAdapter.removeOne,
    },
})

export const fetchSensors = createAction("sensors/fetchSensors")
export const addSensor = createAction<NewSensor>("sensors/addSensor")
export const updateSensor = createAction<Update<Sensor>>("sensors/updateSensor")
export const removeSensor = createAction<string>("sensors/updateSensor")

export const { sensorsFetched, sensorAdded, sensorUpdated, sensorRemoved } = sensorsSlice.actions

export const { selectAll, selectById } = sensorsAdapter.getSelectors<AppState>(state => state.sensors)

export default sensorsSlice.reducer