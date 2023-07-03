import Block from "./block";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Sensor from "./sensor";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectAll, addSensor } from "@/features/sensors/sensorsSlice";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function SensorsList() {
    const dispatch = useAppDispatch()
    const sensors = useAppSelector(selectAll)


    const handleAddClick = () => {
        // dispatch(addSensor())
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
                {sensors.map(sensor => <Sensor key={sensor.id} {...sensor} />)}
            </Box>
            <Fab sx={{ position: "absolute", bottom: 8, right: 8 }} onClick={handleAddClick}>
                <AddIcon />
            </Fab>
        </Block>
    )
}