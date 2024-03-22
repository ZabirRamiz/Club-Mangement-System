import { useEffect, useState } from "react"
import AssignWorkForm from "../components/AssignWorkForm.jsx"
import AssignWorkFeed from "../components/AssignWorkFeed.jsx"

const UserAssignWork = () =>{
  const [works, setWork] = useState(null)

  useEffect(() =>{
    const fetchWorks = async() =>{
      const response = await fetch('api/works/getWorks')
      const json = await response.json()
      //console.log(json)
      if(response.ok){
        setWork(json)
      }
    }
    fetchWorks()
  }, [])

  return (
    <>
      <div className="flex flex-col md:flex-row items-right"
        style={{ backgroundImage: 'url("https://png.pngtree.com/background/20210716/original/pngtree-light-blue-cute-striped-baby-blue-background-picture-image_1348681.jpg")', backgroundSize: 'cover', minHeight: '100vh',  }}>
        <div className='postform md:w-1/4'>
          <AssignWorkForm />
        </div>
        <div className='md:w-3/4 overflow-auto'>
          {works && works.map((work) => (
            <AssignWorkFeed key={work._id} work={work} />
          ))}
        </div>
      </div>
    </>
  );
  

}

export default UserAssignWork