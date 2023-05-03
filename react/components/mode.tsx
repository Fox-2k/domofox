
import { useSelector, useDispatch } from "react-redux"
import { fetchMode, getMode } from "@/reducers/statusSlice"
import styles from "@/styles/Mode.module.css"
import { useEffect } from "react"

export default function Mode() {
    const mode = useSelector(getMode)
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => dispatch(fetchMode()), 1000)
    }, [])

    return (<div>
        <h5>Mode</h5>
        <div>{mode}</div>
        {/* <div>{
            [0,1,2].map(numMode => (
                <button className={styles.btn} key={numMode} onClick={() => dispatch(setMode(numMode))}>{numMode}</button>
            ))
        }</div> */}
    </div>)
}