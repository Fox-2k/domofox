import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import Button from "@mui/material/Button";

interface confirmDialogProps {
    onCancel?: Function,
    onConfirm: Function,
    open: boolean,
    title?: string
}

export default function ConfirmDialog({onCancel, onConfirm, open, title}: confirmDialogProps) {
    
    const handleConfirm = () => {
        onConfirm && onConfirm()
    }

    const handleClose = () => {
        onCancel && onCancel()
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <Paper sx={{ minWidth: "300px" }} >
                <DialogTitle >{title || "Confirm ?"}</DialogTitle>
            </Paper>
            <Paper sx={{ display: 'flex', justifyContent: 'space-between' }} >
                <Button sx={{ m: 2, minWidth: "40%", minHeight: 60, backgroundColor: "secondary.main" }} variant="contained" onClick={handleClose}><CancelIcon /></Button>
                <Button sx={{ m: 2, minWidth: "40%", minHeight: 60, backgroundColor: "success.main" }} variant="contained" onClick={handleConfirm}><CheckCircleIcon /></Button>
            </Paper>
        </Dialog>
    )
}