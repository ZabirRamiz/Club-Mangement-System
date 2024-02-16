

// export default function UserEditProfile() {
//   return (
//     <div>
//       edit profile
//     </div>
//   )
// }

// CheckoutForm.jsx

import { useNavigate } from "react-router-dom";

const UserEditProfile= () => {
    const navigate = useNavigate();

    const handleEditSubmit=()=>{

        navigate("/UserDashboard")

    }
  return (
    <div className="container mx-auto p-4 md:p-10">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-xl">
        <div className="md:flex">
          <div className="w-full px-3 py-8 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
            {/* <p className="mt-4 text-gray-600">Please fill out the form below to edit your profile.</p> */}
            <form className="mt-6">
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-800 font-bold mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder=""
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                />
              </div>
              <div className="mb-6">
                <label htmlFor="card_number" className="block text-gray-800 font-bold mb-2">
                  Address
                </label>
                <input
                  id="Address"
                  type="text"
                  placeholder=""
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="expiration_date" className="block text-gray-800 font-bold mb-2">
                  Contact
                </label>
                <input
                  id="number"
                  type="number"
                  placeholder=""
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button" onClick={handleEditSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditProfile;
