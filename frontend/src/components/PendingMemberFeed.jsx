import { useEffect, useState } from "react"

const PendingMembersFeed = ({user}) =>{
    const [studentID, setStudentID] =  useState(user.sid)
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [designation, setDesignation] = useState("General Member")
    const [department, setDepartment] = useState(user.department)

    useEffect(() =>{
        const fetchData = async() =>{
            const response = await fetch(`api/user/getSpecificUser/${studentID}`)
            const json = await response.json()
            if(response.ok){
                console.log(`User name is ${json.name}`)
            }

            
        }

        fetchData()
    }, [])
    
    
    const handleRecruit = async(e) => {
      e.preventDefault()
  
      const response = await fetch(`/api/user/editUser/${studentID}`,{
        method: "PATCH",
        body: JSON.stringify({
            designation: designation,
            department: department
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      })

      const json = await response.json()
        if (response.ok){
        window.location.reload()
        }
        else{
        console.error("Recruit e jhamela hoise")
        }
      
    };

    return(
        <>
      <div className="flex flex-col items-right mt-4 "  style={{ marginLeft: '10px', marginTop: '10px'}}>
      <div className="max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow  relative">
        <a href="#">
        </a>
        
        <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-600">
            <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={name}
                disabled
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className="mb-2 text-1xl tracking-tight text-gray-900 dark:text-gray-600">
            <b>Student ID: </b>
            <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={studentID}
                onChange={(e) => setStudentID(e.target.value)}
                disabled
            />
        </div>
        <div className="mb-2 text-1xl tracking-tight text-gray-900 dark:text-gray-600">
            <b>Email: </b>
            <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                disabled
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="mb-2 text-1xl tracking-tight text-gray-900 dark:text-gray-600">
            <label htmlFor="designation" className="block font-bold">
                Designation:
            </label>
            <select
                id="designation"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                >
                <option value="General Member">General Member</option>
            </select>
        </div>
            
        <div className="mb-2 text-1xl tracking-tight text-gray-900 dark:text-gray-600">
            <label htmlFor="designation" className="block font-bold">
                Department:
            </label>
            <select
                id="department"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                >
                <option value="EM">EM</option>
                <option value="HR">HR</option>
                <option value="PR">PR</option>
            </select>
        </div>

        <div className="flex justify-between mt-4">
            <button onClick={handleRecruit} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300">
                Recruit
            </button>
        </div>
        
        
      </div>
    </div>
    </>
    )
}

export default PendingMembersFeed