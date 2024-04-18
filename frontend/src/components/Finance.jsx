// import React, { useState } from 'react';

// // EventPost component to display event posts
// function Finance() {
//   // Sample event data
//   const events = [
//     {
//       title: "Event 1",
//       allocatedBudget: "10000",
//       pl: false,
//       moneyReceived: "5000",
//       date: "2024-02-25",
//       sponsors: ["Sponsor A", "Sponsor B", "Sponsor C"],
//       selectedSponsor: "Sponsor A"
//     },
//     {
//       title: "Event 2",
//       allocatedBudget: "15000",
//       pl: true,
//       moneyReceived: "10000",
//       date: "2024-03-10",
//       sponsors: ["Sponsor D", "Sponsor E"],
//       selectedSponsor: "Sponsor D"
//     },
//     {
//       title: "Event 3",
//       allocatedBudget: "20000",
//       pl: false,
//       moneyReceived: "15000",
//       date: "2024-03-20",
//       sponsors: ["Sponsor F", "Sponsor G", "Sponsor H"],
//       selectedSponsor: "Sponsor F"
//     }
//   ];

//   // State to manage the dropdown visibility for each event
//   const [isDropdownOpen, setIsDropdownOpen] = useState(events.map(() => false));

//   // Function to toggle the dropdown visibility for a specific event
//   const toggleDropdown = (index) => {
//     const updatedDropdownStates = [...isDropdownOpen];
//     updatedDropdownStates[index] = !updatedDropdownStates[index];
//     setIsDropdownOpen(updatedDropdownStates);
//   };

//   // Function to handle input changes for allocated budget, money received, and date
//   const handleInputChange = (e, index, field) => {
//     const updatedEvents = [...events];
//     updatedEvents[index][field] = e.target.value;
//     // Update state with the modified event data
//     setEvents(updatedEvents);
//   };

//   return (
//     <div className="flex flex-col items-right "
//       style={{ backgroundImage: 'url("https://png.pngtree.com/background/20210716/original/pngtree-light-blue-cute-striped-baby-blue-background-picture-image_1348681.jpg")', backgroundSize: 'cover', minHeight: '100vh' }}>
//       <div className="container mx-auto mt-8">
//         <div className="bg-gray-100 text-gray-800 py-3 px-4 rounded-md shadow-md">
//           <div className="flex justify-between">
//             <h2 className="text-xl font-semibold ml-7">Event Title</h2>
//             <h2 className="text-xl font-semibold text-center mr-24">Event Status</h2>
//             <h2 className="text-xl font-semibold mr-10">   </h2>
//           </div>
//           {events.map((event, index) => (
//             <div key={index} className="bg-white p-4 rounded-md my-4 shadow-lg flex justify-between items-center">
//               <h3 className="text-lg font-semibold ml-7">{event.title}</h3>
//               <div className="flex flex-col justify-center flex-grow border-l-2 border-r-2 border-dotted border-gray-400 ml-24 mr-24">
//                 <div className="flex items-center ml-20 mb-4">
//                   <label className="text-lg font-semibold text-center ml-20 mb-2" htmlFor={`allocatedBudget-${index}`}>Allocated budget:</label>
//                   <input type="text" id={`allocatedBudget-${index}`} className="text-lg font-semibold text-center ml-2 border border-gray-400 px-2 py-1 rounded-md" value={event.allocatedBudget} onChange={(e) => handleInputChange(e, index, 'allocatedBudget')} />
//                 </div>
//                 <div className="flex items-center ml-20 mb-4">
//                   <label className="text-lg font-semibold text-center ml-20 mb-2" htmlFor={`pl-${index}`}>PL: </label>
//                   <input type="checkbox" id={`pl-${index}`} className="accent-green-500 h-6 w-6 ml-2" checked={event.pl} />
//                 </div>
//                 <div className="flex items-center ml-20 mb-4">
//                   <label className="text-lg font-semibold text-center ml-20 mb-2" htmlFor={`moneyReceived-${index}`}>Money Received:</label>
//                   <input type="text" id={`moneyReceived-${index}`} className="text-lg font-semibold text-center ml-2 border border-gray-400 px-2 py-1 rounded-md" value={event.moneyReceived} onChange={(e) => handleInputChange(e, index, 'moneyReceived')} />
//                 </div>
//                 <div className="flex items-center ml-20 mb-4">
//                   <label className="text-lg font-semibold text-right ml-20 mb-2" htmlFor={`date-${index}`}>Money Received Date:</label>
//                   <input type="date" id={`date-${index}`} className="text-lg font-semibold text-center ml-2 border border-gray-400 px-2 py-1 rounded-md" value={event.date} onChange={(e) => handleInputChange(e, index, 'date')} />
//                 </div>
//                 <div className="flex items-center ml-20 mb-4">
//                   <label className="text-lg font-semibold text-center ml-20 mb-2" htmlFor={`moneyReceived-${index}`}>Sponsor: </label>
//                   <div className="relative inline-block text-left">
//                     <div>
//                       <button type="button" className="inline-flex justify-center ml-2 w-full rounded-md border border-gray-300 shadow-sm bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id={`options-menu-${index}`} aria-expanded="true" aria-haspopup="true" onClick={() => toggleDropdown(index)}>
//                         {event.selectedSponsor}
//                         <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                           <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                         </svg>
//                       </button>
//                     </div>

//                     {isDropdownOpen[index] && (
//                       <div className="origin-top-right absolute right-0 mt-2 ml-5 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby={`options-menu-${index}`} tabIndex="-1">
//                         <div className="py-1 ml-2" role="none">
//                           {event.sponsors.map((sponsor, i) => (
//                             <a href="#" key={i} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabIndex="-1" id={`option-${index}-${i}`} onClick={() => console.log(sponsor)}>
//                               {sponsor}
//                             </a>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <button className="bg-green-500 hover:bg-green-700 text-white rounded-full p-2 mr-7 transition duration-300 ease-in-out">Update</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Finance;


import React, { useState } from 'react';

function Finance() {
  // Sample event data
  const event = {
    title: "Event 1",
    allocatedBudget: "10000",
    pl: false,
    moneyReceived: "5000",
    date: "2024-02-25",
    sponsors: ["Sponsor A", "Sponsor B", "Sponsor C"],
    selectedSponsor: "Sponsor A"
  };

  // State to manage the dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle input changes
  const handleInputChange = (e, field) => {
    const updatedEvent = { ...event, [field]: e.target.value };
    // Update state with the modified event data
    console.log(updatedEvent);
  };

  return (
    <div className="flex flex-col items-right"
      style={{ backgroundImage: 'url("https://png.pngtree.com/background/20210716/original/pngtree-light-blue-cute-striped-baby-blue-background-picture-image_1348681.jpg")', backgroundSize: 'cover', minHeight: '100vh' }}>
      <div className="container mx-auto mt-8">
        <div className="bg-gray-100 text-gray-800 py-3 px-4 rounded-md shadow-md">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold ml-7">Event Title</h2>
            <h2 className="text-xl font-semibold text-center mr-24">Event Status</h2>
            <h2 className="text-xl font-semibold mr-10">   </h2>
          </div>
          <div key={event.title} className="bg-white p-4 rounded-md my-4 shadow-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold ml-7">{event.title}</h3>
            <div className="flex flex-col justify-center flex-grow border-l-2 border-r-2 border-dotted border-gray-400 ml-24 mr-24">
              <div className="flex items-center ml-20 mb-4">
                <label className="text-lg font-semibold text-center ml-20 mb-2" htmlFor="allocatedBudget">Allocated budget:</label>
                <input type="text" id="allocatedBudget" className="text-lg font-semibold text-center ml-2 border border-gray-400 px-2 py-1 rounded-md" value={event.allocatedBudget} onChange={(e) => handleInputChange(e, 'allocatedBudget')} />
              </div>
              <div className="flex items-center ml-20 mb-4">
                <label className="text-lg font-semibold text-center ml-20 mb-2" htmlFor="pl">PL: </label>
                <input type="checkbox" id="pl" className="accent-green-500 h-6 w-6 ml-2" checked={event.pl} onChange={() => {}} />
              </div>
              <div className="flex items-center ml-20 mb-4">
                <label className="text-lg font-semibold text-center ml-20 mb-2" htmlFor="moneyReceived">Money Received:</label>
                <input type="text" id="moneyReceived" className="text-lg font-semibold text-center ml-2 border border-gray-400 px-2 py-1 rounded-md" value={event.moneyReceived} onChange={(e) => handleInputChange(e, 'moneyReceived')} />
              </div>
              <div className="flex items-center ml-20 mb-4">
                <label className="text-lg font-semibold text-right ml-20 mb-2" htmlFor="date">Money Received Date:</label>
                <input type="date" id="date" className="text-lg font-semibold text-center ml-2 border border-gray-400 px-2 py-1 rounded-md" value={event.date} onChange={(e) => handleInputChange(e, 'date')} />
              </div>
              <div className="flex items-center ml-20 mb-4">
                <label className="text-lg font-semibold text-center ml-20 mb-2" htmlFor="selectedSponsor">Sponsor: </label>
                <div className="relative inline-block text-left">
                  <div>
                    <button type="button" className="inline-flex justify-center ml-2 w-full rounded-md border border-gray-300 shadow-sm bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="options-menu" aria-expanded="true" aria-haspopup="true" onClick={toggleDropdown}>
                      {event.selectedSponsor}
                      <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 ml-5 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu" tabIndex="-1">
                      <div className="py-1 ml-2" role="none">
                        {event.sponsors.map((sponsor, i) => (
                          <a href="#" key={i} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabIndex="-1" id={`option-${i}`} onClick={() => console.log(sponsor)}>
                            {sponsor}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button className="bg-green-500 hover:bg-green-700 text-white rounded-full p-2 mr-7 transition duration-300 ease-in-out">Update</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Finance;























