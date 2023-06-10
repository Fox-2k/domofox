import ActionButton from "./actionButton";
import RepartitionIcon from '@mui/icons-material/Repartition';
import ConfirmDialog from "./confirmDialog";
import { useState } from "react";
import { useAppDispatch } from "@/hooks";

export default function RebootButton() {

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
        dispatch({ type: "device/reboot"})
    }

    return (
        <>
            <ActionButton onClick={handleClick}>
                <RepartitionIcon sx={{ fontSize: 36 }} />
            </ActionButton>
            <ConfirmDialog title={"Confirm reboot ?"} open={open} onCancel={handleCancel} onConfirm={handleConfirm}/>
        </>
    )
}