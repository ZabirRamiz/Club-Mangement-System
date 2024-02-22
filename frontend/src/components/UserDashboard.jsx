

// export default function UserDashboard() {
//   return (
//     <div>
//       Userdasboard
//     </div>
//   )
// }


 import {useState} from "react";
 import { useLocation, useNavigate } from "react-router-dom";
 import { useUser } from './UserContext';
 const Userdasboard = () => {

   const[isEditingProfile, setEditingProfile]=useState(false)
   const navigate=useNavigate();
   const location = useLocation() // needed to fetch data sent from prev page
   var { savedUser } = useUser()
   var username = null
   const loginStatus = localStorage.getItem('loginState')
   if(loginStatus){
    username = savedUser
   }
   else{
    username = location.state.un
    console.log(location.state)
   }

  const handleEditProfile = () => {
    setEditingProfile(true);
    navigate("/UserEditProfile");
  };

  return (
    <div className="flex items-center justify-right mt-4 ml-4">
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4">
      </div>
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-4 rounded-full shadow-lg"
          src="https://i.natgeofe.com/k/ad9b542e-c4a0-4d0b-9147-da17121b4c98/MOmeow1_4x3.png"
          alt="image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">name</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">Email</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{username}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">Id</span>
        <div className="flex mt-4 md:mt-6">
          <a
            onClick={handleEditProfile}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Edit Profile
          </a>
          {/* <a
            href="#"
            className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Message
          </a> */}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Userdasboard;



