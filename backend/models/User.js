import express from 'express'
import mongoose from 'mongoose'

const userSchema=new mongoose.Schema(
  {
    _id:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,requied:true},
    imageUrl:{type:String,requied:true},
    enrolledCourses:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
      }
    ]
  },{timestamps:true}
);

const User= mongoose.model('user',userSchema);

export default User