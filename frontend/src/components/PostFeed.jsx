import { useEffect, useState } from "react"

const feed = ({post}) =>{
    const [name, setName] = useState("")

    useEffect(() =>{
        const fetchData = async() =>{
            const response = await fetch(`api/user/getSpecificUser/${post.postUserId}`)
            const json = await response.json()
            if(response.ok){
                setName(json.name)
            }
        }

        fetchData()
    }, [])

  const handleUpArrowClick=()=>{
  };

  const handleDownArrowClick=()=>{
    
  };

  

    return(
      <div className="flex flex-col items-right mt-4 "  style={{ marginLeft: '700px'}}>
      <div className="max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
        <a href="#">
          <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h6>
        </a>
        <div className="flex justify-between mt-4">
          {post.body}
        </div>
        {/* Up and down arrows inside the card */}
        <div className="absolute right-4 bottom-4">
          <button onClick={handleUpArrowClick} className="bg-blue-500 text-white rounded-full p-2 mr-2">↑</button>
          <button onClick={handleDownArrowClick} className="bg-red-500 text-white rounded-full p-2">↓</button>
        </div>
      </div>
    </div>

    )
}

export default feed