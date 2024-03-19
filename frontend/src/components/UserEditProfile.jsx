
import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
  const localStudentId = localStorage.getItem("Id")
  const UserEditProfile = () => {
  const navigate = useNavigate();

  const [studentID, setStudentID]=useState("")
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] =useState("")
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() =>{
    const fetchData = async() =>{
        const user = localStorage.getItem("Id")
        const response = await fetch(`api/user/getSpecificUser/${user}`)
        const json = await response.json()
        if(response.ok){
            console.log(`User name is ${json.name}`)
            setStudentID(json.sid)
            setName(json.name)
            setPassword(json.password)
            setEmail(json.email)
            setDesignation(json.designation)
            console.log(designation)
            setDepartment(json.department)
        }

        
        
    }

    fetchData()
}, [])
  
  // post request
  const handleEditSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(`/api/user/editUser/${studentID}`,{
      method: "PATCH",
      body: JSON.stringify({
        sid: studentID,
        name: name,
        email: email,
        password: password,
        designation: designation,
        department: department
      }),
      headers: {
        'Content-Type': 'application/json'
    }
    })

    const json = await response.json()
    if (response.ok){
      window.location.reload()
    }
    else{
      console.error("Edit e jhamela hoise")
    }

    
  }

  
    
  

  return (
    <div className="container mx-auto p-4 md:p-10">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-xl">
        <div className="md:flex">
          <div className="w-full px-3 py-8 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
            <form className="mt-6">
            <div className="mb-6">
                <label htmlFor="studentID" className="block text-gray-800 font-bold mb-2">
                  Student ID
                </label>
                <input
                  id="studentID"
                  type="number"
                  placeholder=""
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={studentID}
                  {...(designation==="admin")? {disabled: false}: {disabled:true}}
                  onChange={(e) => setStudentID(e.target.value)}
                />
              </div>
            <div className="mb-6">
                <label htmlFor="name" className="block text-gray-800 font-bold mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder=""
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-800 font-bold mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder=""
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-800 font-bold mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder=""
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="designation" className="block text-gray-800 font-bold mb-2">
                  Designation
                </label>
                <input
                  id="designation"
                  type="text"
                  placeholder=""
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  {...(designation==="admin")? {disabled: false}: {disabled:true}}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="department" className="block text-gray-800 font-bold mb-2">
                  Department
                </label>
                <input
                  id="text"
                  type="text"
                  placeholder=""
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  {...(designation==="admin")? {disabled: false}: {disabled:true}}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="profileImage" className="block text-gray-800 font-bold mb-2">
                  Profile Image
                </label>
                <input
                  type="file"
                  id="profileImage"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              
              <button
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                type="button"
                onClick={handleEditSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserEditProfile;
