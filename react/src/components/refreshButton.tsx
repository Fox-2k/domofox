import ActionButton from "./actionButton";
import RefreshIcon from '@mui/icons-material/Refresh';
import ConfirmDialog from "./confirmDialog";
import { useState } from "react";

export default function RefreshButton() {

    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(true)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    const handleConfirm = () => {
        setOpen(false)
        location.reload()
    }

    return (
        <>
            <ActionButton onClick={handleClick}>
                <RefreshIcon sx={{ fontSize: 36 }} />
            </ActionButton>
            <ConfirmDialog title={"Confirm refresh ?"} open={open} onCancel={handleCancel} onConfirm={handleConfirm}/>
        </>
    )
}