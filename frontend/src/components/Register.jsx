import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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


  
  const handleEditSubmit = async (e) => {
    e.preventDefault()

    const userExists = await fetch(`/api/user/getSpecificUser/${studentID}`)
    const userData = await userExists.json()
    if (userData != null){
      console.log("User exists, sign in instead")
      // PROMPT
      navigate("/login")
    }
    else{
      const password = generateRandomString(10)
      const subject = "Login Password"
      const body = `Use this string as your password during login for registration: ${password}`


      console.log("PLEASE WAIT")

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
      })
      const emailJson = await sendEmail.json()
      if (!sendEmail.ok){
        console.log("Email jaitesena")
        // PROMPT
        console.log("Please contact the admins for registration problems")
        window.location.reload()
      }
      const response = await fetch(`/api/user/createUser`,{
        method: "POST",
        body: JSON.stringify({
          studentID, name, email, password, designation, department
        }),
        headers: {
          'Content-Type': 'application/json'
      }
      })
  
      const json = await response.json()
      if (response.ok){
        navigate("/")
      }
      else{
        console.error("Register e jhamela hoise")
        // PROMPT
        console.log("Please contact the admins for registration problems")
        window.location.reload()
      }
    }
    
  }

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
                {/* <div className="mb-1 relative">
                <input
                  className="w-96 px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                 /><div
                 className="absolute inset-y-6 right-0 flex items-center pr-3 cursor-pointer"
                 onClick={() => setShowPassword(!showPassword)}
                >
                 {showPassword ? (
                 <svg
                   xmlns="http://www.w3.org/2000/svg"
                   className="h-6 w-6 absolute right-[-50px] top- -5 cursor-pointer"
                   viewBox="0 0 24 24"
                   fill="none"
                   onClick={() => setShowPassword(!showPassword)}
                 >
                   <path stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                   <path stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                   <circle cx="12" cy="12" r="3"></circle>
                 </svg>
               ) : (
                 <svg
                   xmlns="http://www.w3.org/2000/svg"
                   className="h-6 w-6 absolute right-[-50px] top- -5 cursor-pointer"
                   viewBox="0 0 24 24"
                   fill="none"
                   stroke="gray"
                   strokeWidth="2"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   onClick={() => setShowPassword(!showPassword)}
                 >
                   <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                 </svg>
               )}
               </div>
               </div>
               <div className="mb-1 relative">
                <input
                  className="w-96 px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e)=> setConfirmPassword(e.target.value)}

                />
                <div
                  className="absolute inset-y-6 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 absolute right-[-50px] top- -5 cursor-pointer"
                    viewBox="0 0 24 24"
                    fill="none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <path stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 absolute right-[-50px] top- -5 cursor-pointer"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="gray"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                  </svg>
                )}
                </div>
                </div> */}
                <select
                id="department"
                className="w-96 px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 text-gray-700 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="" className="text-gray-200">Select department</option>
                <option value="EM" className="text-gray-700">EM</option>
                <option value="HR" className="text-gray-700">HR</option>
                <option value="PR" className="text-gray-700">PR</option>
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
    </div>
  );
};
export default Register;