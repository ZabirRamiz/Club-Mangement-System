import { useEffect, useState } from "react"

const feed = ({post}) =>{
    const [name, setName] = useState("")
    const [upVote, setUpVote] = useState(post.upvote)
    const [downVote, setDownVote] = useState(post.downvote)

    useEffect(() =>{
        const fetchData = async() =>{
            const response = await fetch(`api/user/getSpecificUser/${post.postUserId}`)
            const json = await response.json()
            if(response.ok){
                setName(json.name)
                // setUpVote(json.upvote)
                // setDownVote(json.downvote)
            }
        }

        fetchData()
    }, [])

  const handleUpVote= async(e) => {
    e.preventDefault()
    const newUpVote = upVote + 1
    console.log(post.postUserId)
    const response = await fetch(`/api/posts/updatePost/${post.postUserId}`,{
        method: "PATCH",
        body: JSON.stringify({upvote: newUpVote}),
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
      setUpVote(newUpVote)
    }
    
  };

  const handleDownVote= async(e) => {
    e.preventDefault()
    const newDownVote = downVote + 1
    console.log(post.postUserId)
    const response = await fetch(`/api/posts/updatePost/${post.postUserId}`,{
        method: "PATCH",
        body: JSON.stringify({downvote: newDownVote}),
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
      setDownVote(newDownVote)
    }
    
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
          <button onClick={handleUpVote} className="bg-blue-500 text-white rounded-full p-2 mr-2">↑ {upVote}</button>
          <button onClick={handleDownVote} className="bg-red-500 text-white rounded-full p-2">↓ {downVote}</button>
        </div>
      </div>
    </div>

    )
}

export default feed