import React ,{useContext, useEffect,useState}from 'react'
import Posts from '../components/Posts'
import { UserContext } from '../userContext'


function Index() {
  const {PORT} =useContext(UserContext)
  
  const [posts,setPosts]=useState([])
  useEffect(()=>{
    fetch(PORT+"post").then(response=>{
      response.json().then(posts=>{
       setPosts(posts.posts)
      })
    })
  },[])
  
  
  return (
    <>
    {posts.length>0 && posts.map((post,Index)=>(
      <Posts key={Index} {...post}/>
      
    ))}
    </>
  )
}

export default Index