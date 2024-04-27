import React, {useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import icon from "../../assets/resume_icon.png";
import Footer from "../../components/Footer";
import useUser from "../../hooks/useUser";
import { PuffLoader } from "react-spinners";
import { FaSignOutAlt } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { LuLayoutTemplate } from "react-icons/lu";
import { auth } from "../../firebase/firebaseConfig";
import { useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

import { adminsId } from "../../utils/helpers";

const RootNavigation = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const { data, isLoading } = useUser();
  const queryClient = useQueryClient();

  const handleDropDown = () => {
    setShowDropDown((prev) => !prev);
  };
  const handleSignout = async () => {
    await auth.signOut().then(() => {
      toast.error('Signed out',{containerId:'signed-out',autoClose:1000})
      queryClient.setQueryData(["users"], null);
      queryClient.setQueryData(["users","resumes"] , null);
    });
  };
  return (
    <div className="font-mooli overflow-clip relative">
      <nav className="flex h-[10vh] justify-center items-center px-5 py-3 lg:px-8 lg:py-3 bg-white bg-opacity-35 backdrop-blur-sm sticky top-0 left-0 z-10 ">
        <div className="flex justify-between w-full md:w-3/4">
          <NavLink to="/">
            <button className="flex justify-center items-center gap-3 text-base lg:text-2xl font-bold text-violet-600">
              <img
                className="h-[30px] w-[30px] md:h-[40px] md:w-[40px]"
                src={icon}
              />
              Resume builder
            </button>
          </NavLink>
          <div className="flex justify-center items-center">
            <ul className="flex gap-8 text-sm font-semibold items-center">
              <li className="hover:text-gray-500 hidden md:block">
                <NavLink
                  className={({ isActive }) => {
                    return isActive ? "pb-2 border-b-4 border-violet-600" : null;
                  }}
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="hover:text-gray-500 hidden md:block">
                <NavLink
                  className={({ isActive }) => {
                    return isActive ? " pb-2 border-b-4 border-violet-600" : null;
                  }}
                  to="/templates"
                >
                  Build resume
                </NavLink>
              </li>
              <li className="hover:text-gray-500 hidden md:block">
                <NavLink
                  className={({ isActive }) => {
                    return isActive ? " pb-2 border-b-4 border-violet-600" : null;
                  }}
                  to="/myResumeCollection"
                >
                  My resumes
                </NavLink>
              </li>
              <li>
                {isLoading && (
                  <div>
                    <PuffLoader size={50} color="#7c3aed" />
                  </div>
                )}
                {!isLoading && data ? (
                  <div
                    onClick={handleDropDown}
                    className="h-12 w-12 relative z-10 cursor-pointer"
                  >
                    {data.photoURL ? (
                      <img className="rounded-full" src={data.photoURL} />
                    ) : (
                      <p className="bg-violet-500 text-white text-xl font-bold h-12 w-12 rounded-full flex justify-center items-center">
                        {data.email?.charAt(0).toUpperCase()}
                      </p>
                    )}
                    <AnimatePresence>
                      {showDropDown && (
                        <motion.div
                          initial={{opcaity:0,y:-50}}
                          animate={{ opacity:1,y:0 }}
                          exit={{opacity:0,y:-50}}
                          className="absolute w-80 right-0 py-10 gap-5 top-[120%] bg-white rounded-md"
                        >
                          <div className="h-full w-full flex justify-center items-center flex-col gap-8">
                            {data.photoURL ? (
                              <img
                                className="w-28 h-28 rounded-full"
                                src={data.photoURL}
                              />
                            ) : (
                              <p className="bg-violet-500 text-white text-xl font-bold h-12 w-12 rounded-full flex justify-center items-center">
                                {data.email?.charAt(0).toUpperCase()}
                              </p>
                            )}
                            <h1 className="text-xl font-bold ">
                              {`${
                                data.displayName ? data.displayName : data.email
                              }`}
                            </h1>
                            <div className="flex flex-col h-full w-full p-2 ">
                              <button className="px-5 py-3 flex gap-2 justify-between items-center text-left text-gray-500 hover:text-black border-b-2 border-gray-400">
                                My Account{" "}
                                <MdAccountCircle className="text-xl text-violet-700" />
                              </button>
                              {adminsId.includes(data.uid) && (
                                <button className="px-5 py-3 flex gap-2 justify-between items-center text-left text-gray-500 hover:text-black border-b-2 border-gray-400">
                                  Add a template{" "}
                                  <LuLayoutTemplate className="text-xl text-green-500" />{" "}
                                </button>
                              )}
                              <button
                                onClick={handleSignout}
                                className="px-5 py-3 flex gap-2 justify-between items-center text-gray-500 hover:text-black border-b-2 border-gray-400"
                              >
                                Signout{" "}
                                <FaSignOutAlt className="text-xl text-red-500" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  !isLoading && (
                    <NavLink to="/login">
                      <button className="bg-gradient-to-r from-violet-400 to-violet-600 hover:bg-gradient-to-r hover:from-violet-500 hover:to-violet-500 text-white text-sm md:text-base rounded-md md:px-5 md:py-2 py-2 px-3">
                        Login/Signup
                      </button>
                    </NavLink>
                  )
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <ToastContainer containerId='signed-out' autoClose={2000} />

      <Outlet />
      <Footer />
    </div>
  );
};

export default RootNavigation;
