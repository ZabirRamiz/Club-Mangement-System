// import { useState, useEffect } from 'react'
// import { useNavigate } from "react-router-dom";
// const PostForm = () =>{
//     const [postUserId, setPostUser] = useState("")
//     const [postUserName, setPostUserName] = useState("")
//     const [body, setPostBody] = useState("")
//     const navigate = useNavigate();
    
//     useEffect(() =>{
        

//         const fetchData = async() =>{
//             const loginId = localStorage.getItem("Id")
//             setPostUser(loginId)

//             const response = await fetch(`/api/user/getSpecificUser/${loginId}`)
//             const userData = await response.json();
            
//             setPostUserName(userData.name)
//             console.log(postUserName)
            

//         }
//         fetchData();
//     }, [] )
//     const handleSubmit = async(e) =>{
//         e.preventDefault()
//         const vote = 0
//         const postData = {postUserId, body, vote}
//         console.log(postData)
//         const response = await fetch('/api/posts/makePost',{
//             method: 'POST',
//             body: JSON.stringify(postData),
//             headers:{
//                 'Content-Type': 'application/json'
//             }
//         })
//         const json = await response.json()
//         if (response.ok){
//             setPostBody("")
//             navigate("/UserDashboard");
//         }
//         else{
//             console.error("Jhamela hose")
//         }
        
        
//     }

//     return(
//         <div className="container mx-auto p-4 md:p-10 ml-[-350px]">
//           <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-xl">
//             <div className="md:flex">
//               <div className="w-full px-3 py-8 md:p-8">
//                 <h2 className="text-2xl font-bold text-gray-800">Create Post</h2>
//                 <form className="mt-6">
//                   <div className="mb-6">
//                     <label htmlFor="postUser" className="block text-gray-800 font-bold mb-2">
//                       Post As: 
//                     </label>
//                     <input
//                     id="postUser"
//                     type="number"
//                     placeholder={postUserName}
//                     className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     disabled
//                     />
//                   </div>
              
//                   <div className="mb-6">
//                     <label htmlFor="post" className="block text-gray-800 font-bold mb-2">
//                       Write Post
//                     </label>
//                     <input
//                       id="post"
//                       type="text"
//                       placeholder="What's on your mind?"
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       value={body}
//                       onChange={(e) => setPostBody(e.target.value)}
//                     />
//                   </div>
              
              
              
//                   <button
//                     className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//                     type="button"
//                     onClick={handleSubmit}
//                   >
//                     Submit
//                   </button>
//                 </form>   
//               </div>
//             </div>
//           </div>
//         </div>

//     )
// }

// export default PostForm;


import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
const PostForm = () =>{
    const [postUserId, setPostUser] = useState("")
    const [postUserName, setPostUserName] = useState("")
    const [body, setPostBody] = useState("")
    const [selectedOption, setSelectedOption] = useState('');
    
    const navigate = useNavigate();

    const handleDropdownChange = (e) => {
      setSelectedOption(e.target.value);
  };
    
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
            navigate("/UserDashboard");
        }
        else{
            console.error("Jhamela hose")
        }
        
    

    }

    return(
      
        <div className="container mx-auto p-4 md:p-10 ml-[-380px] ">
          <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden ">
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
                    className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    disabled
                    />
                  </div>
              
                    
                    <div className="w-96 h-96 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="px-4 py-2 bg-white dark:bg-gray-800">
                    <label htmlFor="dropdown" className="sr-only">
                      Select an option
                    </label>
                    <select
                      id="dropdown"
                      value={selectedOption}
                      onChange={handleDropdownChange}
                      className="w-full h-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 mb-2"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="option1">Post</option>
                      <option value="option2">Suggetion</option>
                      <option value="option3">Ideas</option>
                      <option value="option3">Complains</option>
                    </select>
                  </div>
                      <div className=" w-96 h-96 px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                        <label htmlFor="post" className="block text-gray-800 font-bold mb-2">
                            Write Post
                        </label>
                        <textarea
                          id="post"
                          rows="15"
                          value={body}
                          onChange={(e) => setPostBody(e.target.value)}
                          className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                          placeholder="What's on your mind?"
                          required
                        />
                      </div>
                    </div>
                  <button
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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

    )
}

export default PostForm;