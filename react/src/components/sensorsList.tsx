import Block from "./block";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Sensor from "./sensor";
import Box from "@mui/material/Box";
import { useAppSelector } from "@/hooks";
import { selectAll } from "@/features/sensors/sensorsSlice";

export default function SensorsList() {
    const sensors = useAppSelector(selectAll)

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
        </Block>
    )
}