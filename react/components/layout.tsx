import Head from 'next/head'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import styles from "@/styles/Layout.module.css"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchMode, updateMode, getMode } from "@/reducers/statusSlice"

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children } : { children: React.ReactNode }) {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchMode())
        const timer = setInterval(() => dispatch(fetchMode()), 10000)
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
            <main className={[styles.content, inter.className].join(' ')}>{children}</main>
            <footer className={[styles.footer, inter.className].join(' ')}>
                <Link href="/" >Home</Link>
                <Link href="/planning" >Planning</Link>
                <Link href="/settings" >Settings</Link>
            </footer>
        </>
    )
}