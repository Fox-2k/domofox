import ActionButton from "./actionButton";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ConfirmDialog from "./confirmDialog";
import { useState } from "react";
import { useAppDispatch } from "@/hooks";

export default function ShutdownButton() {

    const [open, setOpen] = useState(false)
    const dispatch = useAppDispatch()

    const handleClick = () => {
        setOpen(true)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    const handleConfirm = () => {
        setOpen(false)
        dispatch({ type: "device/shutdown"})
    }

    return (
        <>
            <ActionButton onClick={handleClick}>
                <PowerSettingsNewIcon sx={{ fontSize: 36 }} />
            </ActionButton>
            <ConfirmDialog title={"Confirm shutdown ?"} open={open} onCancel={handleCancel} onConfirm={handleConfirm}/>
        </>
    )
}