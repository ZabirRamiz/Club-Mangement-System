import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const SponsorForm = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("BRACU");
  const [more_info, setMoreInfo] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [sponsor_status, setSponsorStatus] = useState("Inactive");
  const [typeList, setTypeList] = useState(['BRACU', 'IT', 'Food', 'Publication', 'Media', 'Education', 'Others']);
  const [status_list, setStatusList] = useState(['Inactive', 'Active']);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSponsor = async () => {
      // Fetch sponsor data if needed
    };
    fetchSponsor();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!name || !phone || !email || !sponsor_status) {
    //   setError("All fields except 'More Info' are required.");
    //   return;
    // }
    
    const sponsorData = {
      name,
      type,
      more_info,
      phone,
      email,
      sponsor_status
    };

    console.log(sponsorData);
    
    const response = await fetch("/api/sponsor/createSponsor", {
      method: 'POST',
      body: JSON.stringify(sponsorData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const json = await response.json();
    
    if (response.ok) {
      window.location.reload();
    } else {
      setError(json.message );
    }
  };

  return (
    <div className="container mt-2 ml-14">
      <div className="w-full bg-gray-100 text-gray-800 py-3 px-0 rounded-md shadow-md" style={{ maxWidth: '29rem', width: '100%' }}>
        <div className="flex justify-between">
          <div className="w-full max-w-md mx-auto">
            <form className="mt-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
              <div className="w-full px-3 py-8 md:p-8">
                <h2 className="mt-0 mb-8 text-2xl font-bold text-gray-800">Add Sponsor</h2>
                
               
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="type" className="block text-sm font-medium text-gray-600">Type</label>
                  <select id="type" name="type" value={type} onChange={(e) => setType(e.target.value)} className="mt-5 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" required>
                    {typeList.map((typeValue, index) => (
                      <option key={index} value={typeValue}>{typeValue}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="more_info">More Info</label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="more_info" type="text" placeholder="More Info" value={more_info} onChange={(e) => setMoreInfo(e.target.value)} />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone</label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="sponsorstatus" className="block text-gray-700 text-sm font-bold mb-2">Sponsor Status</label>
                  <select id="sponsorstatus" name="sponsorstatus" value={sponsor_status} onChange={(e) => setSponsorStatus(e.target.value)} className="mt-5 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" required>
                    {status_list.map((statusValue, index) => (
                      <option key={index} value={statusValue}>{statusValue}</option>
                    ))}
                  </select>
                </div>
                 {/* {error && <div className="mb-4 text-red-500">{error}</div>} */}
                <div className="flex items-center justify-between">
                  <button className="mt-6 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm py-2 px-6 text-center" type="submit">Add</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorForm;
