import React from 'react'
import "./App.css"
import Posts from './components/Posts'
import Headers from './components/Header'
import {Route, Routes,route} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Layout from './Layout'
import Index from './pages/Index'
import { UserContextProvider } from './userContext'
import CreatePost from './pages/CreatePost'
import PostPage from './pages/PostPage'
import EditPage from './pages/EditPage'

function App() {
  return (
    <>
    <UserContextProvider>

    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Index/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/create" element={<CreatePost/>}/>
        <Route path="/post/:id" element={<PostPage/>}/>
        <Route path="/edit/:id" element={<EditPage/>}/>
        </Route>
        </Routes>
      

    </UserContextProvider>
    </>
  )
}

export default App