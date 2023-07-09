import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

type DaysFilterProps = {
    value: number,
    onChange: (event: React.MouseEvent<HTMLElement>, value: number) => void
}

export default function DaysFilter({ value, onChange } : DaysFilterProps) {
    return (
        <ToggleButtonGroup 
            sx={{ padding: 1, display: "flex", justifyContent: "center" }}
            exclusive
            value={value}
            onChange={onChange}
        >
            <ToggleButton value={0} >Mon</ToggleButton>
            <ToggleButton value={1} >Tue</ToggleButton>
            <ToggleButton value={2} >Wed</ToggleButton>
            <ToggleButton value={3} >Thu</ToggleButton>
            <ToggleButton value={4} >Fri</ToggleButton>
            <ToggleButton value={5} >Sat</ToggleButton>
            <ToggleButton value={6} >Sun</ToggleButton>
            <ToggleButton value={7} >All</ToggleButton>
        </ToggleButtonGroup>    
    )
}