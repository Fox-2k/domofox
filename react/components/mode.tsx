
import { useSelector, useDispatch } from "react-redux"
import { setMode, getMode } from "@/reducers/statusSlice"

export default function Mode() {
    const mode = useSelector(getMode)
    const dispatch = useDispatch()

    return <div>
        <h5>Mode</h5>
        <div>{mode}</div>
        <div>{
            [0,1,2].map(numMode => (
                <button onClick={() => dispatch(setMode(numMode))}>{numMode}</button>
            ))
        }</div>
    </div>
}