import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
function ExpandedNavbar({onClose}) {
  return (
    <motion.div
    initial={{y:-30,opacity:0}}
    animate={{y:0,opacity:1}}
    exit={{y:-30,opacity:0}}
    className="flex flex-col justify-center gap-10 items-center text-white bg-black backdrop-blur-md bg-opacity-50 fixed top-[8vh] lg:top-[10vh] w-full h-[30%] z-10 left-0">
      <NavLink onClick = {onClose} to='/'>Home</NavLink>
      <NavLink onClick = {onClose} to='/templates'>Build Resume</NavLink>
      <NavLink onClick = {onClose} to='/myResumeCollection'>My resume</NavLink>
    </motion.div>
  );
}

export default ExpandedNavbar;
