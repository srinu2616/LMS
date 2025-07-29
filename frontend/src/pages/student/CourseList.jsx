import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import SearchBar from "../../components/student/SearchBar";
import { useParams, useNavigate } from "react-router-dom";
import CourseCard from "../../components/student/CourseCard";
import { assets } from "../../assets/assets";
import Footer from "../../components/student/Footer";

const CourseList = () => {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();
  const navigation = useNavigate();
  const [filteredCourse, setfilteredCourse] = useState([]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();

      input
        ? setfilteredCourse(
            tempCourses.filter((item) =>
              item.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setfilteredCourse(tempCourses);
    }
  }, [allCourses, input]);

  return (
    <>
    <div className="container mx-auto px-4 py-8">
      {/* Header with breadcrumb and search bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        {/* Breadcrumb and title */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Course List</h1>
          <p className="text-gray-500">
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigation("/")}
            >
              Home
            </span>
            <span> / </span>
            <span className="text-gray-600">Course List</span>
          </p>
        </div>

        {/* Search bar positioned top right */}
        <div className="w-full md:w-auto">
          <SearchBar data={input} />
        </div>
      </div>

      {/* Course list content will go here */}
      <div className="mt-8">
        {/* Your course cards/grid will be placed here */}
      </div>
      {input && (
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 mb-4 w-fit">
          <p className="text-gray-700 font-medium">{input}</p>
          <img
            src={assets.cross_icon}
            alt="Clear search"
            className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
            onClick={() => navigate("/course-list")}
          />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourse.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default CourseList;
