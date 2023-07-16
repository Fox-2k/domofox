import { Job, removeJob, updateJob } from "@/features/planning/planningSlice";
import { useAppDispatch } from "@/hooks";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import ConfirmedButton from "./confirmedButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DaysSelector from "./daysSelector";

type JobProps = Job

function printTime(time: { hour: number, min: number}) {
    return `${("0" + time.hour).slice(-2)}:${("0" + time.min).slice(-2)}`
}

export default function Job({ id, active, time, setpoint, days }: JobProps) {

    const dispatch = useAppDispatch()

    const toggleActive = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(active != event.target.checked) {
            dispatch(updateJob({
                id,
                changes: { active: event.target.checked }
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

    return (
        <Paper sx={{ p: 2, fontSize: 36,}}>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Stack direction={"row"}>
                    <Switch checked={active} onChange={toggleActive}/>
                    <Typography variant="h4">{printTime(time)}</Typography>
                    <MobileTimePicker value={printTime(time)} ></MobileTimePicker>
                </Stack>
                <div>{setpoint}°C</div>
                
                <ConfirmedButton 
                    prompt={`Delete job which set ${setpoint}°C at ${printTime(time)}?`} 
                    onClick={handleDeleteClick}  
                    color="error">
                    <DeleteIcon />
                </ConfirmedButton>
            </Stack>
            <DaysSelector sx={{ float: "right" }} value={days} onChange={handleDaysChange}/>
        </Paper>
    )
}