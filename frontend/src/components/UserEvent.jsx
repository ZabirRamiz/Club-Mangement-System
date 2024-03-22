import React, { useState } from 'react';

// Event component to display each event
function Event({ name, location, date, image }) {
  return (
    <div className="bg-gray-200 text-gray-800 shadow-lg rounded-md p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <img src={image} alt={name} className="w-full h-32 object-cover mb-2 rounded-md" />
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Date:</strong> {date}</p>
    </div>
  );
}

// Main component representing the events page
function EventsPage() {
  // Sample event data
  const upcomingEvents = [
    { name: "Birthday Party", location: "123 Main St", date: "January 1, 2024" },
    { name: "Concert", location: "456 Elm St", date: "February 15, 2024" },
    { name: "Conference", location: "789 Oak St", date: "March 30, 2024" }
  ];

  const allEvents = [
    { name: "Event 1", location: "123 Main St", date: "January 1, 2024", image: "https://via.placeholder.com/300" },
    { name: "Event 2", location: "456 Elm St", date: "February 15, 2024", image: "https://via.placeholder.com/300" },
    { name: "Event 3", location: "789 Oak St", date: "March 30, 2024", image: "https://via.placeholder.com/300" },
    { name: "Event 4", location: "10 Pine St", date: "April 5, 2024", image: "https://via.placeholder.com/300" },
    { name: "Event 5", location: "789 Elm St", date: "May 20, 2024", image: "https://via.placeholder.com/300" },
    { name: "Event 6", location: "555 Maple St", date: "June 10, 2024", image: "https://via.placeholder.com/300" }
  ];

  // State to manage the visibility of the upcoming events box
  const [showEvents, setShowEvents] = useState(false);

  return (
    <div className="container mx-auto mt-8">
      <div className="relative mb-8">
        <div className="bg-gray-800 text-white py-3 px-4 rounded-t-md cursor-pointer flex justify-between shadow-lg" onClick={() => setShowEvents(!showEvents)}>
          <h1 className="text-3xl font-bold">Upcoming Events</h1>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {showEvents && (
          <div className="bg-gray-700 shadow-lg rounded-b-md p-4">
            <div className="grid grid-cols-1 gap-4">
              {upcomingEvents.map((event, index) => (
                <Event key={index} {...event} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        <div className="bg-gray-800 text-white py-3 px-4 rounded-t-md">
          <h1 className="text-3xl font-bold">All Events</h1>
        </div>
        <div className="bg-gray-700 shadow-lg rounded-b-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {allEvents.map((event, index) => (
              <Event key={index} {...event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsPage;





