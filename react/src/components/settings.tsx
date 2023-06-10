import Box from "@mui/material/Box"
import SensorsList from './sensorsList'
import SetHysteresisPos from "./setHysteresisPos"
import SetHysteresisNeg from "./setHysteresisNeg"



export default function Settings() {
  return (
    <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'stretch',
                flexWrap: 'wrap',
                padding: 0,  
                position: 'relative',
            }}
        >
        <SensorsList />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
        }}
        >
          <SetHysteresisPos />
          <SetHysteresisNeg />
        </Box>
    </Box>
  )
}
