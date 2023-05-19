import { updateSetpoint, getSetpoint } from "@/features/status/statusSlice"

import ValueBlock from "./valueBlock";
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from '@/hooks';

export default function SetPointTemp() {
    const setpoint = useAppSelector(getSetpoint)
    const dispatch = useAppDispatch()

    const handleChange = (newValue: number) => {
        dispatch(updateSetpoint(newValue))
    }

    return (
        <ValueBlock icon={<EditIcon />} value={setpoint} unit="°C" onChange={handleChange} />
    )
}