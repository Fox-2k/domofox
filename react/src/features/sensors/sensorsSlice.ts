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
export const addSensor = createAction<Sensor>("sensors/addSendor")
export const updateSensor = createAction<Update<Sensor>>("sensors/updateSensor")
export const removeSensor = createAction<string>("sensors/updateSensor")

export const { sensorsFetched, sensorAdded, sensorUpdated, sensorRemoved } = sensorsSlice.actions

export const { selectAll, selectById } = sensorsAdapter.getSelectors<AppState>(state => state.sensors)

export default sensorsSlice.reducer