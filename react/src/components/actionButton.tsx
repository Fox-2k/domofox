import styled from '@emotion/styled'
import Fab, { FabProps } from '@mui/material/Fab'

interface actionButtonProps {
    children: React.ReactNode,
    onClick: Function
}

const ActionFab = styled(Fab)<FabProps>(({theme} : {theme: any}) => ({
        background: "#000000AA",
        color: theme.palette.text.primary,
        width: 64,
        height: 64,
        '&:hover': {
            color: "#000",
        },
    }
))

export default function ActionButton({ children, onClick }: actionButtonProps) {
    
    const handleClick = () => {
        onClick && onClick()
    }

    return (
        <ActionFab sx={{ m: 1}} onClick={handleClick}>
            {children}
        </ActionFab> 
    )
}