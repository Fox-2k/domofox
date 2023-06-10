import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import FormControlLabel from '@mui/material/FormControlLabel';
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from "@mui/material/Paper";

export default function Sensor() {

    const label = "mySensor"
    const weightedValueString = "??°C x W"

    return (
        <Paper sx={{ p: 1, m: 1}}>
            <Box 
                sx={{
                    p: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <FormControlLabel control={<Switch />} label={label} />
                <ButtonGroup variant="outlined">
                    <Button><EditIcon /></Button>
                    <Button color="error"><DeleteIcon /></Button>
                </ButtonGroup>
            </Box>
            <Box sx={{ color: "#FFFFFF88" }}>
                {weightedValueString}
            </Box>
        </Paper>
    )
}