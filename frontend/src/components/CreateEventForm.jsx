
import{ useState, useEffect } from 'react';

const EventForm = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('');
  const [guest, setGuest] = useState('');
  const [type, setType] = useState('');
  const [budget, setBudget] = useState(0);
  const [sponsorList, setSponsorList] = useState([]);
  const [selectedSponsor, setSelectedSponsor] = useState('');
  const [budgetStatus, setBudgetStatus] = useState('');

  useEffect(() => {
    // Fetch sponsors from the API
    fetch('api/sponsor/getSponsors')
      .then(response => response.json())
      .then(data => {
        setSponsorList(data);
      })
      .catch(error => {
        console.error('Error fetching sponsors:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      title,
      date,
      time,
      venue,
      guest,
      type,
      budget,
      selectedSponsor,
      budgetStatus
    });
  };

  return (
    <div className="flex flex-col items-center ml-0 justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl mb-4">Sponsor Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-600">Title:</label>
            <input 
              type="text" 
              id="title" 
              className="mt-1 p-2 w-full border rounded-md" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-600">Date:</label>
            <input 
              type="date" 
              id="date" 
              className="mt-1 p-2 w-full border rounded-md" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block text-sm font-medium text-gray-600">Time:</label>
            <input 
              type="time" 
              id="time" 
              className="mt-1 p-2 w-full border rounded-md" 
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="venue" className="block text-sm font-medium text-gray-600">Venue:</label>
            <input 
              type="text" 
              id="venue" 
              className="mt-1 p-2 w-full border rounded-md" 
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="guest" className="block text-sm font-medium text-gray-600">Guest:</label>
            <input 
              type="text" 
              id="guest" 
              className="mt-1 p-2 w-full border rounded-md" 
              value={guest}
              onChange={(e) => setGuest(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-600">Type:</label>
            <input 
              type="text" 
              id="type" 
              className="mt-1 p-2 w-full border rounded-md" 
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="budget" className="block text-sm font-medium text-gray-600">Budget:</label>
            <input 
              type="number" 
              id="budget" 
              className="mt-1 p-2 w-full border rounded-md" 
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="sponsor" className="block text-sm font-medium text-gray-600">Sponsor:</label>
            <select 
              id="sponsor" 
              className="mt-1 p-2 w-full border rounded-md" 
              value={selectedSponsor}
              onChange={(e) => setSelectedSponsor(e.target.value)}
            >
              {sponsorList.map(sponsor => (
                <option key={sponsor.id} value={sponsor.name}>
                  {sponsor.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="budgetStatus" className="block text-sm font-medium text-gray-600">Budget Status:</label>
            <select 
              id="budgetStatus" 
              className="mt-1 p-2 w-full border rounded-md" 
              value={budgetStatus}
              onChange={(e) => setBudgetStatus(e.target.value)}
            >
              <option value="false">Not Recieved</option>
              <option value="true">Recieved</option>
              
            </select>
          </div>
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
