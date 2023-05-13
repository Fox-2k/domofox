import { useState } from 'react'

import ThermostatIcon from '@mui/icons-material/Thermostat';
import Block from "./block";
import ValueBlock from '@/components/valueBlock';

export default function AverageTemp() {
    const [virtualTemp, setVirtualTemp] = useState(17)
    return (
        <ValueBlock icon={<ThermostatIcon />} value={virtualTemp} unit='°C' editable={false} />
    )
}