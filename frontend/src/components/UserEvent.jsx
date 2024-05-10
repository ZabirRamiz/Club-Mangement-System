// import React, { useState } from 'react';

// // Event component to display each event
// function Event({ name, location, date, image }) {
//   return (
//     <div className="bg-white text-gray-800 shadow-md rounded-md p-2 md:p-4 mb-4">
//       <h2 className="text-lg font-bold mb-2">{name}</h2>
//       {image && <img src={image} alt={name} className="w-full h-32 object-cover mb-2 rounded-md" />}
//       <p><strong>Location:</strong> {location}</p>
//       <p><strong>Date:</strong> {date}</p>
//     </div>
//   );
// }

// // Main component representing the events page
// function EventsPage() {
//   // Sample event data
//   const upcomingEvents = [
//     { name: "Birthday Party", location: "123 Main St", date: "January 1, 2024" },
//     { name: "Concert", location: "456 Elm St", date: "February 15, 2024" },
//     { name: "Conference", location: "789 Oak St", date: "March 30, 2024" }
//   ];

//   const allEvents = [
//     { name: "Event 1", location: "123 Main St", date: "January 1, 2024", image: "https://via.placeholder.com/300" },
//     { name: "Event 2", location: "456 Elm St", date: "February 15, 2024", image: "https://via.placeholder.com/300" },
//     { name: "Event 3", location: "789 Oak St", date: "March 30, 2024", image: "https://via.placeholder.com/300" },
//     { name: "Event 4", location: "10 Pine St", date: "April 5, 2024", image: "https://via.placeholder.com/300" },
//     { name: "Event 5", location: "789 Elm St", date: "May 20, 2024", image: "https://via.placeholder.com/300" },
//     { name: "Event 6", location: "555 Maple St", date: "June 10, 2024", image: "https://via.placeholder.com/300" }
//   ];

//   // State to manage the visibility of the upcoming and all events boxes
//   const [showUpcomingEvents, setShowUpcomingEvents] = useState(true);
//   const [showAllEvents, setShowAllEvents] = useState(true);

//   return (
//     <div className="min-h-screen" style={{ backgroundImage: 'url("https://png.pngtree.com/background/20210716/original/pngtree-light-blue-cute-striped-baby-blue-background-picture-image_1348681.jpg")', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
//       <div className="container mx-auto pt-8">
//         <div className="relative mb-8">
//           <div className="bg-white text-gray-800 py-3 px-4 rounded-t-md cursor-pointer flex justify-between shadow-md" onClick={() => setShowUpcomingEvents(!showUpcomingEvents)}>
//             <h1 className="text-2xl font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>Upcoming Events</h1>
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showUpcomingEvents ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
//             </svg>
//           </div>
//           {showUpcomingEvents && (
//             <div className="bg-gray-100 shadow-md rounded-b-md p-2 md:p-4">
//               <div className="grid grid-cols-1">
//                 {upcomingEvents.map((event, index) => (
//                   <Event key={index} {...event} />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="relative">
//           <div className="bg-white text-gray-800 py-3 px-4 rounded-t-md cursor-pointer flex justify-between shadow-md" onClick={() => setShowAllEvents(!showAllEvents)}>
//             <h1 className="text-2xl font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>All Events</h1>
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showAllEvents ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
//             </svg>
//           </div>
//           {showAllEvents && (
//             <div className="bg-gray-100 shadow-md rounded-b-md p-4">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {allEvents.map((event, index) => (
//                   <Event key={index} {...event} />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EventsPage;



import React, { useState, useEffect } from 'react';

// Event component to display each event
function Event({ title, date,time,venue,guests,pr, image }) {
  return (
    <div className="bg-white text-gray-800 shadow-md rounded-md p-2 md:p-4 mb-4">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      {image && <img src={image} alt={title} className="w-full h-32 object-cover mb-2 rounded-md" />}
      <p><strong>Venue:</strong> {venue}</p>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Time:</strong> {time}</p>
      <p><strong>Guests:</strong> {guests}</p>
      <p><strong>Pr:</strong> {pr}</p>
    </div>
  );
}

// Main component representing the events page
function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [showUpcomingEvents, setShowUpcomingEvents] = useState(true);
  const [showPastEvents, setShowPastEvents] = useState(true);

  useEffect(() => {
    // Fetch upcoming events
    fetch('http://localhost:4000/api/events/getUpcomingEvents')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setUpcomingEvents(data))
      .catch(error => console.error('Error fetching upcoming events:', error));

    // Fetch past events
    fetch('http://localhost:4000/api/events/getPastEvents')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setPastEvents(data))
      .catch(error => console.error('Error fetching past events:', error));
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundImage: 'url("https://png.pngtree.com/background/20210716/original/pngtree-light-blue-cute-striped-baby-blue-background-picture-image_1348681.jpg")', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
      <div className="container mx-auto pt-8">
        {/* Upcoming Events */}
        <div className="relative mb-8">
          <div className="bg-white text-gray-800 py-3 px-4 rounded-t-md cursor-pointer flex justify-between shadow-md" onClick={() => setShowUpcomingEvents(!showUpcomingEvents)}>
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>Upcoming Events</h1>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showUpcomingEvents ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
            </svg>
          </div>
          {showUpcomingEvents && (
            <div className="bg-gray-100 shadow-md rounded-b-md p-2 md:p-4">
              <div className="grid grid-cols-1">
                {upcomingEvents.map((event, index) => (
                  <Event key={index} {...event} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Past Events */}
        <div className="relative">
          <div className="bg-white text-gray-800 py-3 px-4 rounded-t-md cursor-pointer flex justify-between shadow-md" onClick={() => setShowPastEvents(!showPastEvents)}>
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>Previous Events</h1>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showPastEvents ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
            </svg>
          </div>
          {showPastEvents && (
            <div className="bg-gray-100 shadow-md rounded-b-md p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pastEvents.map((event, index) => (
                  <Event key={index} {...event} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;















