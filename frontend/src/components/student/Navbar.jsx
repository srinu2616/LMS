import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const {navigate,isEducator,backendUrl,setIsEducator,getToken}=useContext(AppContext)

  const location = useLocation();
  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();

  const becomeEducator=async()=>{
    try{
      if(isEducator){
        navigate('/educator')
        return;
      }
      const token=await getToken()
      const {data}= await axios.get(backendUrl+'/api/educator/update-role',{headers:{Authorization:`Bearer ${token}`}})

      if (data.success){
        setIsEducator(true)
        toast.success(data.message)
      }
      else{
        toast.error(data.message)
      }

    }catch(error){
      toast.error(error.message)
    }
  }

  return (
    <div
      className={`${
        isCourseListPage
          ? "bg-white"
          : "bg-gradient-to-r from-cyan-100 to-blue-100"
      } shadow-md py-4 px-6 lg:px-8 flex justify-between items-center sticky top-0 z-50`}
    >
      <img
        onClick={()=>navigate('/')}
        src={assets.logo}
        alt="Logo"
        className="w-28 lg:w-32 cursor-pointer hover:scale-105 transition-transform duration-200"
      />

      <div className="hidden md:flex items-center gap-5 text-gray-600 font-medium">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button  onClick={becomeEducator} className="hover:text-blue-600 transition-colors duration-200">
                {isEducator?'Educator Dashboard':'Become Educator'}
              </button>
              <span className="text-gray-300">|</span>
              <Link
                to="/my-enrollments"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                My Enrollments
              </Link>
            </>
          )}
        </div>

        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className={`${
              isCourseListPage
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-cyan-600 hover:bg-cyan-700"
            } text-white px-4 py-2 rounded-md transition-colors duration-200`}
          >
            Create Account
          </button>
        )}
      </div>
      {/*for mobile screens*/}
      <div className="md:hidden flex items-center gap-2 text-grey-500">
        <div className='flex items-center gap-1 sm:gap-2 max-sm:stext-xs'>
          {user && (
            <>
              <button onClick={becomeEducator}>{isEducator?'Educator Dashboard':'Become Educator'}</button>
              <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        { user ? <UserButton/>:
        <button  onClick={() => openSignIn()}>
          <img src={assets.user_icon} alt="" />
        </button>
        }
      </div>
    </div>
  );
};

export default Navbar;
