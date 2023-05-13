import { useState } from 'react'

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Box from "@mui/material/Box"
import Button from '@mui/material/Button';

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
            <DialogTitle sx={{ textAlign: "center", fontSize: 50, p:0 }}>{value}</DialogTitle>
            <Box sx={{ display: 'flex' }} >
                <Button sx={{ m: 2, minWidth: 150, minHeight: 50 }} variant="contained">--</Button>
                <Button sx={{ m: 2, minWidth: 150, minHeight: 50 }} variant="contained">++</Button>
            </Box>
            <Box sx={{ display: 'flex' }} >
                <Button sx={{ m: 2, minWidth: 150, minHeight: 50 }} variant="contained">-</Button>
                <Button sx={{ m: 2, minWidth: 150, minHeight: 50 }} variant="contained">+</Button>
            </Box>
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
            <Button onClick={handleClickOpen}>
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
            </Button>
            <EditValueDialog initialValue={value} open={openDialog} onClose={handleClose}/>
        </>
    )
}