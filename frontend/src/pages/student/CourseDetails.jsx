import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";
import YouTube from "react-youtube";
import { toast } from "react-toastify";
import axios from "axios";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const {
    allCourses,
    calculateRating,
    calculateNoOfLectures,
    calculateCourseDuration,
    calculateChapterTime,
    currency,
    backendUrl,userData,getToken
  } = useContext(AppContext);

  const fetchCourseData = async () => {
    try{
      const {data}=await axios.get(backendUrl+'/api/course/'+id)
      if(data.success){
        setCourseData(data.courseData)
      }
      else{
        toast.error(data.message)
      }
      

    }
    catch(error){
      toast.error(error.message)
    }
  };

  const enrollCourse=async()=>{
    try{
      if(!userData){
        return toast.warn('Login to Enroll')
      }
      if(isAlreadyEnrolled){
        return toast.warn('Already Enrolled')
      }
      const token=await getToken();

      const {data}=await axios.post(backendUrl+'/api/user/purchase',{courseId:courseData._id},{headers:{Authorization:`Bearer ${token}`}})

      if(data.success){
        const {session_url}=data
        window.location.replace(session_url)
      }
      else{
        toast.error(data.message)
      }

    }
    catch(error){
      toast.error(error.message)

    }
  }
  
  useEffect(() => {
    if(userData && courseData){
      setIsAlreadyEnrolled(userData.enrollCourses.includes(courseData._id))
    }
    
  }, [userData,courseData]);

  useEffect(() => {
    
  }, [id, allCourses]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!courseData) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Course Content */}
          <div className="lg:w-2/3">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {courseData.courseTitle}
            </h1>

            <div
              className="prose max-w-none text-gray-600 mb-6"
              dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
            />

            {/* Ratings and Enrollment */}
            <div className="flex flex-col space-y-3 mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500 font-medium">
                  {calculateRating(courseData)}
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={
                        i < Math.floor(calculateRating(courseData))
                          ? assets.star
                          : assets.star_blank
                      }
                      alt="star"
                      className="w-4 h-4"
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">
                  {courseData.courseRatings.length}{" "}
                  {courseData.courseRatings.length > 1 ? "ratings" : "rating"}
                </span>
              </div>

              <div className="flex flex-col space-y-1">
                <p className="text-gray-600 text-sm">
                  {courseData.enrolledStudents.length}{" "}
                  {courseData.enrolledStudents.length > 1
                    ? "students"
                    : "student"}{" "}
                  enrolled
                </p>
                <p className="text-gray-600 text-sm">
                  Course by{" "}
                  <span className="text-blue-600 underline">
                    {courseData.educator.name}
                  </span>
                </p>
              </div>
            </div>

            {/* Course Structure */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Course Structure
              </h2>
              <div className="space-y-4">
                {courseData.courseContent.map((chapter, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                  >
                    <div
                      className="flex justify-between items-center p-4 cursor-pointer"
                      onClick={() => toggleSection(index)}
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={assets.down_arrow_icon}
                          alt="arrow icon"
                          className={`w-5 h-5 transition-transform ${
                            openSections[index] ? "transform rotate-180" : ""
                          }`}
                        />
                        <p className="font-medium">{chapter.chapterTitle}</p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {chapter.chapterContent.length} lectures •{" "}
                        {calculateChapterTime(chapter)}
                      </p>
                    </div>

                    {openSections[index] && (
                      <div className="px-4 pb-4">
                        <ul className="space-y-3">
                          {chapter.chapterContent.map((lecture, i) => (
                            <li key={i} className="flex items-start gap-3 pl-2">
                              <img
                                src={assets.play_icon}
                                alt="play icon"
                                className="w-4 h-4 mt-1 flex-shrink-0"
                              />
                              <div className="flex-1">
                                <p className="text-gray-800">
                                  {lecture.lectureTitle}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                  {humanizeDuration(
                                    lecture.lectureDuration * 60 * 1000,
                                    { units: ["h", "m"] }
                                  )}
                                </p>
                                {lecture.isPreviewFree && (
                                  <p
                                    onClick={() =>
                                      setPlayerData({
                                        videoId: lecture.lectureUrl
                                          .split("/")
                                          .pop(),
                                      })
                                    }
                                    className="text-blue-600 text-sm mt-1"
                                  >
                                    Preview
                                  </p>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Course Description
              </h3>
              <div
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{
                  __html: courseData.courseDescription,
                }}
              />
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:w-1/3 space-y-4">
            {" "}
            {/* Added space-y-4 for vertical spacing */}
            {/* Thumbnail */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {playerData ? (
                <YouTube
                  videoId={playerData.videoId}
                  opts={{ playerVars: { autoplay: 1 } }}
                  iframeClassName="w-full aspect-vedio"
                />
              ) : (
                <img
                  src={courseData.courseThumbnail}
                  alt={courseData.courseTitle}
                  className="w-full h-auto object-cover"
                />
              )}
            </div>
            {/* Timer Section */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-2">
                <img
                  className="w-3.5 h-3.5"
                  src={assets.time_left_clock_icon}
                  alt="time left"
                />

                <p className="text-red-500 text-sm">
                  <span className="font-medium">5 days</span> left at this
                  price!
                </p>
              </div>
            </div>
            {/* Price Section */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  {currency}
                  {(
                    courseData.coursePrice -
                    (courseData.discount * courseData.coursePrice) / 100
                  ).toFixed(2)}
                </span>
                {courseData.discount > 0 && (
                  <span className="text-sm text-gray-500 line-through">
                    {currency}
                    {courseData.coursePrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex flex-row space-x-6">
                {/* Ratings */}
                <div className="flex items-center space-x-2">
                  <img
                    src={assets.star}
                    alt="star icon"
                    className="w-5 h-5 text-yellow-400"
                  />
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">
                        {calculateRating(courseData)}
                      </span>{" "}
                      Rating
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-6 w-px bg-gray-300"></div>

                {/* Duration */}
                <div className="flex items-center space-x-2">
                  <img
                    src={assets.time_clock_icon}
                    alt="clock icon"
                    className="w-5 h-5 text-blue-500"
                  />
                  <p className="text-sm text-gray-700">
                    {calculateCourseDuration(courseData)}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-6 w-px bg-gray-300"></div>

                {/* Lessons */}
                <div className="flex items-center space-x-2">
                  <img
                    src={assets.lesson_icon}
                    alt="book icon"
                    className="w-5 h-5 text-green-500"
                  />
                  <p className="text-sm text-gray-700">
                    {calculateNoOfLectures(courseData)} Lessons
                  </p>
                </div>
              </div>
              <button onClick={enrollCourse} className="md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium">
                {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
              </button>

              <div className="pt-6">
                <p className="md:text-xl text-lg font-medium text-grey-800">
                  What's in the course?
                </p>
                <ul className="ml-4 pt-2 text-sm md:text-default list-disc text-gray-500">
                  <li>Lifetime access with free updates</li>
                  <li>step-by-step, hands-on project guidance</li>
                  <li>Downdable resources and source code</li>
                  <li>Certificate of completion</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseDetails;
