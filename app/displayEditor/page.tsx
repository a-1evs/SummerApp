import React from 'react';
import EventCard from "@/components/event-card";

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

  // Renders all events
  const renderEvents = (events, time) => (
    events.map((event, eventIndex) => {
      const imageUrl = eventTypeToImageMap[event.Type] || "/images/default.webp";
      return (
        <EventCard
          key={eventIndex}
          title={event.Name}
          staffNames={event.Staff.join(", ")}
          location={event.Location}
          time={time}
          imageUrl={imageUrl}
        />
      );
    })
  );

  return (
    <div className="h-screen overflow-y-auto pt-24"> {/* Add padding to the top */}
      <div>
        not functional
      </div>
    </div>
  );
}
