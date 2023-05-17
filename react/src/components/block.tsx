import { SxProps } from "@mui/material"
import Box from "@mui/material/Box"
import Button, { ButtonProps } from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { purple } from '@mui/material/colors';
import { MouseEventHandler } from "react"

interface BlockProps {
    sx?: SxProps,
    height?: number
    width?: number,
    children: React.ReactNode,
    icon: React.ReactNode,
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const BlockButton = styled(Button)<ButtonProps>(({theme}) => ({
    background: "repeating-linear-gradient(0deg, #00000088, #00000055 20%, #00000055 80%, #00000088)",
    '&:hover': {
        backgroundColor: "#000000AA",
    },
}))

export default function Block({ sx, height, width, children, icon, onClick } : BlockProps) {
    const customSx: SxProps = {
        position: 'relative',
        bgcolor: onClick ? "transparent" : '#00000055',
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        p: 2,
        mx: '10px',
        height: height ?? 180,
        width: width ?? 200,
        color: 'text.primary',
        ":hover": "inherit",
        ...sx
    }

    const container = (content: React.ReactNode) => {
        return onClick ? <BlockButton sx={customSx} onClick={onClick}>{content}</BlockButton> : <Box sx={customSx}>{content}</Box>
    }

    return container(
        <>
            <Box
                sx={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',   
                    top: -10,
                    right: -10,
                    height: 40,
                    width: 40,
                    background: 'linear-gradient(0deg,#400000,maroon)',
                    borderRadius: 2,
                    textAlign: 'center'
                }}
            >
                {icon}
            </Box>
            {children}
        </>
    )
}