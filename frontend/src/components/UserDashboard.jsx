



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import PostForm from '../components/PostForm.jsx'
const Userdasboard = () => {
  const navigate = useNavigate();

  // User Dashboard Information
  const [name, setName] = useState("");
  const [studentid, setStudentid] = useState("");
  const [designation, setDesignation] = useState("");
  const [gsuite, setGsuite] = useState("");
  const [department, setDepartment] = useState("");
 
  useEffect(() => {
    const fetchData = async () => {
      const loginStatus = localStorage.getItem('State');
      const loginId = localStorage.getItem('Id');
      
      if (loginStatus === 'true') {
        try {
          const response = await fetch(`api/user/getSpecificUser/${loginId}`);
          
          const userData = await response.json();
          //console.log(response.json())

          if (userData != null) {
            setName(userData.name);
            setStudentid(loginId);
            setGsuite(userData.email);
            setDepartment(userData.department);
            setDesignation(userData.designation)
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure useEffect runs only once after mounting

  const handleEditProfile = () => {
    navigate("/UserEditProfile");
  };

 
  return (
    
    <div className="flex flex-col items-right "
      style={{ backgroundImage: 'url("https://png.pngtree.com/background/20210716/original/pngtree-light-blue-cute-striped-baby-blue-background-picture-image_1348681.jpg")', backgroundSize: 'cover', minHeight: '100vh' }}>
      <div className="flex flex-col items-right mt-4 ml-4">
        
        {/* First Card */}
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-4 rounded-full shadow-lg"
              src="https://i.natgeofe.com/k/ad9b542e-c4a0-4d0b-9147-da17121b4c98/MOmeow1_4x3.png"
              alt="image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400"><b>G-Suite: </b> {gsuite}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400"><b>Student ID: </b> {studentid}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400"><b>Designation: </b> {designation}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400"><b>Department: </b> {department}</span>
            <div className="flex mt-4 md:mt-6">
              <a
                onClick={handleEditProfile}
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Edit Profile
              </a>
            </div>
          </div>
        </div>

        
        
        
      </div>
    </div>
    
  
  );
};

export default Userdasboard;

