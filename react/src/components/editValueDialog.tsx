import { useEffect, useState } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'


interface EditValueDialogProps {
    onClose: Function,
    value?: number,
    open: boolean
}

export default function EditValueDialog({ onClose, value, open} : EditValueDialogProps) {
    const [localValue, setLocalValue] = useState(value || 0)

    useEffect(() => {
        if(open) setLocalValue(value || 0)
    }, [open])

    const handleClose = () => {
        onClose(undefined)
    }

    const handleValidate = () => {
        onClose(localValue)
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <Paper >
                <DialogTitle sx={{ textAlign: "center", fontSize: 50, p:0 }}>{localValue}</DialogTitle>
            </Paper>
            <Grid container justifyContent="center">
                <Grid item >
                    <Button sx={{ m: 2, minWidth: 150, minHeight: 60 }} variant="contained" onClick={() => setLocalValue(Math.round(10 * (localValue - 1)) / 10)}><KeyboardDoubleArrowLeftIcon /></Button>
                </Grid>
                <Grid item order={{ sm: 4 }}>
                    <Button sx={{ m: 2, minWidth: 150, minHeight: 60 }} variant="contained" onClick={() => setLocalValue(Math.round(10 * (localValue + 1)) / 10)}><KeyboardDoubleArrowRightIcon /></Button>
                </Grid>
                <Grid item >
                    <Button sx={{ m: 2, minWidth: 75, minHeight: 60 }} variant="contained" onClick={() => setLocalValue(Math.round(10 * (localValue - 0.1)) / 10)}><KeyboardArrowLeftIcon /></Button>
                </Grid>
                <Grid item >
                    <Button sx={{ m: 2, minWidth: 75, minHeight: 60 }} variant="contained" onClick={() => setLocalValue(Math.round(10 * (localValue + 0.1)) / 10)}><KeyboardArrowRightIcon /></Button>
                </Grid>
                
            </Grid>
            <Paper sx={{ display: 'flex', justifyContent: 'space-between' }} >
                <Button sx={{ m: 2, minWidth: "40%", minHeight: 60, backgroundColor: "secondary.main" }} variant="contained" onClick={handleClose}><CancelIcon /></Button>
                <Button sx={{ m: 2, minWidth: "40%", minHeight: 60, backgroundColor: "success.main" }} variant="contained" onClick={handleValidate}><CheckCircleIcon /></Button>
            </Paper>
        </Dialog>
    )
}