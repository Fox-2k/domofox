import type { NextPage } from 'next'

import { ThemeProvider, createTheme } from '@mui/material/styles'

import Layout from '@/components/layout'
import Mode from '@/components/mode'

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const IndexPage: NextPage = () => {
  
  return (
    <ThemeProvider theme={darkTheme}>
      <Layout 
        homeContent ={<Mode />}
        planningContent ={<h1>Planning</h1>}
        settingsContent ={<h2>Settings</h2>}
      />
    </ThemeProvider>
  )
}

export default IndexPage
