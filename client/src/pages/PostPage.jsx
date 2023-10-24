import { useContext, useEffect,useState } from "react"
import { useParams,Link } from "react-router-dom"
import {formatISO9075} from "date-fns"
import { UserContext } from "../userContext"


function PostPage() {
    const [postInfo,setPostInfo]=useState(null)
    const {userInfo,PORT}=useContext(UserContext)
    // now the page have id in search bar to get that we an use param
    const {id}=useParams()
    useEffect(()=>{
        fetch(`${PORT}post/${id}`)
        .then(response=>response.json())
        .then(postInfo=>setPostInfo(postInfo))
       
    },[])
    if(!postInfo) return "No data"
  return (
    <div className="post-page">
        <h1>{postInfo.title}</h1>
        <div className="author">by @{postInfo.author.username}</div>
        {userInfo.id===postInfo.author._id && (
            <div className="edit-row">
                <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                    Edit this post
                </Link>
            </div>
        )}
        <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
        <div className="image">
        <img src={`${PORT}${postInfo.cover}`}/>
        </div>
        {/* if you want to print string */}
        <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}}/>
        
    </div>
  )
}

export default PostPage  