import Box from "@mui/material/Box"
import Clock from '@/components/clock'
import Mode from '@/components/mode'
import AverageTemp from "./averageTemp"
import SetPointTemp from "./setPointTemp"
import Graph from "./graph"

export default function Home() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                padding: 0,  
            }}
            data-cy="pageHome"
        >
            <AverageTemp />
            <SetPointTemp />
            <Mode />
            <Clock />
            <Graph />
        </Box>
    )
}