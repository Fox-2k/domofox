import Head from 'next/head'
import { Roboto } from 'next/font/google'
// import Link from 'next/link'
import { useRouter } from "next/router"

import { useDispatch } from "react-redux"
import {useState, useEffect } from "react"

import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import SettingsIcon from '@mui/icons-material/Settings';

import { fetchMode, updateMode, getMode } from "@/reducers/statusSlice"
import styles from "@/styles/Layout.module.css"

const roboto = Roboto({ 
    weight: ["300","400","500","700"],
    subsets: ['latin']
})

export default function Layout({ children } : { children: React.ReactNode }) {
    const dispatch = useDispatch()
    const router = useRouter()
    const [routeValue, setRouteValue] = useState(0)

    const refreshRoutine = () => {
        dispatch(fetchMode())
    }
    
    useEffect(() => {
        refreshRoutine()
        const timer = setInterval(refreshRoutine, 10000)
        return () => clearInterval(timer)
    }, [])

    return (
        <>
            <Head>
                <title>DomoFox</title>
                <meta name="description" content="Your home thermostat" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={[styles.content, roboto.className].join(' ')}>{children}</main>
            <footer className={[styles.footer, roboto.className].join(' ')}>
                <BottomNavigation
                    showLabels
                    value={routeValue}
                    onChange={(event, newValue) => {
                        console.log(newValue)
                        setRouteValue(newValue)
                        if(newValue === 1) router.push("/planning")
                        else if(newValue === 2) router.push("/settings")
                        else router.push("/")
                    }}
                >
                    <BottomNavigationAction label="Home" icon={<HomeIcon />}/>
                    <BottomNavigationAction label="Planning" icon={<EventIcon />}/>
                    <BottomNavigationAction label="Settings" icon={<SettingsIcon />}/>
                </BottomNavigation>
                {/* <Link href="/" >Home</Link>
                <Link href="/planning" >Planning</Link>
                <Link href="/settings" >Settings</Link> */}
            </footer>
        </>
    )
}
