import  { useState, useEffect } from 'react';

import FinanceFeed from '../components/FinanceFeed.jsx'

// EventPost component to display event posts




function Finance() {

  const [finances, setFinances] = useState()

  useEffect(() =>{
    const fetchFinances = async() =>{
      const response = await fetch('api/finances/getFinances')
      const json = await response.json()
      console.log(json)
      
      if (response.ok){
        setFinances(json)
      }
    }
    fetchFinances()
  }, [])

  // Sample event data
  


  return (
    <>
      <div className="flex flex-col items-right" style={{ backgroundImage: 'url("https://png.pngtree.com/background/20210716/original/pngtree-light-blue-cute-striped-baby-blue-background-picture-image_1348681.jpg")', backgroundSize: 'cover', minHeight: '100vh' }}>
        <div className="container mx-auto mt-8">
          <div className="bg-gray-100 text-gray-800 py-3 px-4 rounded-md shadow-md">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold ml-7">Event Title</h2>
              <h2 className="text-xl font-semibold text-center mr-24">Financial Status</h2>
              <h2 className="text-xl font-semibold mr-10"> Nothing </h2>
            </div>
            <div>
            {finances && finances.map((finance) =>(
                <FinanceFeed key = {finance._id} finance = {finance}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );  
}

export default Finance;

























