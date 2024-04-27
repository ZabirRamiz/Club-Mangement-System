import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";

const SponsorEdit=()=>{
  const { sponsor_id } = useParams()
  const [name, setName] = useState("")
  const [type, setType] = useState("BRACU")
  const [more_info, setMoreInfo] = useState("None")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [sponsor_status, setSponsorStatus] = useState("Inactive")
  const [typeList, setTypeList] = useState(['BRACU', 'IT', 'Food', 'Publication', 'Media','Education', 'Others'])
  const [status_list, setStatusList] = useState(['Inactive', 'Active'])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSponsor = async() =>{

      console.log(sponsor_id)
      const response = await fetch(`/api/sponsor/getSingleSponsor/${sponsor_id}`)
      const json = await response.json()
      if (response.ok){
        setName(json.name)
        setType(json.type)
        setMoreInfo(json.more_info)
        setPhone(json.phone)
        setEmail(json.email)
        setSponsorStatus(json.sponsor_status)
      }
    }
    fetchSponsor()
  }, [])

    const handleSubmit= async(e)=>{
        e.preventDefault()
        const response = await fetch(`/api/sponsor/updateSponsor/${sponsor_id}`,{
          method: 'PATCH',
          body: JSON.stringify({
            name: name,
            type: type,
            more_info: more_info,
            phone:phone,
            email: email,
            sponsor_status: sponsor_status
          })
        })
        const json = await response.json()
        console.log(json)
        if(!response.ok){
          console.log("Jhamela hoise")
        }
        else{
          navigate("/Sponsor")
        }
    };



  return (
  <div className="flex flex-col items-right" style={{ backgroundImage: 'url("https://png.pngtree.com/background/20210716/original/pngtree-light-blue-cute-striped-baby-blue-background-picture-image_1348681.jpg")', backgroundSize: 'cover', minHeight: '100vh' }}>
    <div className="container mx-auto mt-2 ml-10" style={{ marginLeft: "25rem" }}>
      <div className="w-full bg-gray-100 text-gray-800 py-3 px-0 rounded-md shadow-md" style={{ maxWidth: '31rem', width: '100%' }}>
        <div className="flex justify-between">
          <div className="w-full max-w-md mx-auto">
  
            <form className="mt-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="w-full px-3 py-8 md:p-8">
                <h2 className="mt-0 mb-8 text-2xl font-bold text-gray-800">Sponsor Edit Form</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-4">
                  <label htmlFor="type" className="block text-sm font-medium text-gray-600">Type</label>
                  <select id="type" name="type" value={type} onChange={(e) => setType(e.target.value)} className="mt-5 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
                    {typeList.map((typeValue, index) => (
                      <option key={index} value={typeValue}>{typeValue}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="more_info">more_info</label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="more_info" type="text" placeholder={more_info} onChange={(e) => setMoreInfo(e.target.value)} />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">phone</label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" placeholder={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">email</label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-4">
                  <label htmlFor="sponsorstatus" className="block text-sm font-medium text-gray-600">sponsorstatus</label>
                  <select id="sponsorstatus" name="sponsorstatus" value={sponsor_status} onChange={(e) => setSponsorStatus(e.target.value)} className="mt-5 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
                    {status_list.map((statusValue, index) => (
                      <option key={index} value={statusValue}>{statusValue}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <button onClick={handleSubmit} className="mt-6 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm py-2 px-6 text-center" type="submit">Submit</button>
                </div>
              </div>
            </form>
  
          </div>
        </div>
      </div>
    </div>
  </div>
  
    
  );
};

export default SponsorEdit;