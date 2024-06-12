import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export default function EventCard({ title, staffNames, location, imageUrl, isOngoing }) {
  return (
    <Card className={`flex items-center p-4 ${isOngoing ? 'blink' : ''}`}>
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
  );
}

