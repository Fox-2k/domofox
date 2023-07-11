import { SxProps } from "@mui/material";
import styled from '@emotion/styled'
import ToggleButton, { ToggleButtonProps } from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useEffect, useState } from "react";

const DAYSLABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const StyledToggleButton = styled(ToggleButton)<ToggleButtonProps>(({theme}: { theme: any }) => ({
    padding: "1px 12px 0px 12px",
    borderRadius: 10,
    fontSize: 10,
    fontWeight: "bold"
}))

type DaysSelectorProps = {
    sx?: SxProps,
    value: boolean[],
    onChange: Function,
}

function convertToBooleanDaysArray(daysArray: string[]): boolean[] {
    return [
        daysArray.includes("Mon"),
        daysArray.includes("Tue"),
        daysArray.includes("Wed"),
        daysArray.includes("Thu"),
        daysArray.includes("Fri"),
        daysArray.includes("Sat"),
        daysArray.includes("Sun"),
    ]
}

function convertToStringDaysArray(bDaysArray: boolean[]): string[] {
    return DAYSLABELS.map((day, index) => bDaysArray[index] ? day : null).filter(day => day) as string[]
}

export default function DaysSelector({ sx, value, onChange }: DaysSelectorProps) {
    const [days, setDays] = useState([] as string[])

    useEffect(() => {
        setDays(convertToStringDaysArray(value))
    }, [value])
    
    const handleChange = (event: React.MouseEvent<HTMLElement>, values: string[]) => {
        setDays(values)
        onChange(convertToBooleanDaysArray(values))
    }

    return (
        <ToggleButtonGroup sx={sx} size="small" color="success" value={days} onChange={handleChange}>
              <StyledToggleButton value={"Mon"} >Mon</StyledToggleButton>
              <StyledToggleButton value={"Tue"} >Tue</StyledToggleButton>
              <StyledToggleButton value={"Wed"} >Wed</StyledToggleButton>
              <StyledToggleButton value={"Thu"} >Thu</StyledToggleButton>
              <StyledToggleButton value={"Fri"} >Fri</StyledToggleButton>
              <StyledToggleButton value={"Sat"} >Sat</StyledToggleButton>
              <StyledToggleButton value={"Sun"} >Sun</StyledToggleButton>
        </ToggleButtonGroup>
    )
}

