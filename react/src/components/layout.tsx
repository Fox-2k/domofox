import Head from 'next/head'
import { Roboto } from 'next/font/google'

import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"

import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import SettingsIcon from '@mui/icons-material/Settings';

import { useImmediateInterval } from '@/hooks'
import TabPanel from '@/components/tabPanel'

import styles from '@/styles/Home.module.css'


import { fetchAvgTemp, fetchMode, fetchSetpoint } from "@/features/status/statusSlice"
import { fetchHeaterValue } from '@/features/heater/heaterSlice'
import { fetchPos, fetchNeg } from '@/features/hysteresis/hysteresisSlice'
import { fetchAllTraces } from '@/features/traces/tracesSlice'
import { DateTime } from 'luxon'

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ['latin']
})

interface layoutProps {
    homeContent: React.ReactNode,
    planningContent: React.ReactNode,
    settingsContent: React.ReactNode,
}

export default function Layout(props: layoutProps) {
    const dispatch = useDispatch()
    const [tabValue, setTabValue] = useState("Home");

    const refreshRoutine = () => {
        dispatch(fetchMode())
        dispatch(fetchAvgTemp())
        dispatch(fetchSetpoint())
        dispatch(fetchHeaterValue())
        dispatch(fetchPos())
        dispatch(fetchNeg())
        dispatch(fetchAllTraces({ from: DateTime.now().minus({days: 1}).toISO() || "", to: DateTime.now().toISO() || ""}))
    }

    useImmediateInterval(refreshRoutine, 10000)

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    }

    return (
        <>
            <Head>
                <title>DomoFox</title>
                <meta name="description" content="Your home thermostat" />
                <meta name="viewport" content="width=480, user-scalable=no" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={roboto.className}>
                <TabPanel showWhen={tabValue === "Home"} boxProps={{ sx:{ p: 1} }}>
                    {props.homeContent}
                </TabPanel>
                <TabPanel showWhen={tabValue === "Planning"}>
                    {props.planningContent}
                </TabPanel>
                <TabPanel showWhen={tabValue === "Settings"} boxProps={{ sx:{ p: 1} }}>
                    {props.settingsContent}
                </TabPanel>
            </main>
            <footer className={styles.tabsPanel}>
                <BottomNavigation
                    showLabels
                    value={tabValue}
                    onChange={handleTabChange}
                >
                    <BottomNavigationAction data-cy="navHome" label="Home" value="Home" icon={<HomeIcon />} />
                    <BottomNavigationAction data-cy="navPlanning" label="Planning" value="Planning" icon={<EventIcon />} />
                    <BottomNavigationAction data-cy="navSettings" label="Settings" value="Settings" icon={<SettingsIcon />} />
                </BottomNavigation>
            </footer>
        </>
    )
}
