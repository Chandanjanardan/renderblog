import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
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

function CreatePost() {
  const {PORT}  =useContext(UserContext)
  const navigate=useNavigate()
    const [title,setTitle]=useState("")
    const [summary,setSummary]=useState("")
    const [content,setContent]=useState("")
    const [files,setFiles]=useState("")
   async function createNewPost(ev){
      const data= new FormData()
      data.set("title",title)
      data.set("summary",summary)
      data.set("content",content)
      data.set("content",content)
      // data [0] because console the files in 0 img information is present
      data.set("file",files[0])
      ev.preventDefault()
  
  let response=await fetch(PORT+"post",{
        method:"POST",
        body:data,
        credentials:"include"
      })
      if(response.ok){
        navigate("/")
      }
      
    }
  
  return (
    <form onSubmit={createNewPost}>
        <input value={title} onChange={(ev)=>setTitle(ev.target.value)} type="title" placeholder='Title'/>

        <input value={summary} onChange={(ev)=>setSummary(ev.target.value)}  type ="summary" placeholder="Summary"/>

        <input  onChange={ev=>setFiles(ev.target.files)} type="file"/>
        <ReactQuill value={content} onChange={(newValue)=>setContent(newValue)}    modules={modules} formats={formats}/>
        <button style={{marginTop:"5px"}}>Create post</button>
    </form>
  )
}

export default CreatePost

// in network after post create post with image
// payload is title summay content file (binary) for that wee need multer