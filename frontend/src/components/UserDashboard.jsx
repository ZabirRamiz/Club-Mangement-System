



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from '../components/PostForm.jsx'
const Userdasboard = () => {
  const navigate = useNavigate();

  // User Dashboard Information
  const [name, setName] = useState("");
  const [studentid, setStudentid] = useState("");
  const [designation, setDesignation] = useState("");
  const [gsuite, setGsuite] = useState("");
  const [department, setDepartment] = useState("");
  const [comment, setComment] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

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

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission
    console.log('Comment submitted:', comment);
    // You may want to send the comment to a server or perform other actions here
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

        {/* Second Card */}
        <div className="flex flex-col items-right mt-16 ml-1">
          
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Assigned Work
              </h5>
            </a>
            <div className="flex justify-between mt-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300">
                Accept
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300">
                Decline
              </button>
            </div>
          </div>
        </div>
        
      </div>
    {/* </div> */}
    {/* text box area  */}
    
    <div className="flex flex-col items-center">
    <div className="flex justify-end mt-5">
      <form
        onSubmit={handleSubmit}
        className="absolute top-12 right-0 m-20 w-1/2 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
      >
        <div className="px-4 py-2 bg-white dark:bg-gray-800">
          <label htmlFor="dropdown" className="sr-only">
            Select an option
          </label>
          <select
            id="dropdown"
            value={selectedOption}
            onChange={handleDropdownChange}
            className="w-full h-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 mb-2"
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="option1">Post</option>
            <option value="option2">Suggetion</option>
            <option value="option3">Ideas</option>
            <option value="option3">Complains</option>
          </select>
        </div>

        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows="6"
            value={comment}
            onChange={handleCommentChange}
            className="w-full h-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Text..."
            required
          />
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2"
          >
            Post
          </button>
        </div>
      </form>
   
    {/* 3rd card */}
    {/* Card container */}
    
    <div className="flex mx-64 mt-[-180px] " style={{ marginLeft: '700px', marginRight: '12px' }}>
        <div style={{ width: '500px' }} className=" p-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Pending Works
            </h5>
          </a>
          <div className="flex justify-between mt-12">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300">
              Work Completed
            </button>
          </div>
        </div>
      </div>
    </div>
     </div>
     </div>
  
  
  );
};

export default Userdasboard;

