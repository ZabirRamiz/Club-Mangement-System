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
    <>
    <div className="flex flex-col items-right "
      style={{ backgroundImage: 'url("https://png.pngtree.com/background/20210716/original/pngtree-light-blue-cute-striped-baby-blue-background-picture-image_1348681.jpg")', backgroundSize: 'cover', minHeight: '100vh', minWidth:'100vh' }}>
    <div className='userpost'>
      <div className='postform' >
        <PostForm/>
        <div  style={{ marginTop: '-820px' }} >
         
        {posts && posts.map((post) =>(
          <PostFeed key={post._id} post = {post} />
        ))}
      </div>
      </div>

    </div>
    </div>
    </>

  )

}

export default UserPost