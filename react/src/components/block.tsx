import { SxProps } from "@mui/material"
import Box from "@mui/material/Box"

interface BlockProps {
    sx?: SxProps,
    height?: number
    width?: number,
    children: React.ReactNode,
    icon: React.ReactNode
}

export default function Block({ sx, height, width, children, icon } : BlockProps) {
    return (
        <Box
            sx={{
                position: 'relative',
                bgcolor: '#00000055',
                borderTopLeftRadius: 20,
                borderBottomRightRadius: 20,
                p: 2,
                mx: '10px',
                height: height ?? 180,
                width: width ?? 200,
                color: 'text.primary',
                ...sx
            }}
        >
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
        </Box>   
    )
}