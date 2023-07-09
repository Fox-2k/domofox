import Paper from "@mui/material/Paper";

type JobProps = {
    id: string
}

export default function Job({ id }: JobProps) {

    return (
        <Paper sx={{ p: 1, height: 100}}>
            a job card : {`${id}`}
        </Paper>
    )
}