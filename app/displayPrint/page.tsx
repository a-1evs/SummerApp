import React from "react"
import EventDisplayComponent from "@/components/displayPage"

export default async function EventDisplayPrint() {
    return (
        <>
            <EventDisplayComponent isPrint dayOverride={"Monday"}/>
            <EventDisplayComponent isPrint dayOverride={"Tuesday"}/>
            <EventDisplayComponent isPrint dayOverride={"Wednesday"}/>
            <EventDisplayComponent isPrint dayOverride={"Thursday"}/>
            <EventDisplayComponent isPrint dayOverride={"Friday"}/>
        </>
    )
}
