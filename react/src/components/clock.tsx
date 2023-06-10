import { useRef, useEffect, useState } from 'react'

import Block from "./block";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Typography from '@mui/material/Typography';


function setImmediateInterval(fn: () => void, delay: number): NodeJS.Timer {
    if(typeof fn === "function") fn()
    return setInterval(fn, delay)
}

export default function Clock() {
    const timer = useRef<NodeJS.Timer>()
    const [dateTime, setDateTime] = useState({
        date: "--:--:--",
        time: "--/--/----",
    })

    const updateTime = () => {
        const now = new Date()
        setDateTime({
            time: now.toLocaleTimeString(),
            date: now.toLocaleDateString()
        })
    }

    useEffect(() => {
        timer.current = setImmediateInterval(updateTime,1000)
        return () => clearTimeout(timer.current)
    }, [])

    return (
        <Block 
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: 'center',
                justifyContent: 'center',
                
            }}
            icon={<AccessTimeIcon />}
        >
            <div style={{marginBottom: '10px', fontWeight: "400", fontSize: 42}}>{dateTime.time}</div>
            <div style={{marginBottom: '10px', fontWeight: "400", fontSize: 30}}>{dateTime.date}</div>
        </Block>
    )
}