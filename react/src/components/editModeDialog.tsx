import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';

interface EditModeDialogProps {
    onClose: Function,
    open: boolean,
    value?: number
}

function ModeIcon({mode}: {mode: number}) {
    switch(mode) {
        case 2:
            return <ThermostatAutoIcon sx={{ fontSize: 50 }} />
        case 1:
            return <TouchAppIcon sx={{ fontSize: 50 }} />
        default:
            return <PowerSettingsNewIcon sx={{ fontSize: 50 }} />
    }
}

export default function EditModeDialog({onClose, open, value}: EditModeDialogProps) {

    const handleClose = () => {
        onClose(undefined)
    }

    const handleValidate = (numMode: number) => {
        onClose(numMode)
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <Box sx={{ p: 3 }}>{
                [0,1,2].map(numMode => (
                    <Fab key={numMode} onClick={() => handleValidate(numMode)} sx={{ m: 2, width: 100, height: 100 }}>
                        <ModeIcon mode={numMode} />
                    </Fab>
                ))
            }</Box>
        </Dialog>
    )
}