import {createContext,useEffect,useState} from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration';
import { useAuth, useUser } from "@clerk/clerk-react";



export const AppContext=createContext();

export const AppContextProvider=(props)=>{
  
  const currency=import.meta.env.VITE_CURRENCY
  
  const [allCourses,setAllCourses]=useState([])
  const [isEducator,setisEducator]=useState(true)
  const [enrolledCourses,setEnrolledCourses]=useState([])
  const navigate=useNavigate()

  const {getToken}=useAuth()
  const {user}=useUser()

  

  const fetchAllCourses=async()=>{
    setAllCourses(dummyCourses)
  }

  //Function to calculate average rating of course
  const calculateRating = (course) => {
    if (!course.courseRatings || course.courseRatings.length === 0) {
      return 0;
    }
    
    let totalRating = 0;
    course.courseRatings.forEach(rating => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  }

  //Function to calculate course chapter time
  const calculateChapterTime=(chapter)=>{
    let time=0
    chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration)
    return humanizeDuration(time*60*1000,{units:["h","m"]})
  }

  //function to calculate course Duration
  const calculateCourseDuration=(course)=>{
    let time=0;

    course.courseContent.map((chapter)=>chapter.chapterContent.map(
      (lecture)=>time+=lecture.lectureDuration
     
    ))
    return humanizeDuration(time*60*1000,{units:["h","m"]})
  }

  //Function calculate to no. of lectures in the course
  const calculateNoOfLectures=(course)=>{
    let totalLectures=0;
    course.courseContent.forEach(chapter=>{
      if(Array.isArray(chapter.chapterContent)){
        totalLectures+=chapter.chapterContent.length
      }
    })
    return totalLectures;
  }

  //Fetch usese enrolled Courses
  const fetchUserEnrolledCourses=async()=>{
    setEnrolledCourses(dummyCourses)
  }

  useEffect(()=>{
    fetchAllCourses();
    fetchUserEnrolledCourses(); 

  },[])

  const logToken=async()=>{
    console.log(await getToken());
  }

  useEffect(()=>{
    if(user){
      logToken()
    }

  },[user])
  
  const value={
    currency, allCourses,fetchAllCourses,navigate,calculateRating,isEducator,setisEducator,calculateNoOfLectures,calculateCourseDuration,calculateChapterTime,enrolledCourses,fetchUserEnrolledCourses

  }

  return(
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}
