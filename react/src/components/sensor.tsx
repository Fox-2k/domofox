import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import FormControlLabel from '@mui/material/FormControlLabel';
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from "@mui/material/Paper";
import { updateSensor } from "@/features/sensors/sensorsSlice";
import { useAppDispatch } from "@/hooks";
import { useState } from "react";
import EditSensorDialog from "./editSensorDialog";

interface SensorProps {
    id: string,
    label: string,
    active: boolean,
    weight: number,
    value?: number,
}

export default function Sensor({id, label, active, weight, value}: SensorProps) {
    const dispatch = useAppDispatch()
    const [editDialog, setEditDialog] = useState(false)
    
    const toggleActive = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(active != event.target.checked) {
            dispatch(updateSensor({
                id,
                changes: { active: event.target.checked }
            }))
        }
    }

    const handleClick = () => {
        setEditDialog(true)
    }

    const handleClose = () => {
        setEditDialog(false)
    }


    const weightedValueString = `${value?.toFixed(1) || "??"}°C x ${weight}`

    return (
        <Paper sx={{ p: 1, m: 1}}>
            <Box 
                sx={{
                    p: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <FormControlLabel control={<Switch checked={active} onChange={toggleActive}/>} label={label} />
                <ButtonGroup variant="outlined">
                    <Button onClick={handleClick}><EditIcon /></Button>
                    <Button color="error"><DeleteIcon /></Button>
                </ButtonGroup>
            </Box>
            <Box sx={{ color: "#FFFFFF88" }}>
                {weightedValueString}
            </Box>
            <EditSensorDialog open={editDialog} onClose={handleClose} />
        </Paper>
    )
}