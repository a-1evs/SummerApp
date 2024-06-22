"use client"
import React, { useEffect, useRef } from "react";
import EventCard from "@/components/event-card";
import eventData from "/public/event-data/events-final.json";
import { group } from "console";
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
};

export default function EventDisplayComponent({sheetData}) {
  const scrollContainerRef = useRef(null);

  // Controls Auto Scroll Effect
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const scrollSpeed = 2; // Adjust the scroll speed as needed

    const scroll = () => {
      if (scrollContainer.scrollTop >= scrollContainer.scrollHeight / 2) {
        scrollContainer.scrollTop = 0;
      }
      scrollContainer.scrollTop += scrollSpeed;
    };

    const interval = setInterval(scroll, 40); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, []);
  var currentDayOfWeek = new Date().getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  const currentDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][currentDayOfWeek];
  const eventsForCurrentDay = sheetData.filter((data) => {
    return data[1] == currentDay;
  }) || {};

  const groupedByTime = eventsForCurrentDay.reduce((acc, event) => {
    const time = event[8]; // Assuming the 8th element is the event time
    if (!acc[time]) {
      acc[time] = [];
    }
    acc[time].push(event);
    return acc;
  }, {});

  console.log(groupedByTime)

  //Renders all events, used to achive scrolling illusion
  const renderEvents = (events, eventsTime) =>
    events.map((event, eventIndex) => {
      const imageUrl =
        eventTypeToImageMap[event[4]] || "/images/default.webp";
      return (
        <EventCard
          key={eventIndex}
          title={event[0]}
          staffNames={event[2] + ", " + event[3]}
          location={event[6]}
          imageUrl={imageUrl}
          time={eventsTime}
        />
      );
    });

  return (
    <div className="relative h-screen overflow-hidden">
      {" "}
      {/* Container that fills the screen and hides overflow */}
      <div
        ref={scrollContainerRef}
        className="absolute top-0 left-0 right-0 bottom-0 overflow-y-scroll"
      >
        {" "}
        {/* Scroll container */}
        <div>
          {Object.entries(groupedByTime).map(
            ([time, events], timeIndex) => (
              <div key={timeIndex} className="mb-8">
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
        <div>
          {Object.entries(groupedByTime).map(
            ([time, events], timeIndex) => (
              <div key={timeIndex} className="mb-8">
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
    </div>
  );
}
