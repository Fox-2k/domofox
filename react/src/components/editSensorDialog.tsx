import { Box, Button, Dialog, Grid, Paper } from "@mui/material";
import TextField from '@mui/material/TextField'
import { useEffect, useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchSensors, selectById, updateSensor } from "@/features/sensors/sensorsSlice";

interface EditSensorDialogProps {
    id: string,
    onClose: Function,
    open: boolean
}

export default function EditSensorDialog({id, onClose, open}: EditSensorDialogProps) {

    const sensor = useAppSelector(state => selectById(state, id))
    const dispatch = useAppDispatch();
    
    const [label, setLabel] = useState(sensor?.label || "")
    const [driver, setDriver] = useState(sensor?.driver || "")
    const [sensorId, setSensorId] = useState(sensor?.params?.id || "")
    const [weight, setWeight] = useState(sensor?.weight || 1)
    const [calibrationFactor, setCalibrationFactor] = useState(sensor?.calibration?.a || 1)
    const [calibrationOffset, setCalibrationOffset] = useState(sensor?.calibration?.b || 0)

    useEffect(() => {
        if(open) dispatch(fetchSensors())
    }, [dispatch, open])

    useEffect(() => {
        setLabel(sensor?.label || "")
        setDriver(sensor?.driver || "")
        setSensorId(sensor?.params?.id || "")
        setWeight(sensor?.weight || 1)
        setCalibrationFactor(sensor?.calibration?.a || 1)
        setCalibrationOffset(sensor?.calibration?.b || 0)
    }, [sensor])
    

    const handleClose = () => {
        onClose()
    }

    const handleValidate = () => {
        dispatch(updateSensor({ id, changes: {
            label, 
            driver, 
            params: { id: sensorId }, 
            weight, 
            calibration: {a: calibrationFactor, b: calibrationOffset }
        }}))
        onClose()
    }



 

    return (
        <Dialog fullWidth={true} maxWidth={'md'} onClose={handleClose} open={open}>
            <Box sx={{ p: 1.5 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth margin="normal" label={"Label"} value={label} onChange={event => setLabel(event.target.value)} />
                        <TextField fullWidth margin="normal" label={"Driver"} value={driver} onChange={event => setDriver(event.target.value)} />
                        <TextField fullWidth margin="normal" label={"Sensor id for driver"} value={sensorId} onChange={event => setSensorId(event.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth margin="normal" label={"Weight"} value={weight} onChange={event => setWeight(parseFloat(event.target.value) || 0)} inputProps={{ inputMode: 'numeric', pattern: '[\.0-9]*' }} />
                        <TextField fullWidth margin="normal" label={"Calibration (factor)"} value={calibrationFactor} onChange={event => setCalibrationFactor(parseFloat(event.target.value) || 1)} inputProps={{ inputMode: 'numeric' }} />
                        <TextField fullWidth margin="normal" label={"Calibration (offset)"} value={calibrationOffset} onChange={event => setCalibrationOffset(parseFloat(event.target.value) || 0)} inputProps={{ inputMode: 'numeric' }} />
                    </Grid>
                </Grid>
            </Box>
            <Paper sx={{ display: 'flex', justifyContent: 'space-between' }} >
                <Button sx={{ m: 2, minWidth: "40%", minHeight: 60, backgroundColor: "secondary.main" }} variant="contained" onClick={handleClose}><CancelIcon /></Button>
                <Button sx={{ m: 2, minWidth: "40%", minHeight: 60, backgroundColor: "success.main" }} variant="contained" onClick={handleValidate}><CheckCircleIcon /></Button>
            </Paper>
        </Dialog>
    )

}