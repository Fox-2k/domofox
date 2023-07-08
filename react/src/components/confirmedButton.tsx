import Button, { ButtonProps } from "@mui/material/Button";
import ConfirmDialog from "./confirmDialog";
import { MouseEvent, useState } from "react";

type ConfirmedButton = ButtonProps & {
    prompt?: string
}

export default function ConfirmedButton({prompt, children, onClick, ...otherButtonProps}: ConfirmedButton) {
    
    const [open, setOpen] = useState(false)
    let clickEvent: MouseEvent<HTMLButtonElement>

    const onButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        clickEvent = event
        setOpen(true)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    const handleConfirm = () => {
        if(onClick) onClick(clickEvent)
        setOpen(false)
    }

    return (
        <>
            <Button onClick={onButtonClick} {...otherButtonProps}>
                {children}
            </Button>
            <ConfirmDialog title={prompt || "Confirm ?"} open={open} onCancel={handleCancel} onConfirm={handleConfirm}/>
        </>
    )
}

