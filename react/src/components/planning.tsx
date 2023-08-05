import Box from "@mui/material/Box";
import DaysFilter from "./daysFilter";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import JobList from "./jobList";
import { useAppDispatch } from "@/hooks";
import { fetchPlanning } from "@/features/planning/planningSlice";

export default function Planning() {
  const [dayOfWeek, setDayOfWeek] = useState(7)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPlanning())
  })


  const handleDayOfWeekChange = (event: React.MouseEvent<HTMLElement>, value: number) => {
    setDayOfWeek(value)
  }

  return (
    <>
      <Box sx={{ position: "fixed", width: "100%", zIndex: 1 }} data-cy="pagePlanning" >
        <Paper elevation={1}>
          <DaysFilter value={dayOfWeek} onChange={handleDayOfWeekChange} />
        </Paper>
      </Box>
      <JobList dayOfWeek={dayOfWeek} />
    </>
  )
}