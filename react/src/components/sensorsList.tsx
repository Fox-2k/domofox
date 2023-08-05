import Block from "./block";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Sensor from "./sensor";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectAll, addSensor } from "@/features/sensors/sensorsSlice";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditSensorDialog from "./editSensorDialog";
import { useState } from "react";
import { Collapse } from "@mui/material";
import { TransitionGroup } from 'react-transition-group';

export default function SensorsList() {
    const dispatch = useAppDispatch()
    const sensors = useAppSelector(selectAll)
    const [createDialog, setCreateDialog] = useState(false)


    const handleAddClick = () => {
        setCreateDialog(true)
        // dispatch(addSensor())
    }

    const handleClose = () => {
        setCreateDialog(false)
    }

    return (
        <Block 
            sx={{
                 pt: 5,
                 display: "flex",

            }} 
            height={380} 
            width={420} 
            icon={<FormatListBulletedIcon />}
        >
            <Box
                sx={{
                    overflowY: "auto",
                    flexGrow: 1
                }}
            >
                <TransitionGroup>
                    {sensors.map(sensor => <Collapse key={sensor.id}><Sensor {...sensor} /></Collapse>)}
                </TransitionGroup>
            </Box>
            <Fab sx={{ position: "absolute", bottom: 8, right: 8 }} onClick={handleAddClick}>
                <AddIcon />
            </Fab>
            <EditSensorDialog open={createDialog} onClose={handleClose} />
        </Block>
    )
}