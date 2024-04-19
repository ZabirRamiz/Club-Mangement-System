import React, { useState } from 'react';
import FinanceFeed from '../components/FinanceFeed.jsx'

// EventPost component to display event posts
function Finance() {
  // Sample event data
  const events = [
    {
      title: "Event 1",
      allocatedBudget: "10000",
      pl: false,
      moneyReceived: "5000",
      date: "2024-02-25",
      sponsors: ["Sponsor A", "Sponsor B", "Sponsor C"],
      selectedSponsor: "Sponsor A"
    },
    {
      title: "Event 2",
      allocatedBudget: "15000",
      pl: true,
      moneyReceived: "10000",
      date: "2024-03-10",
      sponsors: ["Sponsor D", "Sponsor E"],
      selectedSponsor: "Sponsor D"
    },
    {
      title: "Event 3",
      allocatedBudget: "20000",
      pl: false,
      moneyReceived: "15000",
      date: "2024-03-20",
      sponsors: ["Sponsor F", "Sponsor G", "Sponsor H"],
      selectedSponsor: "Sponsor F"
    }
  ];


  return (
    <>
      <div className="flex flex-col items-right" style={{ backgroundImage: 'url("https://png.pngtree.com/background/20210716/original/pngtree-light-blue-cute-striped-baby-blue-background-picture-image_1348681.jpg")', backgroundSize: 'cover', minHeight: '100vh' }}>
        <div className="container mx-auto mt-8">
          <div className="bg-gray-100 text-gray-800 py-3 px-4 rounded-md shadow-md">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold ml-7">Event Title</h2>
              <h2 className="text-xl font-semibold text-center mr-24">Event Status</h2>
              <h2 className="text-xl font-semibold mr-10"> Nothing </h2>
            
            </div>
            <div>
            {events.map((event, index) =>(
                <FinanceFeed key = {index} event = {event}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );  
}

export default Finance;

























