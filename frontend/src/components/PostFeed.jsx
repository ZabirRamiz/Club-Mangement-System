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

    return(
        <div className="flex flex-col items-right mt-8 ml-1">
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {name}
              </h6>
            </a>
            {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
            </p> */}
            <div className="flex justify-between mt-4">
              {post.body}
            </div>
          </div>
        </div>

    )
}

export default feed