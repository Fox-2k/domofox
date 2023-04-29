import Head from 'next/head'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import styles from "@/styles/Layout.module.css"

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children } : { children: React.ReactNode }) {
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