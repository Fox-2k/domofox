import Job from "./job"
import Box from "@mui/material/Box"
import { useAppSelector } from "@/hooks"
import { selectAll } from "@/features/planning/planningSlice"
import { TransitionGroup } from 'react-transition-group';
import { Collapse, styled } from "@mui/material"

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
        <Box p={1} py={9}>
            <StyledTransitionGroup>
                {OrderedAndFilteredJobs.map(job => 
                    <Collapse key={job.id}>
                        <Job  {...job} />
                    </Collapse>
                )}
            </StyledTransitionGroup>
        </Box>
    )
}

const StyledTransitionGroup = styled(TransitionGroup)({
    display: "flex",
    flexDirection: "column",
    gap: "8px",
})