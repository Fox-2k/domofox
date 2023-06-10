import { updatePos, getPos } from "@/features/hysteresis/hysteresisSlice"

import ValueBlock from "./valueBlock";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAppDispatch, useAppSelector } from '@/hooks';

export default function SetHysteresisPos() {
    const hysteresisPos = useAppSelector(getPos)
    const dispatch = useAppDispatch()

    const handleChange = (newValue: number) => {
        dispatch(updatePos(newValue))
    }

    return (
        <ValueBlock icon={<AddCircleIcon />} value={hysteresisPos} unit="°C" onChange={handleChange} />
    )
}