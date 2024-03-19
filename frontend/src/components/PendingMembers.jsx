import { useEffect, useState } from "react"
import PendingMemberFeed from "../components/PendingMemberFeed.jsx"

const ManagePendingMembers = () =>{
  const [users, setUser] = useState(null)

  useEffect(() =>{
    const fetchUser = async() =>{
      const response = await fetch('api/user/getAllUser')
      const json = await response.json()
      //console.log(json)
      if(response.ok){
        setUser(json)
        console.log(users)
      }
    }
    fetchUser()
  }, [])

  return (
    <>
    <div className="flex flex-col md:flex-row items-right" style={{ backgroundImage: 'url("https://png.pngtree.com/background/20210716/original/pngtree-light-blue-cute-striped-baby-blue-background-picture-image_1348681.jpg")', backgroundSize: 'cover', minHeight: '100vh' }}>
        <div className='overflow-auto grid grid-cols-5 gap-4'>
        {users && users.map((user) => {
            if (user.designation === "Pending") {
                return <PendingMemberFeed key={user.sid} user={user} />;
            }
            return null; // Render nothing if user's designation is not "Pending"
        })}
        </div>
    </div>

    </>
  );
  

}

export default ManagePendingMembers