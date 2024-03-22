import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [studentId, setStudentIdLogin] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async () => {
    const response = await fetch(`api/user/getSpecificUser/${studentId}`)
    const userData = await response.json()
    if (userData != null) {
      const fetchedPassword = userData.password
      if (password !== "" && password === fetchedPassword) {
        console.log("Password matches")
        localStorage.setItem("State", "true")
        localStorage.setItem('Id', studentId)
        navigate("/UserDashboard", {state: {un: studentId}})
      } 
      else {
        setErrorMessage("Wrong student Password")
        console.log("Password does not match")
        window.location.reload()
      }
    }
    else{
      setErrorMessage("Wrong Student ID")
      console.log("No such user")
      window.location.reload()
      // throw new Error("Failed to fetch user data")
    }
  }

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-white-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img src="https://geniuseduerp.com/assets/img/university.svg" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Login to your account</h1>
          <form className="mt-6" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <div className="mt-4">
              {errorMessage && (
                <div className="bg-red-200 p-4 mb-4">{errorMessage}</div>
              )}
              <label className="block text-gray-700"><b>Student ID</b></label>
              <input
                type="text"
                placeholder="Enter Student Id"
                value={studentId}
                onChange={(e) => setStudentIdLogin(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />
            </div>
            <div className="mt-4 relative">
              <label className="block text-gray-700"><b>Password</b></label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-1 border focus:border-blue-500 focus:bg-white focus:outline-none pr-10"
                  required
                />
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 absolute right-3 top-4 cursor-pointer"
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
                    className="h-6 w-6 absolute right-3 top-4 cursor-pointer"
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
            <button
              type="submit"
              className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-4"
            >
              Log In
            </button>
          </form>
          <hr className="my-6 border-gray-300 w-full" />
          <p className="mt-6">Wants to join? <a href="/Register" className="text-blue-500 hover:text-blue-700 font-semibold">Register Here</a></p>
        </div>
      </div>
    </section>
  )
}
