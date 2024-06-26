import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const AssignWorkForm = () => {
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("HR")
    const [assign_date, setAssignDate] = useState("")
    const [deadline, setDeadline] = useState("")
    const [body, setBody] = useState("")
    const [accepted_by, setAcceptedBy] = useState("")
    const [work_status, setWorkStatus] = useState("Pending")
    const [eventList, setEventList] = useState([])
    const [event, setEvent] = useState("None")
    const [category, setCategory] = useState("General")
    const [forOption, setForOption] = useState("");
    const [showEventDropdown, setShowEventDropdown] = useState(false);
    
    const navigate = useNavigate()

    useEffect(() =>{
      const fetchData = async() =>{
          const user = localStorage.getItem("Id")
          const response = await fetch(`api/user/getSpecificUser/${user}`)
          const json = await response.json()
          if(response.ok){
            setFrom(json.department)
            if(from === "HR"){
              setTo("EM")
            }
            const today = new Date().toISOString().split("T")[0]
            setAssignDate(today)
            console.log(today)
            console.log(`User name is ${json.name}`)
          } 

          const getEvent = await fetch('/api/events/getEvents')
          const eventData = await getEvent.json()
          const titles = eventData.map(event => event.title)
          setEventList(titles)
          setEvent(titles[0])
            
      }
      fetchData()
  }, [])

  useEffect(() => {
    // Condition to show the event dropdown based on the selected option in the "For" dropdown
    if (forOption == "Event") {
      setShowEventDropdown(true);
    } else {
      setShowEventDropdown(false);
      setEvent(""); // Reset event value if "For" dropdown option changes
    }
  }, [forOption]);
  
  const handleEventDropdownChange = (e) => {
    setEvent(e.target.value);
  };

  const handleForDropdownChange = (e) => {
    setForOption(e.target.value);
    setCategory(e.target.value)
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const postData = {
      from: from,
      to: to, 
      assign_date: assign_date, 
      deadline: deadline, 
      body: body,
      accepted_by: accepted_by, 
      work_status: work_status, 
      category: category, 
      event: event,
    };
    console.log(postData);
    const response = await fetch('/api/works/createWork',{
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    if (response.ok){
      window.location.reload();
    } else {
      console.error("Work e jhamela hoise");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md h-120" style={{ marginLeft: '10px', marginTop: '10px'}}>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label htmlFor="from" className="block text-sm font-medium text-gray-600">
            FROM
          </label>
          <select
            id="from"
            name="from"
            disabled
            className="mt-5 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value={from}>{from}</option>
          </select>
        </div>
        <div className="w-1/2">
          <label htmlFor="to" className="block text-sm font-medium text-gray-600" >
            TO
          </label>
          <select
            id="to"
            name="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="mt-5 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value={to}>{to}</option>
            <option value="HR">HR</option>
            <option value="EM">EM</option>
            <option value="PR">Finance</option>
          </select>
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label htmlFor="assigningDate" className="block text-sm font-medium text-gray-600">
            Assigning Date
          </label>
          <input
            type="date"
            id="assigningDate"
            name="assigningDate"
            value={assign_date}
            disabled
            className="mt-5 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-600">
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-5 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label htmlFor="forOption" className="block text-sm font-medium text-gray-600">
            For
          </label>
          <select
            id="forOption"
            name="forOption"
            value={forOption}
            onChange={handleForDropdownChange}
            className="mt-5 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            
            
            <option value="General">General</option>
            <option value="Event">Event</option>
            <option value="Meeting">Meeting</option>
          </select>
        </div>
        {showEventDropdown && (
          <div className="w-1/2">
            <label htmlFor="event" className="block text-sm font-medium text-gray-600">
              Event
            </label>
            <select
              id="event"
              name="event"
              value={event}
              onChange={handleEventDropdownChange}
              className="mt-5 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="" disabled>
                Select an Event
              </option>
              {eventList.map((title, index) => (
                <option key={index} value={title}>{title}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-600">
          Description
        </label>
        <textarea
          id="description"
          rows="4"
          name="description"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="mt-5 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Submit
      </button>
    </div>
  );
};

export default AssignWorkForm;
