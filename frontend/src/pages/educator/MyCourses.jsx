import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyCourses = () => {
  const { currency, backendUrl,isEducator,getToken } = useContext(AppContext)
  const [courses, setCourses] = useState(null)

  const fetchEducatorCourses = async () => {
    try{
      const token=await getToken()
      const {data}=await axios.get(backendUrl+'/api/educator/courses',{headers:{Authorization:`Bearer ${token}`}})

      data.success && setCourses(data.courses)

    }
    catch(error){
      toast.error(error.message)

    }
    
  }

 

  useEffect(() => {
    if(isEducator){
      fetchEducatorCourses()
    }
    
  }, [isEducator]) // Added allCourses as dependency

  return courses ? (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Courses</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">All Courses</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earnings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published On</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-20 w-30">
                        <img 
                          className="h-20 w-30 rounded-md object-cover" 
                          src={course.courseThumbnail} 
                          alt={course.courseTitle}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{course.courseTitle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {currency}{Math.floor(course.enrolledStudents.length * (course.coursePrice - (course.discount * course.coursePrice / 100)))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.enrolledStudents.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : <Loading />
}

export default MyCourses