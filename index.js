require('dotenv').config();
const express = require ("express")
const cors=require("cors")
const app = express()
const mongoose= require("mongoose")
const User=require("./models/user.modal")
const Post=require("./models/post.modal")
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")
const multer=require("multer")
const uploadMiddleware = multer({ dest: 'uploads/' })
const fs=require("fs")
const secret = process.env.SECRET
const URI=process.env.URI

app.use(cors({credentials:true,origin:'https://6537c59b3233bd0756473e7a--sweet-medovik-e8b690.netlify.app'}))

app.use(express.json())
const cookieParser= require("cookie-parser")
// to read cookie wehen send from client 
app.use(cookieParser())
let PORT = process.env.PORT || 4000

// for img
app.use("/uploads",express.static(__dirname+"/uploads"))


mongoose.connect('mongodb+srv://00chandan95:p4cVQyLbsidGz2Yd@cluster0.wbclqzn.mongodb.net/?retryWrites=true&w=majority')


app.post("/register",async(req,res)=>{
    const {username,password}=req.body
    const hashPassword=await bcrypt.hash(password,10)
    try {
        
        const userDoc=await User.create({username,password:hashPassword})
    
        res.json({data:{userDoc}})
    } catch (error) {
        res.status(400).json(error)
    }
})
app.post("/login",async (req,res)=>{
    const {username,password}=req.body
    const userDoc= await User.findOne({username})
    const pass= await bcrypt.compare(password,userDoc.password)
    if(pass){
       jwt.sign({username,id:userDoc._id},'secret',{},(error,token)=>{
            if(error) throw error;
            res.cookie("token",token).json({
                id:userDoc._id,
                username:userDoc.username
            })
        })
    }else{
        res.status(400).json("wrond credentials")
    }
})
app.get("/profile",(req,res)=>{
    const {token}=req.cookies
   jwt.verify(token,'secret',{},(error,info)=>{
        if(error) throw error
        // res.json(info)
    })
    res.json(req.cookies);
})
app.post("/logout",(req,res)=>{
    res.cookie("token","").json("ok")
})
// for post data from create post form
// in single the data.set("name") will get here
app.post("/post",uploadMiddleware.single("file"),async(req,res)=>{
//     // when data send from create post img is present for that we need MULTER
// orignal name is res visible in network
const {originalname,path}=req.file
// all data in network 
// res.json({files:req.file})
// res.json({ext})
const parts=originalname.split(".")
const ext=parts[parts.length-1]
const newPath=path+"."+ext
fs.renameSync(path,newPath)
const {token} =req.cookies
 await jwt.verify(token,"secret",{},async(error,info)=>{
    if(error) throw error;
  
    // to save in db we need few things in payload of network post
    const {title,summary,content}=req.body
    const postDoc=await Post.create({
        title,
        summary,content,
        cover:newPath,
        // .id because above we have set it to id checl
        author:info.id
    })
    res.json({postDoc});
})
})

app.get("/post",async(req,res)=>{
    // populate because we are getting id and ref
    const posts=await Post.find().populate("author",["username"])
    .sort({createdAt:-1}).limit(20)
    res.status(200).json({posts})
})

app.get("/post/:id",async(req,res)=>{
    const {id}=req.params
  let postDoc=await  Post.findById(id).populate("author",['username'])
  res.json(postDoc)
})
app.put("/post",uploadMiddleware.single("file"),async(req,res)=>{
    let newPath=null;
   if(req.file){
    const {originalname,path}=req.file
    const parts=originalname.split(".")
    const ext=parts[parts.length-1]
    const newPath=path+"."+ext
    fs.renameSync(path,newPath)
   }
   const {token} =req.cookies;
   await jwt.verify(token,"secret",{},async(error,info)=>{
    if(error) throw error;
    const {id,title,summary,content}=req.body
    const postDoc=await Post.findById(id)
    const isAuthor=JSON.stringify(postDoc.author) ===JSON.stringify(info.id)
    // res.json({isAuthor,postDoc,info})
    if(!isAuthor){
        res.status(400).json("youare not the author")
      
    }
    await postDoc.updateOne({title,
        summary,
        content,
    cover:newPath?newPath:postDoc.cover})
    res.json(postDoc)

  
    // to save in db we need few things in payload of network post
    // const postDoc=await Post.create({
    //     title,
    //     summary,content,
    //     cover:newPath,
    //     // .id because above we have set it to id checl
    //     author:info.id
    // })
})
})
if(process.env.NODE_ENV=="production"){
    app.use(express.static("client/build"))
}


app.listen(PORT,()=>{
    console.log("Listing at 4000....")
})