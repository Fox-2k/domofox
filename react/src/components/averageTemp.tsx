import { useState } from 'react'

import ThermostatIcon from '@mui/icons-material/Thermostat';
import Block from "./block";
import ValueBlock from '@/components/valueBlock';
import { useAppSelector } from '@/hooks';
import { getAvgTemp } from '@/features/status/statusSlice';

export default function AverageTemp() {
    const avgTemp = useAppSelector(getAvgTemp)
    return (
        <ValueBlock icon={<ThermostatIcon />} value={avgTemp} unit='°C' />
    )
}