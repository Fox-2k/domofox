import { useEffect, useState } from 'react'

import Box from "@mui/material/Box"

import Block from "@/components/block";
import EditValueDialog from "@/components/editValueDialog"

interface valueBlockProps {
    icon: React.ReactNode,
    value: number,
    unit?: string,
    onChange?: Function
}

export default function ValueBlock({ icon, value, unit, onChange } : valueBlockProps) {
    const [openDialog, setOpenDialog] = useState(false)
    const editable = !!onChange

    const handleClickOpen = () => {
        editable && setOpenDialog(true)
    }

    const handleClose = (newValue?: number) => {
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
                    <div>{Math.round(value * 10) / 10}</div>
                    <div style={{fontSize: 30}}>{unit ?? ""}</div>
                </Box>
            </Block>
            <EditValueDialog value={value} open={openDialog} onClose={handleClose}/>
        </>
    )
}