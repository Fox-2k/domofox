import Block from "./block";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Sensor from "./sensor";
import Box from "@mui/material/Box";

export default function SensorsList() {
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
                <Sensor />
                <Sensor />
                <Sensor />
                <Sensor />
                <Sensor />
            </Box>
        </Block>
    )
}