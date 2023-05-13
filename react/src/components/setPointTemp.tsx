import { useState } from 'react'

import ValueBlock from "./valueBlock";
import EditIcon from '@mui/icons-material/Edit';

export default function SetPointTemp() {
    const [virtualTemp, setVirtualTemp] = useState(17)

    return (
        <ValueBlock icon={<EditIcon />} value={20.1} unit="°C" editable={true} />
    )
}