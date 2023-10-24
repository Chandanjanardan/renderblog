const e = require("express")
const mongoose = require("mongoose")
const {Schema,model}=mongoose

const UserSchem= new Schema({
    username:{type:String,required:true,trim:true,min:4,unique:true},
    password:{type:String,required:true,trim:true}
})
const UserModel=model("User",UserSchem)
module.exports=UserModel