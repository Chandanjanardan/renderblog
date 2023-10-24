import { children, createContext, useState } from "react";


export const UserContext=createContext({})
export function UserContextProvider({children}){
    const [userInfo,setUserInfo]=useState({})
    const PORT="http://localhost:4000/"
    // const PORT="https://digitalpapers-6882c015533d.herokuapp.com/"
    return (
        <UserContext.Provider value={{userInfo,setUserInfo,PORT}}>
        {children}
        </UserContext.Provider>
       
    )
}