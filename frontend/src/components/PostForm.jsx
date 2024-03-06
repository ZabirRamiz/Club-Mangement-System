import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
const PostForm = () =>{
    const [postUserId, setPostUser] = useState("")
    const [postUserName, setPostUserName] = useState("")
    const [body, setPostBody] = useState("")
    const navigate = useNavigate();
    
    useEffect(() =>{
        

        const fetchData = async() =>{
            const loginId = localStorage.getItem("Id")
            setPostUser(loginId)

            const response = await fetch(`/api/user/getSpecificUser/${loginId}`)
            const userData = await response.json();
            
            setPostUserName(userData.name)
            console.log(postUserName)
            

        }
        fetchData();
    }, [] )
    const handleSubmit = async(e) =>{
        e.preventDefault()
        const vote = 0
        const postData = {postUserId, body, vote}
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
            navigate("/UserPost");
        }
        else{
            console.error("Jhamela hose")
        }
        
        
    }

    return(
        <div className="container mx-auto p-4 md:p-10">
          <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-xl">
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    disabled
                    />
                  </div>
              
                  <div className="mb-6">
                    <label htmlFor="post" className="block text-gray-800 font-bold mb-2">
                      Write Post
                    </label>
                    <input
                      id="post"
                      type="text"
                      placeholder="What's on your mind?"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={body}
                      onChange={(e) => setPostBody(e.target.value)}
                    />
                  </div>
              
              
              
                  <button
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </form>   
              </div>
            </div>
          </div>
        </div>

    )
}

export default PostForm;