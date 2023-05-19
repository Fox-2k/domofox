import { useEffect, useState } from 'react'

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Box from "@mui/material/Box"
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import Block from "./block";


interface EditValueDialogProps {
    onClose: Function,
    value?: number,
    open: boolean
}

interface valueBlockProps {
    icon: React.ReactNode,
    value: number,
    unit?: string,
    onChange?: Function
}

function EditValueDialog({ onClose, value, open} : EditValueDialogProps) {
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

export default function ValueBlock({ icon, value, unit, onChange } : valueBlockProps) {
    const [openDialog, setOpenDialog] = useState(false)
    const editable = !!onChange

    const handleClickOpen = () => {
        editable && setOpenDialog(true)
    }

    const handleClose = (newValue: number) => {
        setOpenDialog(false)
        if(editable && newValue != undefined) {
            onChange(newValue)
        }
    }

    return (
        <>
            <Block 
                icon={icon}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 56,
                    cursor: editable ? "pointer" : "inherit",
                }}
                onClick={editable ? handleClickOpen : undefined }
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: 'baseline',
                    }}
                >
                    <div>{value}</div>
                    <div style={{fontSize: 30}}>{unit ?? ""}</div>
                </Box>
            </Block>
            <EditValueDialog value={value} open={openDialog} onClose={handleClose}/>
        </>
    )
}