

import { useEffect, useState } from "react";

const Feed = ({finance}) => {

  const [event, setEvent] = useState()
  const [budget, setBudget] = useState(0)
  const [pl, setPl] = useState(finance.pl)
  const [received, setReceived] = useState(0)
  const [dateReceived, setDateReceived] = useState("")
  const [sponsorList, setSponsorList] = useState()
  const [selectedSponsor, setSelectedSponsor] = useState(finance.sponsor);

  useEffect(() => {
    const fetchData = async () => {
      console.log(finance)
      setBudget(finance.budget)
      setPl(finance.pl)
      setReceived(finance.received)
      setDateReceived(finance.dateReceived)
      setSelectedSponsor(finance.sponsor)
      const eventResponse = await fetch(`/api/events/getSingleEvent/${finance.event}`);
      const sponsorResponse = await fetch('api/sponsor/getActiveSponsors')
      const eventJson = await eventResponse.json()
      const sponsorJson = await sponsorResponse.json()
      if (eventResponse.ok){
        setEvent(eventJson)
      }
      if (sponsorResponse.ok){
        setSponsorList(sponsorJson)
        console.log(sponsorJson)
      }
      
  }
  fetchData()
    
  }, [finance]);





  const handleUpdate = async (e) => {
    e.preventDefault()
    const data = {
      budget: budget,
      pl: pl,
      received: received,
      dateReceived: dateReceived,
      sponsor: selectedSponsor
    }

    const response =  await fetch(`api/finances/updateFinance/${finance._id}`,{
      method:'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    })
    const json = await response.json()
      if (response.ok){
        window.location.reload()
        console.log(json)
      }
      else{
        console.log("UPDATE HOYNAI")
      }
    
  };
  


  return (
    <>
      <div className="bg-white p-4 rounded-md my-4 shadow-lg flex justify-between items-center">
        <h3 className="text-lg font-semibold ml-7">{event?.title}</h3>
        <div className="flex flex-col justify-center flex-grow border-l-2 border-r-2 border-dotted border-gray-400 ml-24 mr-24">
          <div className="flex items-center ml-20 mb-4">
            <label className="text-lg font-semibold text-center ml-20 mb-2" htmlFor={`allocatedBudget`}>
              Allocated budget:
            </label>
            <input 
              type="text" 
              id={`allocatedBudget`} 
              placeholder={finance.budget}
              className="text-lg font-semibold text-center ml-2 border border-gray-400 px-2 py-1 rounded-md" 
              onChange={(e) => setBudget(e.target.value)}
              />
          </div>
          <div className="flex items-center ml-20 mb-4">
            <label className="text-lg font-semibold text-center ml-20 mb-2" htmlFor={`pl`}>
              PL:
            </label>
            <input 
              type="checkbox" 
              id={`pl`} 
              className="accent-green-500 h-6 w-6 ml-2" 
              onChange={(e) => setPl(e.target.checked)}
              checked={pl}
            />

          </div>

          <div className="flex items-center ml-20 mb-4">
            <label className="text-lg font-semibold text-center ml-20 mb-2" htmlFor={`moneyReceived`}>
              Money Received:
            </label>
            <input 
              type="text" 
              id={`moneyReceived`} 
              placeholder={finance.received}
              className="text-lg font-semibold text-center ml-2 border border-gray-400 px-2 py-1 rounded-md" 
              onChange={(e) => setReceived(e.target.value)}
            />
          </div>

          <div className="flex items-center ml-20 mb-4">
            <label className="text-lg font-semibold text-right ml-20 mb-2" htmlFor={`date`}>
              Money Received Date:
            </label>
            <input 
              type="date" 
              id={`date`} 
              defaultValue={finance.dateReceived !== null ? new Date(finance.dateReceived).toISOString().split('T')[0] : ""} 
              onChange={(e) => setDateReceived(e.target.value)} 
              className="text-lg font-semibold text-center ml-2 border border-gray-400 px-2 py-1 rounded-md" 
            />

          </div>

          <div className="flex items-center ml-20 mb-4">
            <label className="text-lg font-semibold text-center ml-20 mb-2" htmlFor={`moneyReceived`}>
              Sponsor:
            </label>
            <div className="relative inline-block text-left">
              <select
                id="sponsor"
                className="inline-flex justify-center ml-2 w-full rounded-md border border-gray-300 shadow-sm bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                value={selectedSponsor}
                placeholder="Hello"
                onChange={(e) => setSelectedSponsor(e.target.value)}
              >
                {sponsorList && sponsorList.map(sponsor => (
                  <option 
                    key={sponsor._id} 
                    value={sponsor._id} // Conditionally set the selected attribute
                  >
                    {sponsor.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button className="bg-green-500 hover:bg-green-700 text-white rounded-full p-2 mr-7 transition duration-300 ease-in-out" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </>
  );
};

export default Feed;

