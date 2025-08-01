import mongoose from "mongoose";

const courseProgressSchema=new mongoose.Schema({
  userId:{type:String,requried:true},
  courseId:{type:String,requried:true},
  completed:{type:Boolean,default:false},
  lectureCompleted:[]
},{minimize:false});

export const CourseProgress=mongoose.model('CourseProgress',courseProgressSchema)
