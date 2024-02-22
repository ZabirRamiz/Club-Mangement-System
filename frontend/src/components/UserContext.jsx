import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) =>{
    const [studentId, setstudentId] = useState("")

    return(
        <UserContext.Provider value = { { studentId, setstudentId } }>
            {children}
        </UserContext.Provider>

    )
}

export const useUser = () => useContext(UserContext)