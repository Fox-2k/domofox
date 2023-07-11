import { AppState } from "@/store"
import { Update, createAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit"

export interface Job extends NewJob {
    id: string,
    created: string,
    updated: string,
}

interface NewJob {
    label?: string,
    active: boolean,
    time: {
        hour: number,
        min: number
    },
    days: boolean[],
    setpoint: number,
    preset?: string,
}

const planningAdapter = createEntityAdapter<Job>()

export const planningSlice = createSlice({
    name: "planning",
    initialState: planningAdapter.getInitialState(),
    reducers: {
        planningFetched: (state, action) => {
            planningAdapter.removeAll(state),
            planningAdapter.addMany(state, action.payload)
        },
        jobAdded: planningAdapter.addOne,
        jobUpdated: planningAdapter.updateOne,
        jobRemoved: planningAdapter.removeOne,
    }
})

export const fetchPlanning = createAction("planning/fetchPlanning")
export const addJob = createAction<NewJob>("planning/addJob")
export const updateJob = createAction<Update<Job>>("planning/updateJob")
export const removeJob = createAction<String>("planning/removeJob")

export const { planningFetched, jobAdded, jobUpdated, jobRemoved } = planningSlice.actions

export const { selectAll, selectById } = planningAdapter.getSelectors<AppState>(state => state.planning)

export default planningSlice.reducer