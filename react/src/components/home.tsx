import Box from "@mui/material/Box"
import Clock from '@/components/clock';
import Mode from '@/components/mode'
import AverageTemp from "./averageTemp";
import SetPointTemp from "./setPointTemp";

export default function Home() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'    
            }}
        >
            <AverageTemp />
            <SetPointTemp />
            <Clock />
            <Mode />
        </Box>
    )
}