import React,{useEffect,useState,useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../userContext'

function Header() {
  const {userInfo,setUserInfo,PORT}=useContext(UserContext)
  // const [username,setUsername]=useState(null)
  useEffect(()=>{
    fetch(PORT+"profile",{
      credentials:"include",
  
    })
    .then(res=>{
      res.json().then(userInfo=>{
        // setUsername(userInfo.username)
        setUserInfo(userInfo)
      })
    })
  },[])
  const username=userInfo?.username

  function logout(){
    fetch(PORT+"logout",{
      method:"POST",
      credentials:"include",
    
    })
    // setUsername(null)
  setUserInfo(null)
  }

  return (
    <header>
    <Link to='/' className='logo'>Digital Paper</Link>
    <nav>
      {username && (
        <>
        {/* <span>Hello {username}</span> */}
        <Link to="/create">Create new post</Link>
        <a onClick={logout}>Logout</a>
        </>
      )}
      {!username && (
        <>
        
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  </header>
  )
}

export default Header