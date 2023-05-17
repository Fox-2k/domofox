import { useState } from 'react'

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Box from "@mui/material/Box"
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
    initialValue: number,
    open: boolean
}

interface valueBlockProps {
    icon: React.ReactNode,
    value: number,
    unit?: string,
    editable?: boolean
}

function EditValueDialog({ onClose, initialValue, open} : EditValueDialogProps) {
    const [value, setValue] = useState(initialValue)

    const handleClose = () => {
        onClose(undefined)
    }

    const handleValidate = () => {
        onClose(value)
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <Paper >
                <DialogTitle sx={{ textAlign: "center", fontSize: 50, p:0 }}>{value}</DialogTitle>
            </Paper>
            <Box sx={{ display: 'flex' }} >
                <Button sx={{ m: 2, minWidth: 150, minHeight: 50 }} variant="contained"><KeyboardDoubleArrowLeftIcon /></Button>
                <Button sx={{ m: 2, minWidth: 150, minHeight: 50 }} variant="contained"><KeyboardDoubleArrowRightIcon /></Button>
            </Box>
            <Box sx={{ display: 'flex' }} >
                <Button sx={{ m: 2, minWidth: 150, minHeight: 50 }} variant="contained"><KeyboardArrowLeftIcon /></Button>
                <Button sx={{ m: 2, minWidth: 150, minHeight: 50 }} variant="contained"><KeyboardArrowRightIcon /></Button>
            </Box>
            <Paper elevation={-3} sx={{ display: 'flex' }} >
                <Button sx={{ m: 2, minWidth: 150, minHeight: 50, backgroundColor: "secondary.main" }} variant="contained"><CancelIcon /></Button>
                <Button sx={{ m: 2, minWidth: 150, minHeight: 50, backgroundColor: "success.main" }} variant="contained"><CheckCircleIcon /></Button>
            </Paper>
        </Dialog>
    )
}

export default function ValueBlock({ icon, value, unit, editable } : valueBlockProps) {
    const [openDialog, setOpenDialog] = useState(false)

    const handleClickOpen = () => {
        console.log("open")
        editable && setOpenDialog(true)
    }

    const handleClose = (newValue: number) => {
        setOpenDialog(false)
        if(newValue != undefined) 
            console.log("close and new value = ", newValue)
        else
            console.log("close and cancelled")

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
            <EditValueDialog initialValue={value} open={openDialog} onClose={handleClose}/>
        </>
    )
}