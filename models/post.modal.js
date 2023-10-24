// to save data to db from create post
const mongoose =require("mongoose")
const {Schema,model}=mongoose   ;

const PostSchema=new Schema({
    title:String,
    summary:String,
    content:String,
    cover:String,
    author:{type:Schema.Types.ObjectId,ref:"User"}
},{
    // we can use it to uploaded at and create at
    timestamps:true
})
const PostModel=model("Post",PostSchema)
module.exports= PostModel