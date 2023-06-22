import { Box, Dialog, Grid } from "@mui/material";
import TextField from '@mui/material/TextField'
import { useState } from "react";

export default function EditSensorDialog({onClose, open}) {

    const [label, setLabel] = useState("")
    const [driver, setDriver] = useState("")
    const [sensorId, setSensorId] = useState("")
    const [weight, setWeight] = useState(1)
    const [calibrationFactor, setCalibrationFactor] = useState(1)
    const [calibrationOffset, setCalibrationOffset] = useState(0)

    const handleClose = () => {
        onClose()
    }

    const handleValidate = () => {

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
                        <TextField fullWidth margin="normal" label={"Calibration (factor)"} value={calibrationFactor} onChange={event => setCalibrationFactor(parseFloat(event.target.value) || 0)} inputProps={{ inputMode: 'numeric', pattern: '[\-\.0-9]*' }} />
                        <TextField fullWidth margin="normal" label={"Calibration (offset)"} value={calibrationOffset} onChange={event => setCalibrationOffset(parseFloat(event.target.value) || 0)} inputProps={{ inputMode: 'numeric', pattern: '[\-\.0-9]*' }} />
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )

}