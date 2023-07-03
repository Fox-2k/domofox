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
    
    const [label, setLabel] = useState("")
    const [driver, setDriver] = useState("")
    const [sensorId, setSensorId] = useState("")
    const [weight, setWeight] = useState("1")
    const [calibrationFactor, setCalibrationFactor] = useState("1")
    const [calibrationOffset, setCalibrationOffset] = useState("0")

    useEffect(() => {
        if(open) dispatch(fetchSensors())
    }, [dispatch, open])

    useEffect(() => {
        setLabel(sensor?.label || "")
        setDriver(sensor?.driver || "")
        setSensorId(sensor?.params?.id || "")
        setWeight(sensor?.weight.toString() || "1")
        setCalibrationFactor(sensor?.calibration?.a.toString() || "1")
        setCalibrationOffset(sensor?.calibration?.b.toString() || "0")
    }, [sensor])
    

    const handleClose = () => {
        onClose()
    }

    const handleValidate = () => {
        dispatch(updateSensor({ id, changes: {
            label, 
            driver, 
            params: { id: sensorId }, 
            weight: parseFloat(weight), 
            calibration: {a: parseFloat(calibrationFactor), b: parseFloat(calibrationOffset) || 0 }
        }}))
        onClose()
    }

    return (
        <Dialog fullWidth={true} maxWidth={'md'} onClose={handleClose} open={open}>
            <Box sx={{ p: 1.5 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth margin="normal" label={"Label"} value={label} onChange={event => setLabel(event.target.value)} />
                        <TextField fullWidth margin="normal" label={"Driver"} value={driver} onChange={event => setDriver(event.target.value)} />
                        <TextField fullWidth margin="normal" label={"Sensor id for driver"} value={sensorId} onChange={event => setSensorId(event.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth margin="normal" label={"Weight"} value={weight} onChange={event => setWeight(event.target.value)} inputProps={{ inputMode: 'numeric' }} />
                        <TextField fullWidth margin="normal" label={"Calibration (factor)"} value={calibrationFactor} onChange={event => setCalibrationFactor(event.target.value)} inputProps={{ inputMode: 'numeric' }} />
                        <TextField fullWidth margin="normal" label={"Calibration (offset)"} value={calibrationOffset} onChange={event => setCalibrationOffset(event.target.value)} inputProps={{ inputMode: 'numeric' }} />
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