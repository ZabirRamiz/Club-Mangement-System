

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Pop-up message component
const PopupMessage = ({ message }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
        <p className="text-lg font-semibold text-center">{message}</p>
      </div>
    </div>
  );
};

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$&_-+';
  let result = '';

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
  }

  return result;
}

const Register = () => {
  const navigate = useNavigate();

  const [studentID, setStudentID]=useState("")
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [designation, setDesignation] = useState("Pending");
  const [department, setDepartment] =useState("")
  const [confirmPassword, setConfirmPassword]= useState("")
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoadingPopup, setShowLoadingPopup] = useState(false); // New state to show loading popup
  
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    setShowLoadingPopup(true); // Show loading popup when the registration process starts

    const userExists = await fetch(`/api/user/getSpecificUser/${studentID}`);
    const userData = await userExists.json();
    if (userData != null){
      console.log("User exists, sign in instead");
      navigate("/login");
    }
    else{
      const password = generateRandomString(10);
      const subject = "Login Password";
      const body = `Use this string as your password during login for registration: ${password}`;

      const sendEmail = await fetch(`/api/email/sendEmail`, {
        method: "POST",
        body: JSON.stringify({
          send_to: email,
          subject: subject,
          message: body
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!sendEmail.ok){
        console.log("Email failed to send");
        console.log("Please contact the admins for registration problems");
        window.location.reload();
        return;
      }

      const response = await fetch(`/api/user/createUser`,{
        method: "POST",
        body: JSON.stringify({
          studentID, name, email, password, designation, department
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok){
        navigate("/");
      }
      else{
        console.error("Registration failed");
        console.log("Please contact the admins for registration problems");
        window.location.reload();
      }
    }
    
  };

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-white-900 text-center hidden md:flex">
          <div
            className="m-0 xl:m-0 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://geniuseduerp.com/assets/img/university.svg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                Student Registration Form
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey enter your details to create your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <input
                  className="w-96 px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="number"
                  placeholder="Enter your StudentID"
                  value={studentID}
                  onChange={(e)=> setStudentID(e.target.value)}
                />
                <input
                  className="w-96 px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e)=> setName(e.target.value)}
                />
                <input
                  className="w-96 px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                />
                <select
                  id="department"
                  className="w-96 px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 text-gray-700 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="" className="text-gray-200">Select department</option>
                  <option value="EM" className="text-gray-700">EM</option>
                  <option value="HR" className="text-gray-700">HR</option>
                  <option value="Finance" className="text-gray-700">Finance</option>
                </select>
                {error && <p className="text-red-500">{error}</p>}
                <button
                  className="w-96  block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-4"
                  type="button"
                  onClick={handleEditSubmit}
                >
                  Register
                </button>
                <p className="mt-2 text-xm text-gray-600 text-center">
                  Already have an account?{" "}
                  <a href="/Login">
                    <span className="text-blue-900 font-semibold">Log in</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Loading Popup */}
      {showLoadingPopup && <PopupMessage message="Please wait to complete the registration" />}
    </div>
  );
};

export default Register;

