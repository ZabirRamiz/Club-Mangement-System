

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Feed = ({ event }) => {
  
  const navigate = useNavigate();

  // State to manage the dropdown visibility for each event
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleUpdate = () => {
    navigate("/UserDashboard");
    console.log()
  };

  return (
    <>
      <div className="bg-white p-4 rounded-md my-4 shadow-lg flex justify-between items-center">
        <h3 className="text-lg font-semibold ml-7">{event.title}</h3>
        <div className="flex flex-col justify-center flex-grow border-l-2 border-r-2 border-dotted border-gray-400 ml-24 mr-24">
          <div className="flex items-center ml-20 mb-4">
            <label className="text-lg font-semibold text-center ml-20 mb-2" htmlFor={`allocatedBudget`}>
              Allocated budget:
            </label>
            <input type="text" id={`allocatedBudget`} className="text-lg font-semibold text-center ml-2 border border-gray-400 px-2 py-1 rounded-md" />
          </div>
          <div className="flex items-center ml-20 mb-4">
            <label className="text-lg font-semibold text-center ml-20 mb-2" htmlFor={`pl`}>
              PL:
            </label>
            <input type="checkbox" id={`pl`} className="accent-green-500 h-6 w-6 ml-2" />
          </div>
          <div className="flex items-center ml-20 mb-4">
            <label className="text-lg font-semibold text-center ml-20 mb-2" htmlFor={`moneyReceived`}>
              Money Received:
            </label>
            <input type="text" id={`moneyReceived`} className="text-lg font-semibold text-center ml-2 border border-gray-400 px-2 py-1 rounded-md" />
          </div>
          <div className="flex items-center ml-20 mb-4">
            <label className="text-lg font-semibold text-right ml-20 mb-2" htmlFor={`date`}>
              Money Received Date:
            </label>
            <input type="date" id={`date`} className="text-lg font-semibold text-center ml-2 border border-gray-400 px-2 py-1 rounded-md" />
          </div>
          <div className="flex items-center ml-20 mb-4">
            <label className="text-lg font-semibold text-center ml-20 mb-2" htmlFor={`moneyReceived`}>
              Sponsor:
            </label>
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex justify-center ml-2 w-full rounded-md border border-gray-300 shadow-sm bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                  id={`options-menu`}
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={toggleDropdown}
                >
                  {event.selectedSponsor}
                  <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 ml-5 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby={`options-menu`} tabIndex="-1">
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
        <button className="bg-green-500 hover:bg-green-700 text-white rounded-full p-2 mr-7 transition duration-300 ease-in-out" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </>
  );
};

export default Feed;

