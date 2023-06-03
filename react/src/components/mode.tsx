import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { updateMode, getMode } from '@/features/status/statusSlice'
import { getHeaterValue } from '@/features/heater/heaterSlice';

import Fab from '@mui/material/Fab'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

import TuneIcon from '@mui/icons-material/Tune';
import Block from '@/components/block'
import Typography from '@mui/material/Typography';
import EditModeDialog from './editModeDialog';


export default function Mode() {
    const [openDialog, setOpenDialog] = useState(false)
    const mode = useAppSelector(getMode)
    const heater = useAppSelector(getHeaterValue)
    const dispatch = useAppDispatch()

    const handleClick = () => {
        setOpenDialog(true)
    }

    const handleClose = (newMode?: number) => {
        setOpenDialog(false)
        if(newMode != undefined && mode != newMode) dispatch(updateMode(newMode))
    }

    return (
        <Block
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: 'center',
                justifyContent: 'space-evenly',
            }}
            icon={<TuneIcon />}
        >
            {heater && <LocalFireDepartmentIcon sx={{ position: "absolute", fontSize: 42, top: 12 }} />}
            <Fab onClick={handleClick}>
                {[<PowerSettingsNewIcon key="0" />, <TouchAppIcon key="1" />, <ThermostatAutoIcon key="2" />][mode || 0] || <ThermostatAutoIcon />}
            </Fab>
            <EditModeDialog onClose={handleClose} open={openDialog} value={mode} />
        </Block>
    )
}