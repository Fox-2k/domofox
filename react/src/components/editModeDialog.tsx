import Dialog from '@mui/material/Dialog'

interface EditModeDialogProps {
    onClose: Function,
    open: boolean,
    value?: number
}

export default function EditModeDialog({onClose, open, value}: EditModeDialogProps) {

    const handleClose = () => {
        onClose(undefined)
    }

    return (
        <Dialog onClose={handleClose} open={open}>

        </Dialog>
    )
}