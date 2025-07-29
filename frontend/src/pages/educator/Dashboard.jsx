import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets, dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/student/Loading";

const Dashboard = () => {
  const { currency } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return dashboardData ? (
    <div className="p-6">
      <div className="flex flex-wrap gap-6">
        {/* Total Enrollments Card */}
        <div
          className="flex-1 min-w-[250px] bg-white rounded-lg p-6 flex items-center gap-4 
                       border-2 border-transparent hover:border-blue-500 transition-all duration-300"
        >
          <div className="p-4 bg-blue-50 rounded-full">
            <img
              src={assets.patients_icon}
              alt="enrollments"
              className="w-8 h-8"
            />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">
              {dashboardData.totalCourses}
            </p>
            <p className="text-gray-500">Total Enrollments</p>
          </div>
        </div>

        {/* Total Courses Card */}
        <div
          className="flex-1 min-w-[250px] bg-white rounded-lg p-6 flex items-center gap-4 
                       border-2 border-transparent hover:border-green-500 transition-all duration-300"
        >
          <div className="p-4 bg-green-50 rounded-full">
            <img
              src={assets.appointments_icon}
              alt="courses"
              className="w-8 h-8"
            />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">
              {dashboardData.enrolledStudentsData.length}
            </p>
            <p className="text-gray-500">Total Courses</p>
          </div>
        </div>

        {/* Total Earnings Card */}
        <div
          className="flex-1 min-w-[250px] bg-white rounded-lg p-6 flex items-center gap-4 
                       border-2 border-transparent hover:border-purple-500 transition-all duration-300"
        >
          <div className="p-4 bg-purple-50 rounded-full">
            <img src={assets.earning_icon} alt="earnings" className="w-8 h-8" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">
              {currency}
              {dashboardData.totalEarnings}
            </p>
            <p className="text-gray-500">Total Earnings</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Latest Enrollments
          </h2>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Student Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Course Title
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={item.student.imageUrl}
                          alt="profile"
                          className="h-10 w-10 rounded-full object-cover mr-3"
                        />
                        <span className="text-sm text-gray-900">
                          {item.student.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.courseTitle}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;
