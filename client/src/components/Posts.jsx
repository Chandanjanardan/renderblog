import React, { useContext } from 'react'
import {Link} from "react-router-dom"
import {formatISO9075} from "date-fns"
// npm i data-fns
import { UserContext } from '../userContext'


function Posts({_id,title,summary,cover,content,createdAt,author}) {
  const {PORT} =useContext(UserContext)
 
  return (
    
    <div className='post'>
      <div className='img'>

      {/* <img src='https://images.pexels.com/photos/380954/pexels-photo-380954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/> */}
      <Link to={`/post/${_id}`}>

      <img src={PORT+cover} alt="backendimg"/>
      </Link>
      </div>
      <div className='texts'>
      <Link to={`/post/${_id}`}>
      <h2>{title}</h2>
      </Link>
     <p className='info'>
      <a className='author'>{author.username}</a>
      <time>{formatISO9075(new Date(createdAt))}</time>
     </p>
      <p className='summary'>{summary}</p>
      </div>
    </div>
   
 
    
   
    
   
  )
}

export default Posts