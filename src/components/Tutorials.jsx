import React, { useState } from "react";
import { FaWpforms } from "react-icons/fa";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { FaFilePdf } from "react-icons/fa";
import fill from "../assets/form.jpg";
import generate from "../assets/resumeimg.jpg";
import pdfimg from "../assets/pdfimg.jpg";
import { NavLink } from "react-router-dom";
import {motion} from 'framer-motion'
const images = {
  fill,
  generate,
  pdfimg,
};

const Tutorials = () => {
  const [image, setImage] = useState("fill");
  const handleClick = (e) => {
    setImage(e.target.id);
  };
  return (
    <motion.section 
    className="lg:h-screen flex flex-col md:gap-10 justify-center items-center py-10">
      <motion.div 
      initial={{opacity:0,scale:0.8}}
      whileInView={{opacity:1,scale:1}}
      transition={{duration:1,type:'spring'}}
      className=" md:w-[60%] lg:w-[40%] text-center mb-5">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-normal">
          Build a perfect resume for your dream job
        </h1>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-5 md:h-1/2 lg:h-full p-1 lg:p-0 lg:w-3/4 place-items-center">
        <div className="flex flex-col gap-8 justify-center w-full h-full">
          <button
            onClick={handleClick}
            id="fill"
            className="flex items-center lg:justify-normal justify-center gap-3 md:gap-5 text-gray-700  md:text-2xl font-bold hover:bg-gray-200 rounded-md py-2 px-4 focus:bg-gray-200"
          >
            <FaWpforms />
            Fill up the information
          </button>
          <button
            onClick={handleClick}
            id="generate"
            className=" flex items-center justify-center lg:justify-normal gap-3 md:gap-5 text-gray-700  md:text-2xl font-bold hover:bg-gray-200 rounded-md py-2 px-4 focus:bg-gray-200"
          >
            <HiOutlineNewspaper />
            Generate Resume
          </button>
          <button
            onClick={handleClick}
            id="pdfimg"
            className=" flex items-center justify-center lg:justify-normal gap-3 md:gap-5 text-gray-700   md:text-2xl font-bold hover:bg-gray-200 rounded-md py-2 px-4 focus:bg-gray-200"
          >
            <FaFilePdf />
            Download as PDF
          </button>
          <NavLink className="w-full h-full text-center lg:text-left" to="/templates">
            <button className="ml-2 bg-gradient-to-r from-violet-400 to-violet-600 hover:bg-gradient-to-r hover:from-violet-500 hover:to-violet-500 text-white rounded-md px-5 py-2">
              Generate resume
            </button>
          </NavLink>
        </div>
        <div className="w-3/4">
          <img src={images[image]} />
          {image === "generate" && (
            <a
              className="text-xs"
              href="https://www.freepik.com/free-vector/elegant-resume-template_4256831.htm#query=resume%20template&position=17&from_view=keyword&track=ais&uuid=89349869-8334-4cb9-a48d-1a17e4c899a3"
            >
              Image by m.salama
            </a>
          )}
          {image === "pdfimg" && (
            <a
              className="text-xs"
              href="https://www.freepik.com/free-vector/text-files-concept-illustration_11641796.htm#fromView=search&page=1&position=0&uuid=fa9fb555-53fd-40eb-932c-5f5abbfcdc6b"
            >
              Image by storyset on Freepik
            </a>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default Tutorials;
