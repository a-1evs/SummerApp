import React from 'react';
import EventCard from "@/components/event-card";
import eventData from "/public/event-data/events-final.json";

// Define a mapping of event types to image URLs
const eventTypeToImageMap = {
  "Console Game": "/images/event-logos/console-game.jpg",
  "Outdoor Activity": "/images/event-logos/outdoor-activity.jpg",
  "LAN Game": "/images/event-logos/lan-game.jpg",
  "Group Viewing/Screening": "/images/event-logos/screening.jpg",
  "Board or Tabletop Game": "/images/event-logos/board-game.jpg",
  "Arts and Crafts": "/images/event-logos/art.jpg",
  "Presentation/Lecture": "/images/event-logos/present.jpg",
  "Joke Event/Other":"/images/event-logos/default.webp",
  "Open Mic Night": "/images/event-logos/",
  "Game of the Week": "/images/event-logos/"
};

export default function EventDisplay() {
  var currentDayOfWeek = new Date().getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  currentDayOfWeek = 4; // for testing, change to any day of the week you want to test
  const currentDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][currentDayOfWeek];
  const eventsForCurrentDay = eventData[currentDay] || {};

  // Renders all events
  const renderEvents = (events) => (
    events.map((event, eventIndex) => {
      const imageUrl = eventTypeToImageMap[event.Type] || "/images/default.webp";
      return (
        <EventCard
          key={eventIndex}
          title={event.Name}
          staffNames={event.Staff.join(", ")}
          location={event.Location}
          imageUrl={imageUrl}
        />
      );
    })
  );

  return (
    <div className="h-screen overflow-y-auto pt-24"> {/* Add padding to the top */}
      <div>
        {Object.entries(eventsForCurrentDay).map(([time, events], timeIndex) => (
          <div key={timeIndex} className="mb-8">
            <h2 className="text-xl font-bold mb-2">{time}</h2>
            {events.length > 0 ? (
              renderEvents(events)
            ) : (
              <p>No events scheduled for this time.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
