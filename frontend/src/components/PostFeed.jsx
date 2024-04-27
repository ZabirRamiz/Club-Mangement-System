import { useEffect, useState } from "react"

const Feed = ({post}) =>{
    const [name, setName] = useState("")
    const [userID, setUserID] = useState(parseInt(localStorage.getItem('Id')))
    const [upVote, setUpVote] = useState(0)
    const [downVote, setDownVote] = useState(0)
    const [upVoteColor, setUpVoteColor] = useState("bg-blue-500 text-white rounded-full p-2 mr-2")
    const [downVoteColor, setDownVoteColor] = useState("bg-red-500 text-white rounded-full p-2 mr-2")

    useEffect(() =>{
        const fetchData = async() =>{
            const response = await fetch(`api/user/getSpecificUser/${post.postUserId}`)
            const json = await response.json()
            if(response.ok){
                setName(json.name)
                setUpVote(post.upvote.length)
                setDownVote(post.downvote.length)
            }
            console.log(`${post.postUserId}, upvote: ${post.upvote}, downvote: ${post.downvote}`)
            if(post.upvote.includes(userID)){
              setUpVoteColor("bg-blue-800 text-white rounded-full p-2 mr-2")
            }
            else if(post.downvote.includes(userID)){
              setDownVoteColor("bg-red-500 text-white rounded-full p-2 mr-2")
            }
        }

        fetchData()
    }, [post.downvote, post.postUserId, post.upvote, userID])

    useEffect(() =>{
      const setVoteColor = async() =>{
          const upVoteArray = post.upvote
          const downVoteArray = post.downvote
          if (upVoteArray.includes(userID)){
            setUpVoteColor("bg-blue-800 text-white rounded-full p-2 mr-2")
          }
          if (downVoteArray.includes(userID)){
            setDownVoteColor("bg-red-500 text-white rounded-full p-2 mr-2")
          }
      }

      setVoteColor()
  }, [post.downvote, post.upvote, userID])

  useEffect(() =>{
    console.log(upVoteColor)
}, [upVoteColor])


  const handleUpVote= async(e) => {
    e.preventDefault()
    console.log(post.postUserId)
    const upVoterArray = post.upvote
    const downVoterArray = post.downvote
    if (upVoterArray.includes(userID)){
      upVoterArray.splice(upVoterArray.indexOf(userID), 1)            //remove upvote
      setUpVoteColor("bg-blue-500 text-white rounded-full p-2 mr-2")
      
    }
    else{
      upVoterArray.splice(upVoterArray.indexOf(userID), 0, userID)    // add upvote
      setUpVoteColor("bg-blue-800 text-white rounded-full p-2 mr-2")
      console.log(upVoteColor)
      if (downVoterArray.indexOf(userID) !== -1){
        downVoterArray.splice(downVoterArray.indexOf(userID), 1)      //remove downvote
        setDownVoteColor("bg-red-500 text-white rounded-full p-2 mr-2")
        
      }
      
    }

    const response = await fetch(`/api/posts/updatePost/${post._id}`,{
        method: "PATCH",
        body: JSON.stringify({upvote: upVoterArray, downvote: downVoterArray}),
        headers:{
          'Content-Type': 'application/json'
        }
    });
    const json = await response.json();
    console.log(json)
    if(!response.ok){
      console.log("BHI JHAMELA")
    }
    else{
      setUpVote(post.upvote.length)
      setDownVote(post.downvote.length)
    }
    
  };

  const handleDownVote= async(e) => {
    e.preventDefault()

    console.log(post.postUserId)
    const upVoterArray = post.upvote
    const downVoterArray = post.downvote
    if (downVoterArray.includes(userID)){
      downVoterArray.splice(downVoterArray.indexOf(userID), 1)            // remove downvote
      setDownVoteColor("bg-red-500 text-white rounded-full p-2 mr-2")
    }
    else{
      
      if (upVoterArray.indexOf(userID) !== -1){
        upVoterArray.splice(upVoterArray.indexOf(userID), 1)              // remove upvote
        setUpVoteColor("bg-blue-500 text-white rounded-full p-2 mr-2")
      }
      downVoterArray.splice(downVoterArray.indexOf(userID), 0, userID)    // add downvote
      setDownVoteColor("bg-red-800 text-white rounded-full p-2 mr-2")
    }
    const response = await fetch(`/api/posts/updatePost/${post._id}`,{
        method: "PATCH",
        body: JSON.stringify({upvote: upVoterArray, downvote: downVoterArray}),
        headers:{
          'Content-Type': 'application/json'
        }
    });
    const json = await response.json();
    console.log(json)
    if(!response.ok){
      console.log("BHI JHAMELA")
    }
    else{
      setUpVote(post.upvote.length)
      setDownVote(post.downvote.length)
    }
    
  };

  const handleDelete= async(e) => {
    e.preventDefault()

    const response = await fetch(`/api/posts/deletePost/${post._id}`,{
      method: "DELETE",
      headers:{
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()
    console.log(json)
    if(response.ok){
      window.location.reload()
    }
    else{
      console.error("Hoynai delete")
    }
  };

  
    return(
      <div className="flex flex-col items-right mt-10 "  style={{ marginLeft: '800px'}}>
      <div className="max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:text-white  relative">
        <a href="#">
          <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h6>
        </a>
        <div className="flex  mt-4">
          <p><b>Category:  </b>{post.type}</p>
        </div>
        {post.type == "Event" && (
          <div className="flex  mt-4">
          <p><b>Event Title:  </b>{post.event}</p>
        </div>
        )}
        <div className="flex justify-between mt-4">
          {post.body}
        </div>
        {/* Up and down arrows inside the card */}
        <div className="absolute right-4 bottom-4">
          <button onClick={handleUpVote} className= {`${upVoteColor}`}>↑ {upVote}</button>
          <button onClick={handleDownVote} className={`${downVoteColor}`}>↓ {downVote}</button>
        {post.postUserId == userID && (
            
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300">
            Delete
          </button>
          )}
          
        </div>
      </div>
    </div>

    )
}

export default Feed