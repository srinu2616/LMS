import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Footer from "../../components/student/Footer";
import Rating from "../../components/student/Rating";
import { toast } from "react-toastify";
import Loading from "../../components/student/Loading";
import axios from "axios";

const Player = () => {
  const { enrolledCourses, calculateChapterTime, backendUrl, getToken, userData, fetchUserEnrolledCourses } = useContext(AppContext);
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [initialRating, setInitialRating] = useState(0);
  const [rating, setRating] = useState(0);

  const getCourseData = () => {
    const course = enrolledCourses.find((course) => course._id === courseId);
    if (course) {
      setCourseData(course);
      course.courseRatings.forEach((item) => {
        if (item.userId === userData._id) {
          setInitialRating(item.rating);
          setRating(item.rating);
        }
      });
    }
  };

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const markLectureAsCompleted = async (lectureId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/user/update-course-progress`,
        { courseId, lectureId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        getCourseProgress();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCourseProgress = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/user/get-course-progress`,
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setProgressData(data.progressData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRate = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/user/add-rating`,
        { courseId, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchUserEnrolledCourses();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseData();
    }
  }, [courseId, enrolledCourses]);

  useEffect(() => {
    getCourseProgress();
  }, []);

  return courseData ? (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Course Structure */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Course Structure
              </h2>
              <div className="space-y-4">
                {courseData?.courseContent?.map((chapter, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg shadow-sm overflow-hidden border border-gray-200"
                  >
                    <div
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100 transition-colors"
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
                        <p className="font-medium text-gray-800">
                          {chapter.chapterTitle}
                        </p>
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
                            <li
                              key={i}
                              className="flex items-start gap-3 pl-2 py-2 hover:bg-gray-100 rounded px-2 transition-colors"
                            >
                              <img
                                src={
                                  playerData?.lectureTitle ===
                                  lecture.lectureTitle
                                    ? assets.blue_tick_icon
                                    : assets.play_icon
                                }
                                alt="play icon"
                                className="w-4 h-4 mt-1 flex-shrink-0"
                              />
                              <div className="flex-1">
                                <p className="text-gray-800 font-medium">
                                  {lecture.lectureTitle}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                  {humanizeDuration(
                                    lecture.lectureDuration * 60 * 1000,
                                    { units: ["h", "m"] }
                                  )}
                                </p>
                                {lecture.lectureUrl && (
                                  <button
                                    onClick={() =>
                                      setPlayerData({
                                        ...lecture,
                                        chapter: index + 1,
                                        lecture: i + 1,
                                      })
                                    }
                                    className="text-blue-600 hover:text-blue-800 text-sm mt-1 font-medium"
                                  >
                                    Watch
                                  </button>
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
            <div className="flex items-center gap-2 py-3 mt-10">
              <h1 className="text-xl font-bold">Rate this Course:</h1>
              <Rating 
                initialRating={initialRating} 
                onRate={(rating) => {
                  setRating(rating);
                  handleRate();
                }}
              />
            </div>
          </div>

          {/* Right column - Video Player */}
          <div className="w-full">
            {playerData ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <YouTube
                    videoId={playerData.lectureUrl.split('/').pop()}
                    opts={{ playerVars: { autoplay: 1 } }}
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4 flex justify-between items-center">
                  <p className="font-medium">
                    {playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}
                  </p>
                  <button 
                    onClick={() => markLectureAsCompleted(playerData._id || playerData.lectureId)} 
                    className={`px-3 py-1 rounded text-sm ${
                      progressData && progressData.lectureCompleted.includes(playerData._id || playerData.lectureId) 
                        ? 'bg-gray-200 text-gray-700' 
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                  >
                    {progressData && progressData.lectureCompleted.includes(playerData._id || playerData.lectureId) 
                      ? 'Completed' 
                      : 'Mark Complete'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                {courseData?.courseThumbnail ? (
                  <img 
                    src={courseData.courseThumbnail} 
                    alt="Course thumbnail" 
                    className="w-150 h-80 object-cover rounded-lg shadow-sm"
                  />
                ) : (
                  <div className="w-64 h-36 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Select a lecture to begin</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : <Loading />;
};

export default Player;