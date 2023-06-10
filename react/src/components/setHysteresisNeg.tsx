import { updateNeg, getNeg } from "@/features/hysteresis/hysteresisSlice"

import ValueBlock from "./valueBlock";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useAppDispatch, useAppSelector } from '@/hooks';

export default function SetHysteresisNeg() {
    const hysteresisNeg = useAppSelector(getNeg)
    const dispatch = useAppDispatch()

    const handleChange = (newValue: number) => {
        dispatch(updateNeg(newValue))
    }

    return (
        <ValueBlock icon={<RemoveCircleIcon />} value={hysteresisNeg} unit="°C" onChange={handleChange} />
    )
}