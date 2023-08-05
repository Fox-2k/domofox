import { Job, removeJob, updateJob } from "@/features/planning/planningSlice";
import { useAppDispatch } from "@/hooks";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import ConfirmedButton from "./confirmedButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from "@mui/material/Stack";
import DaysSelector from "./daysSelector";
import dayjs, { Dayjs } from "dayjs";
import { InputBaseComponentProps, TextField } from "@mui/material";
import { forwardRef, useState } from "react";
import EditValueDialog from "./editValueDialog";

type JobProps = Job & { style?: React.CSSProperties }

function printTime(time: { hour: number, min: number}) {
    return `${("0" + time.hour).slice(-2)}:${("0" + time.min).slice(-2)}`
}

export default forwardRef<HTMLDivElement, JobProps>(function Job({ id, active, time, setpoint, days, style }, ref) {

    const [openSetpointDialog, setOpenSetpointDialog] = useState(false)

    const dispatch = useAppDispatch()

    const toggleActive = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(active != event.target.checked) {
            dispatch(updateJob({
                id,
                changes: { active: event.target.checked }
            }))
        }
    }

    const handleTimeChange = (validatedTime: Dayjs | null) => {
        if(validatedTime) {
            const time = {
                hour: validatedTime.hour(),
                min: validatedTime.minute()
            }
            dispatch(updateJob({
                id,
                changes: { time }
            }))   
        }
    }

    const handleSetpointInput = () => {
        setOpenSetpointDialog(true)
    }

    const handleSetpointChange = (value: number | undefined) => {
        setOpenSetpointDialog(false)
        if(value != undefined && value !== setpoint) {
            dispatch(updateJob({
                id,
                changes: { setpoint: value }
            }))
        }
    }

    const handleDeleteClick = () => {
        dispatch(removeJob(id))
    }

    const handleDaysChange = (days: boolean[]) => {
        dispatch(updateJob({
            id,
            changes: { days }
        }))
    }

    const customInputProps: InputBaseComponentProps = { style: { fontSize: 36, textAlign: "center", padding: 0 } };

    return (
        <Paper style={style} ref={ref} sx={{ p: 1.5, fontSize: 36, position: "relative"}}>
            <Stack direction={"row"} justifyContent={"flex-start"} alignItems={"center"} gap={3}>
                <Stack direction={"row"} sx={{ alignItems: "center"}}>
                    <Switch checked={active} onChange={toggleActive}/>
                    <MobileTimePicker slotProps={{ textField: { size: "small", sx: { width: 130 }, inputProps: customInputProps} }} ampmInClock={false} format="HH:mm" ampm={false} value={dayjs(printTime(time), "HH:mm")} onAccept={handleTimeChange} ></MobileTimePicker>
                </Stack>
                <TextField size={"small"} sx={{ width: 140 }} inputProps={{...customInputProps, readOnly: true}} value={`${setpoint}°C`} onClick={handleSetpointInput} ></TextField>
                <div style={{ flexGrow: 1 }} />
                <ConfirmedButton 
                    prompt={`Delete job which set ${setpoint}°C at ${printTime(time)}?`} 
                    onClick={handleDeleteClick}  
                    color="error">
                    <DeleteIcon />
                </ConfirmedButton>
            </Stack>
            <Box sx={{ display: "flex", width: "100%", justifyContent: "end" }}>
                <DaysSelector sx={{ mt: 1 }} value={days} onChange={handleDaysChange}/>
            </Box>
            <EditValueDialog open={openSetpointDialog} onClose={handleSetpointChange} value={setpoint}/>
        </Paper>
    )
})