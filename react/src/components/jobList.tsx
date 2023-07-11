import { useState } from "react"
import Job from "./job"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import { useAppSelector } from "@/hooks"
import { selectAll } from "@/features/planning/planningSlice"


export default function JobList() {
    const jobs = useAppSelector(selectAll)
    return (
        <Stack p={1} pt={9} spacing={1}>
            {jobs.map(job => <Job key={job.id} {...job} />)}
        </Stack>
    )
}