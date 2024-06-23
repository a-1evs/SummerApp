"use client"

import {useEffect, useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"

type EventCardProps = {
    title: string
    staffNames: string
    location: string
    imageUrl: string
    time: string
    condensed?: boolean
}

export default function EventCard({title, staffNames, location, imageUrl, time, condensed}: EventCardProps) {
    const [isOngoing, setIsOngoing] = useState(false)

    useEffect(() => {
        const now = new Date()
        const [hours, minutes] = time.split(":").map(Number)
        const eventStartTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hours % 12 + 12,
            minutes
        )
        const eventEndTime = new Date(eventStartTime.getTime() + 15 * 60000) // 15 minutes after start
        let startTimer
        let endTimer

        if (now < eventStartTime) {
            // Schedule event to become active at the start time
            const startDelay = eventStartTime.getTime() - now.getTime()
            startTimer = setTimeout(() => setIsOngoing(true), startDelay)
        } else if (now >= eventStartTime && now < eventEndTime) {
            // If currently within the event time, set as active
            setIsOngoing(true)
        }

        // Schedule event to become inactive 15 minutes after start time
        const endDelay = eventEndTime.getTime() - now.getTime()
        if (endDelay > 0) { // Only set if the end time is in the future
            endTimer = setTimeout(() => setIsOngoing(false), endDelay)
        }

        return () => {
            clearTimeout(startTimer)
            clearTimeout(endTimer)
        }
    }, [time]) // Depend on `time` to re-calculate if it changes

    if (condensed) {
        return <>
            <span><strong>{title}</strong> - Run by {staffNames} in {location}</span>
            <br/>
        </>
    }

    return (
        <Card className={`flex items-center p-4 ${isOngoing ? "blink" : ""}`}>
            <div className="w-16 h-16 p-1 border border-gray-300 rounded bg-white mr-4">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="flex-1">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>
                        <strong>Run by:</strong> {staffNames}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{location}</p>
                </CardContent>
            </div>
        </Card>
    )
}

