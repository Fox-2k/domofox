import Box, { BoxProps } from '@mui/material/Box'

interface TabPanelProps {
  children?: React.ReactNode,
  showWhen: boolean
  boxProps?: BoxProps
}

export default function TabPanel(props: TabPanelProps) {
  const { children, showWhen, boxProps } = props

  return (
    <div
      role="tabpanel"
      hidden={!showWhen}
    >
      {showWhen && (
        <Box {...boxProps}>
          {children}
        </Box>
      )}
    </div>
  )
}