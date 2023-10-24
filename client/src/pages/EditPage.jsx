import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css";
import { UserContext } from '../userContext'

const  modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
  
}
const  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]


function EditPage() {
  const {PORT} =useContext(UserContext)
    
    const {id} =useParams()
    const navigate=useNavigate()
    const [title,setTitle]=useState("")
    const [summary,setSummary]=useState("")
    const [content,setContent]=useState("")
    
    const [files,setFiles]=useState("")

    useEffect(()=>{
        fetch(`${PORT}post/${id}`)
        .then(response=>{
            response.json().then(postInfo=>{
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setSummary(postInfo.summary);
            })
        })
    },[])
  function updatePost(ev){
    ev.preventDefault()
    
    const data= new FormData()
      data.set("title",title)
      data.set("summary",summary)
      data.set("content",content)
      data.set("content",content)
      data.set("id",id)
      // data [0] because console the files in 0 img information is present
      data.set("file",files?.[0])
      
      fetch (PORT+"post",{
          method:"PUT",
          body:data,
          credentials:"include"
        })
        navigate(`/post/${id}`)
    }
  
   
  return (
    <form onSubmit={updatePost}>
        <input  onChange={(ev)=>setTitle(ev.target.value)} type="title" placeholder='Title' value={title}/>

        <input value={summary} onChange={(ev)=>setSummary(ev.target.value)}  type ="summary" placeholder="Summary"/>

        <input  onChange={ev=>setFiles(ev.target.files)} type="file"/>
        <ReactQuill value={content}  onChange={(newValue)=>setContent(newValue)} modules={modules} formats={formats}/>
        <button style={{marginTop:"5px"}}>Update Post</button>
    </form>
  )
}

export default EditPage

// onChange={(newValue)=>setContent(newValue)}