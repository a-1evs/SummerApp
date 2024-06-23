"use client"
import React, {useEffect, useRef, useState} from "react"
import EventCard from "@/components/event-card"
import {getSheetData} from "@/app/actions/google-sheets.action"
import {clsx} from "clsx"

// Define a mapping of event types to image URLs
const eventTypeToImageMap = {
    "Console Game": "/images/event-logos/console-game.jpg",
    "Outdoor Activity": "/images/event-logos/outdoor-activity.jpg",
    "LAN Game": "/images/event-logos/lan-game.jpg",
    "Group Viewing/Screening": "/images/event-logos/screening.jpg",
    "Board or Tabletop Game": "/images/event-logos/board-game.jpg",
    "Arts and Crafts": "/images/event-logos/art.jpg",
    "Presentation/Lecture": "/images/event-logos/present.jpg",
    "Joke Event/Other": "/images/event-logos/default.webp",
    "Open Mic Night": "/images/event-logos/",
    "Game of the Week": "/images/event-logos/",
}

interface GroupedByTime {
    [time: string]: string[][]; // Maps a time string to a 2D array of strings (events)
}

export default function EventDisplayComponent({isPrint, dayOverride}: { isPrint?: boolean, dayOverride?: string }) {
    const [sheetData, setSheetData] = useState<string[][]>([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSheetData()

                setSheetData(data) // Update your state with the fetched data
            } catch (error) {
                console.error("Failed to fetch data:", error)
            }
        }

        // Call the async function
        fetchData()
    }, [])

    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // Controls Auto Scroll Effect
    useEffect(() => {
        if (isPrint) {
            return
        }

        const scrollContainer = scrollContainerRef.current
        const scrollSpeed = 2 // Adjust the scroll speed as needed
        if (!scrollContainer) return

        const scroll = () => {
            if (scrollContainer.scrollTop >= scrollContainer.scrollHeight / 2) {
                scrollContainer.scrollTop = 0
            }
            scrollContainer.scrollTop += scrollSpeed
        }

        const interval = setInterval(scroll, 40) // Adjust the interval as needed

        return () => clearInterval(interval)
    }, [scrollContainerRef])

    const currentDayOfWeek = new Date().getDay() // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    let currentDay = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ][currentDayOfWeek]

    if (dayOverride) {
        currentDay = dayOverride
    }

    const eventsForCurrentDay: string[][] = sheetData.filter((data) => {
        return data[1] == currentDay
    }) || {}

    const groupedByTime: GroupedByTime = eventsForCurrentDay.reduce((acc, event) => {
        const time = event[8] // Assuming the 8th element is the event time
        if (!acc[time]) {
            acc[time] = []
        }
        acc[time].push(event)
        return acc
    }, {})

    const sorted = Object.fromEntries(
        Object.entries(groupedByTime).sort((a, b) => {
            if (a[0] === "Dinner Time") {
                return -1
            }
            const now = new Date()
            const [ahours, aminutes] = a[0].split(":").map(Number)
            const aStartTime = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                ahours % 12 + 12,
                aminutes
            )
            const [bhours, bminutes] = b[0].split(":").map(Number)
            const bStartTime = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                bhours % 12 + 12,
                bminutes
            )
            return aStartTime.valueOf() - bStartTime.valueOf()
        })
    )

    //Renders all events, used to achieve scrolling illusion
    const renderEvents = (events: string[][], eventsTime: string) =>
        events.map((event, eventIndex) => {
            const imageUrl =
                eventTypeToImageMap[event[4]] || "/images/default.webp"
            return (
                <EventCard
                    key={eventIndex}
                    title={event[0]}
                    staffNames={event[2] + (event[3] != "NO SECOND STAFF" ? (", " + event[3]) : "")}
                    location={event[6]}
                    imageUrl={imageUrl}
                    time={eventsTime}
                    condensed={isPrint}
                />
            )
        })

    return (
        <div className={clsx(!isPrint && "relative h-screen", isPrint ? "mt-0" : "overflow-hidden")}>
            <div className={clsx(!dayOverride && "hidden")}>
                <p className={"text-2xl mb-"}>{dayOverride}</p>
            </div>

            {" "}
            {/* Container that fills the screen and hides overflow */}
            <div
                ref={scrollContainerRef}
                className={
                    clsx(!isPrint && "absolute top-0 left-0 right-0 bottom-0 overflow-y-scroll")
                }
            >
                {" "}
                {/* Scroll container */}
                <div>
                    {Object.entries(sorted).map(
                        ([time, events], timeIndex) => (
                            <div key={timeIndex} className={clsx(!isPrint && "mb-8")}>
                                <h2 className="text-xl font-bold mb-2">{time}</h2>
                                {events.length > 0 ? (
                                    renderEvents(events, time) // Render events for this time slot
                                ) : (
                                    <p>No events scheduled for this time.</p>
                                )}
                            </div>
                        )
                    )}
                </div>
                <div className={clsx(isPrint && "hidden")}>
                    {Object.entries(sorted).map(
                        ([time, events], timeIndex) => (
                            <div key={timeIndex} className={clsx(isPrint ? "mb-2" : "mb-8")}>
                                <h2 className="text-xl font-bold mb-2">{time}</h2>
                                {events.length > 0 ? (
                                    renderEvents(events, time) // Render events again to create a seamless scrolling effect
                                ) : (
                                    <p>No events scheduled for this time.</p>
                                )}
                            </div>
                        )
                    )}
                </div>
            </div>
            {isPrint && <hr className={"mb-4"} />}
        </div>
    )
}
