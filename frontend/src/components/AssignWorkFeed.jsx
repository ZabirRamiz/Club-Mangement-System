import { useEffect, useState } from "react"

const AssignWorkFeed = ({work}) =>{
    const [from, setFrom] = useState(work.from)
    const [to, setTo] = useState(work.to)
    const [assignDate, setAssignDate] = useState(work.assign_date)
    const [deadline, setDeadline] = useState(work.deadline)
    const [body, setBody] = useState(work.body)
    const [acceptedBy, setAcceptedBy] = useState(work.accepted_by)
    const [workStatus, setWorkStatus] = useState(work.work_status)
    const [userName, setUserName] = useState("")

    const[showAccept, setShowAccept] = useState(false)
    const[showDecline, setShowDecline] = useState(false)

    useEffect(() =>{
        const fetchData = async() =>{
            const user = localStorage.getItem("Id")
            const response = await fetch(`api/user/getSpecificUser/${user}`)
            const json = await response.json()
            if(response.ok){
                setUserName(json.name)
                console.log(`User name is ${json.name}`)
            }

            if(acceptedBy == json.name){
              setShowDecline(true)
            }
            else if(acceptedBy == ""){
              setShowAccept(true)
            }
            
        }

        fetchData()
    }, [])
    
    
    const handleAccept = async(e) => {
      e.preventDefault()
  
      const response = await fetch(`/api/works/updateWork/${work._id}`,{
        method: "PATCH",
        body: JSON.stringify({accepted_by: userName, work_status: "Accepted"}),
        headers:{
          'Content-Type': 'application/json'
        }
      })

      const json = await response.json()
      console.log(json)
      if(response.ok){
        setAcceptedBy(acceptedBy)
        window.location.reload()
      }
      else{
        console.error("Hoynai accept")
      }
      
    };

    const handleDecline = async(e) => {
      e.preventDefault()
  
      const response = await fetch(`/api/works/updateWork/${work._id}`,{
        method: "PATCH",
        body: JSON.stringify({accepted_by: "", work_status: "Pending"}),
        headers:{
          'Content-Type': 'application/json'
        }
      })

      const json = await response.json()
      console.log(json)
      if(response.ok){
        setAcceptedBy(acceptedBy)
        window.location.reload()
      }
      else{
        console.error("Hoynai accept")
      }
      
    };

    const handleDelete = async(e) => {
      e.preventDefault()
  
      const response = await fetch(`/api/works/deleteWork/${work._id}`,{
        method: "DELETE",
        headers:{
          'Content-Type': 'application/json'
        }
      })

      const json = await response.json()
      console.log(json)
      if(response.ok){
        window.location.reload()
      }
      else{
        console.error("Hoynai delete")
      }
      
    };


  
    return(
        <>
      <div className="flex flex-col items-right mt-4 "  style={{ marginLeft: '10px', marginTop: '10px'}}>
      <div className="max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
        <a href="#">
        </a>
        
        <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {from} → {to}
        </div>
        <div className="mb-2 text-1xl tracking-tight text-gray-900 dark:text-white">
        {body}
        </div>
        <div className="mb-2 text-1xl tracking-tight text-gray-900 dark:text-white">
        <b>Assigned on: </b>{assignDate}
        </div>
        <div className="mb-2 text-1xl tracking-tight text-gray-900 dark:text-white">
        <b>Deadline: </b>{deadline}
        </div>
        <div className="mb-2 text-1xl tracking-tight text-gray-900 dark:text-white">
        <b>Status: </b>{workStatus}
        </div>
        <div className="mb-2 text-1xl tracking-tight text-gray-900 dark:text-white">
        <b>Accecpted by: </b>{acceptedBy}
        </div>


        <div className="flex justify-between mt-4">

          {showAccept && (
            <button onClick={handleAccept} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300">
            Accept
            </button>
          )}

          {showDecline && (
            <button onClick={handleDecline} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300">
            Decline
            </button>
          )}

          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300">
          Delete
          </button>


          
          
        </div>
        
        
      </div>
    </div>
    </>
    )
}

export default AssignWorkFeed