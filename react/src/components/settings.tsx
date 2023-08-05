import Box from "@mui/material/Box"
import SensorsList from './sensorsList'
import SetHysteresisPos from "./setHysteresisPos"
import SetHysteresisNeg from "./setHysteresisNeg"
import RefreshButton from "./refreshButton"
import RebootButton from "./rebootButton"
import ShutdownButton from "./shutdownButton"
import { useEffect } from "react"
import { useAppDispatch } from "@/hooks"
import { fetchSensors } from "@/features/sensors/sensorsSlice"



export default function Settings() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSensors())
  })

  return (
    <Box
            sx={{
                display: 'flex',
                flexDirection: ['column', 'row'],
                justifyContent: 'center',
                alignItems: ['center', 'stretch'],
                flexWrap: 'wrap',
                padding: 0,  
                position: 'relative',
            }}
            data-cy="pageSetting"
        >
        <SensorsList />
        <Box
          sx={{
            display: 'flex',
            flexDirection: [null, 'column'],
            justifyContent: 'space-evenly',
        }}
        >
          <SetHysteresisPos />
          <SetHysteresisNeg />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: [null, 'column'],
            justifyContent: 'flex-start',
            padding: 2
        }}
        >
          <RefreshButton />
          <RebootButton />
          <ShutdownButton />
        </Box>
    </Box>
  )
}
