
import{ useState } from 'react';

const EventForm = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('');
  const [guest, setGuest] = useState('');
  const [type, setType] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here

    const EventData={
      title: title,
      date: date,
      time: time,
      venue: venue,
      guest: guest,
      type: type,

    };
    console.log(EventData)
    var eventId = 0
    const response = await fetch ("api/events/createEvent",{
      method: 'POST',
      body: JSON.stringify(EventData),
      headers: {
        'Content-type': 'application/json'
      }

    });
    const json = await response.json();
    if (response.ok){
      eventId = json._id

      const financeResponse = await fetch("/api/finances/createFinance", {
        method: 'POST',
        body: JSON.stringify({
          budget: 0,
          pl: false,
          recieved: 0,
          dateReceived: "",
          sponsor: "661abf66de55a9b6325f39b0",  //oca
          event: eventId
        }),
        headers: {
          'Content-type': 'application/json'
        }
      })

      const financeJson = await financeResponse.json()
      if (financeResponse.ok){
        console.log(financeJson)
        window.location.reload();
      }
      else{
        console.log("Error")
      }




      
    } else{
      console.log("Error")
    }
    };


  return (
    <div className="ml-10 flex flex-col items-center  justify-center min-h-screen bg-gray-100">
      <div className="mt-2 mb-4 bg-white p-4 rounded-lg shadow-md w-3/4">
        <h2 className="text-2xl mb-4"><b>Event Form</b></h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-600"><b>Title:</b></label>
            <input 
              type="text" 
              id="title" 
              className="mt-1 p-2 w-full border rounded-md" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-600"><b>Date:</b></label>
            <input 
              type="date" 
              id="date" 
              className="mt-1 p-2 w-full border rounded-md" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block text-sm font-medium text-gray-600"><b>Time:</b></label>
            <input 
              type="time" 
              id="time" 
              className="mt-1 p-2 w-full border rounded-md" 
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="venue" className="block text-sm font-medium text-gray-600"><b>Venue:</b></label>
            <input 
              type="text" 
              id="venue" 
              className="mt-1 p-2 w-full border rounded-md" 
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="guest" className="block text-sm font-medium text-gray-600"><b>Guest:</b></label>
            <input 
              type="text" 
              id="guest" 
              className="mt-1 p-2 w-full border rounded-md" 
              value={guest}
              onChange={(e) => setGuest(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-600"><b>Type:</b></label>
            <input 
              type="text" 
              id="type" 
              className="mt-1 p-2 w-full border rounded-md" 
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          
          <button 
            type="submit" 
            className="mt-6 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm py-2 px-6 text-center"
            >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
