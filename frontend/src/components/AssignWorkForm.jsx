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
    
    const navigate = useNavigate()

    useEffect(() =>{
      const fetchData = async() =>{
          const user = localStorage.getItem("Id")
          const response = await fetch(`api/user/getSpecificUser/${user}`)
          const json = await response.json()
          if(response.ok){
            setFrom(json.department)
            if(from == "HR"){
              setTo("EM")
            }


            const today = new Date().toISOString().split("T")[0]
            setAssignDate(today)
            console.log(today)

              console.log(`User name is ${json.name}`)
          }
          
          
      }

      fetchData()
  }, [])

  const handleSubmit = async(e) => {
    e.preventDefault()



    const postData = {from, to, assign_date, deadline, body, accepted_by, work_status}
    console.log(postData)
    const response = await fetch('/api/works/createWork',{
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json'
    }
    })
    const json = await response.json()
    if (response.ok){
      window.location.reload()
    }
    else{
      console.error("Work e jhamela hoise")
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
            //value={from}
            disabled
            className="mt-5 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value={from}>{from}</option>

          </select>
        </div>

        <div className="w-1/2">
          <label htmlFor="to" className="block text-sm font-medium text-gray-600">
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
            <option value="PR">PR</option>
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
            // onChange={(e) => setAssignDate(e.target.value)}
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
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Submit
      </button>
    </div>
  );
};

export default AssignWorkForm;
