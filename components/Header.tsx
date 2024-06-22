"use client";
import React, { useEffect, useState } from 'react';
import Weather from "@/components/Weather";
import Image from 'next/image'; // Import Image from next/image

const getWeek = () => {
  const startOfWeekA = new Date('2024-06-23T00:00:00');
  const now = new Date();
  const msInWeek = 7 * 24 * 60 * 60 * 1000;

  if (now < startOfWeekA) {
    return 'Z';
  }

  const weekNumber = Math.floor((now.getTime() - startOfWeekA.getTime()) / msInWeek);
  const weeks = ['A', 'B', 'C', 'D', 'E', 'F'];
  return weeks[weekNumber] || 'Z';
};

const getDaySuffix = (day) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

const formatDate = (date) => {
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  const day = date.getDate();
  return formattedDate.replace(day, `${day}${getDaySuffix(day)}`);
};

const Header = () => {
  const [week, setWeek] = useState<string>();
  const [day, setDay] = useState<string>();
  const [time, setTime] = useState<string>();

  useEffect(() => {
    const timer = setInterval(
      () => {
        setWeek(getWeek());
        setDay(formatDate(new Date()));
        setTime(new Date().toLocaleTimeString());
      }, 1000);
    return () => clearInterval(timer);
  }, []);

  
  
  const sizeFactor = 1.5
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-800 text-white p-6 flex justify-between items-center z-50">
      <div className="flex items-center">
        <div className="mr-4 flex-shrink-0">
          <Image src="/images/logo.png" alt="Camp Logo" width={78 * sizeFactor} height={64 * sizeFactor} className="h-16" />
        </div>
        <div>
          <h1 className="text-4xl font-bold ml-2 mt-6" style={{ color: '#FCBD56' }}>
            <span style={{color: '#FCBD56'}}>Week</span> 
            <span style={{color: '#1F748F'}}> {week}</span>
            </h1>
        </div>
      </div>
      <div className="text-center">
        <div>{day}</div>
        <div>{time}</div>
      </div>
      <div className="flex-right">
        <Weather />
    </div>
    </header>
  );
};

export default Header;
