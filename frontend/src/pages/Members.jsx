import { useEffect, useState } from "react"

import MemberDetails from '../components/MemberDetails.jsx'
import MemberForm from '../components/MemberForm.jsx'

const Members = () =>{
    const[members, setMembers] = useState(null)

    useEffect(() =>{
        const fetchMembers = async() =>{
            const response = await fetch('api/members')
            const json = await response.json()

            if( response.ok ){
                setMembers(json)
            }
        }
        fetchMembers()
    }, [] )

    return(
        <div className="home">
            <div className="documents">
                {members && members.map((member) =>(
                    <MemberDetails key = {member._id} member = {member} />
                ))}
            </div>
            <MemberForm/>
        </div>
    )
}

export default Members