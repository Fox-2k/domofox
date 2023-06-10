import type { NextPage } from 'next'

import { ThemeProvider, createTheme } from '@mui/material/styles'

import Layout from '@/components/layout'
import Home from '@/components/home'
import Planning from './planning'
import Settings from '../components/settings'

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const IndexPage: NextPage = () => {
  
  return (
    <ThemeProvider theme={darkTheme}>
      <Layout 
        homeContent ={<Home />}
        planningContent ={<Planning />}
        settingsContent ={<Settings />}
      />
    </ThemeProvider>
  )
}

export default IndexPage
