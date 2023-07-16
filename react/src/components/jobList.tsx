import { useState } from "react"
import Job from "./job"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import { useAppSelector } from "@/hooks"
import { selectAll } from "@/features/planning/planningSlice"

type JobListProps = {
    dayOfWeek?: number,
}

export default function JobList({ dayOfWeek }: JobListProps) {
    const jobs = useAppSelector(selectAll)

    const filteredJob = jobs.filter(job => {
        if(dayOfWeek != undefined && dayOfWeek >= 0 && dayOfWeek < 7) return job.days[dayOfWeek]
        else return true
    })

    const OrderedAndFilteredJobs = filteredJob.sort((a,b) => {
        const hourSort = a.time.hour - b.time.hour
        if(hourSort == 0) {
            return a.time.min - b.time.min
        }
        else {
            return hourSort
        }
    })

    return (
        <Stack p={1} py={9} spacing={1}>
            {OrderedAndFilteredJobs.map(job => <Job key={job.id} {...job} />)}
        </Stack>
    )
}