import { useSelector, useDispatch } from "react-redux"
import { updateMode, getMode } from "@/features/status/statusSlice"

import styles from "@/styles/Mode.module.css"

import TuneIcon from '@mui/icons-material/Tune';
import Block from "@/components/block"

export default function Mode() {
    const mode = useSelector(getMode)
    const dispatch = useDispatch()

    return (
        <Block icon={<TuneIcon />}>
            <h5>Mode</h5>
            <div>{mode}</div>
            <div>{
                [0,1,2].map(numMode => (
                    <button className={styles.btn} key={numMode} onClick={() => dispatch(updateMode(numMode))}>{numMode}</button>
                ))
            }</div>
        </Block>
    )
}