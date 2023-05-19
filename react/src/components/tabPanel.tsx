import Box from '@mui/material/Box'

interface TabPanelProps {
  children?: React.ReactNode,
  showWhen: boolean
}

export default function TabPanel(props: TabPanelProps) {
  const { children, showWhen } = props

  return (
    <div
      role="tabpanel"
      hidden={!showWhen}
    >
      {showWhen && (
        <Box sx={{ p: 1 }}>
          {children}
        </Box>
      )}
    </div>
  )
}