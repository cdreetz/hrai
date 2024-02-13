"use client"

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import "./DatePage.css"; // Assuming you move the CSS to a separate file

function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date("2024-03-14"));

  return (
    <Calendar
      mode="single"
      selected={date}
      className="flex rounded-md border calendar-demo"
    />
  );
}

function EventDetails() {
  return (
    <div className="bg-white p-6 rounded-md shadow-md event-details">
      <div className="flex justify-between items-start mb-4 border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold">San Antonio Data Science</h2>
          <p className="text-sm text-gray-500">March Meetup</p>
        </div>
      </div>
      <div className="my-4 border-b border-gray-200 pb-4">
        <h4 className="font-semibold">Details:</h4>
        <ul className="list-disc pl-4 space-y-1">
          <li className="text-sm">Date: March 14th 2024</li>
          <li className="text-sm">Time: 6:30PM - 8:00PM</li>
          <li className="text-sm">Location: UTSA`s San Pedro I</li>
          <li className="text-sm">Address: 506 Dolorosa St, San Antonio, TX</li>
        </ul>
      </div>
      <div className="my-4 pb-4">
        <h3 className="text-lg font-semibold">Description</h3>
        <p className="text-sm text-gray-500">This month`s event will be a tech talk by speaker Wes Etheredge.</p>
        <p className="text-sm text-gray-500">Wes has more than 15 years in the industry at organizations like the DoD, USAA, Google, and Wells Fargo. He will be giving a talk on `Fails at Scale`, some of the biggest failures he has seen data practitioners make in the field during his time.</p>
      </div>
    </div>
  );
}

export default function DatePage() {
  return (
    <div className="date-page-container">
      <EventDetails />
      <CalendarDemo />
    </div>
  );
}
