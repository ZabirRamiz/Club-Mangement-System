import { useEffect, useState } from "react"
import PostForm from '../components/PostForm.jsx'
import PostFeed from '../components/PostFeed.jsx'
const UserPost = () =>{
  const [posts, setPosts] = useState("")

  useEffect(() =>{
    const fetchPosts = async() =>{
      const response = await fetch('api/posts/allPosts')
      const json = await response.json()
      console.log(json)
      if (response.ok){
        setPosts(json)
      }
    }
    fetchPosts()
  }, [])

  return(
    <div className='userpost'>
      <div className='postform'>
        <PostForm/>

        {posts && posts.map((post) =>(
          <PostFeed key={post._id} post = {post} />
        ))}
      </div>

    </div>

  )

}

export default UserPost