import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
const PostForm = () =>{
    const [postUserId, setPostUser] = useState("")
    const [postUserName, setPostUserName] = useState("")
    const [body, setPostBody] = useState("")
    const [type, setType] = useState("General")
    const [eventList, setEventList] = useState([])
    const [event, setEvent] = useState("None")

    
    const navigate = useNavigate();

    const handleDropdownChange = (e) => {
      setType(e.target.value);
    };
    const handleEventDropdownChange = (e) => {
      setEvent(e.target.value);
      console.log(event, event_id)
    };
      
    useEffect(() =>{
        

        const fetchData = async() =>{
            const loginId = localStorage.getItem("Id")
            setPostUser(loginId)
            const tempEventDic = {}
            const response = await fetch(`/api/user/getSpecificUser/${loginId}`)
            const userData = await response.json();
            const getEvent = await fetch('/api/events/getEvents')
            const eventData = await getEvent.json()

            console.log(tempEventDic)
            const titles = eventData.map(event => event.title)
            setEventList(titles)
            setEvent(titles[0])
            setPostUserName(userData.name)
            

        }
        fetchData();
    }, [] )
    const handleSubmit = async(e) =>{
        e.preventDefault()

        const postData = {postUserId, body, type, event}
        console.log(postData)
        const response = await fetch('/api/posts/makePost',{
            method: 'POST',
            body: JSON.stringify(postData),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if (response.ok){
            setPostBody("")
            window.location.reload()
        }
        else{
            console.error("Jhamela hose")
        }
        
    

    }

    return(
      
      <div className='lg:w-1/2 md:w-2/4 sm:w-full'>

    <div className="container mx-auto p-4 md:p-10">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="w-full px-3 py-8 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800">Create Post</h2>
            <form className="mt-6">
              <div className="mb-6">
                <label htmlFor="postUser" className="block text-gray-800 font-bold mb-2">
                  Post As:
                </label>
                <input
                  id="postUser"
                  type="number"
                  placeholder={postUserName}
                  className="shadow appearance-none border rounded w-full md:w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  disabled
                />
              </div>

              <div className="mb-6">
                <label htmlFor="dropdown" className="block text-gray-800 font-bold mb-2">
                  Select an option
                </label>
                <select
                  id="dropdown"
                  value={type}
                  onChange={handleDropdownChange}
                  className="w-full md:w-96 px-3 py-2 text-sm text-gray-900 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>Select an option</option>
                  <option value="General">General</option>
                  <option value="Event">Event</option>
                  <option value="Suggestion">Suggestion</option>
                  <option value="Complain">Complains</option>
                </select>
               </div>
                  {type == "Event" && (
                    <div className="px-4 py-2 bg-white dark:bg-gray-800">
                    <label htmlFor="EventDropdown" className="sr-only">
                      Select an option
                    </label>
                    <select
                      id="EventDropdown"
                      value={event}
                      onChange={handleEventDropdownChange}
                      className="w-full h-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 mb-2"
                    >
                      <option value="" disabled>
                        Select an Event
                      </option>
                        {eventList.map((title, index) => (
                          <option key={index} value={title}>{title}</option>
                        ))}
                    </select>
                  </div>
                  )}
                      <div className=" w-96 h-96 px-4 py-2 bg-white rounded-lg dark:bg-gray-800">
                        <label htmlFor="post" className="block text-gray-800 font-bold mb-2">
                            Write Post
                        </label>
                        <textarea
                          id="post"
                          value={body}
                          style={{maxHeight: '320px', minHeight: "320px" }}
                          onChange={(e) => setPostBody(e.target.value)}
                          className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                          placeholder="What's on your mind?"
                          required
                        />
                      </div>
                    {/* </div> */}
                  <button
                    className="mt-5 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Post
                  </button>
                  
                </form>   
                
              </div>
            </div>
          </div>
        </div>
        </div>

    )
}

export default PostForm;