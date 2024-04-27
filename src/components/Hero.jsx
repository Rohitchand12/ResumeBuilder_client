import React from "react";
import heroImg from "../assets/workspace.png";
import { NavLink } from "react-router-dom";
import {motion , useScroll , useTransform} from 'framer-motion'
const Hero = () => {
  const {scrollY} = useScroll();
  const contentY = useTransform(scrollY,[0,200,500],[0,50,80]);
  const contentScale = useTransform(scrollY,[0,200,500],[1,1.1,1.3]);
  const contentOpacity = useTransform(scrollY,[0,200,500],[1,0.5,0]);
  const imageScale=useTransform(scrollY,[0,200,500],[1,1.1,1.3]);
  const imageOpacity=useTransform(scrollY,[0,200,500],[1,0.5,0]);
  return (
    <section className="bg-violet-400 flex justify-center items-center p-5 md:p-8">
      <div className=" w-full md:w-3/4 grid md:grid-cols-2 gap-5 place-items-center">
        <div className="hidden md:block">
          <motion.img
          style={{opacity:imageOpacity,scale:imageScale}}
          initial={{opacity:0,y:50}}
          animate={{opacity:1,y:0}}
          transition={{duration:2, type:'spring'}}
          className="h-full w-full" src={heroImg}></motion.img>
        </div>
        <div className="h-full w-full flex flex-col justify-center items-center">
          <motion.div
          style={{y:contentY,scale:contentScale,opacity:contentOpacity}}
          initial={{opacity:0,y:-50}}
          animate={{opacity:1,y:0}}
          transition={{duration:2, type:'spring'}}
          className="flex flex-col gap-5">
            <h1 className="text-3xl lg:text-5xl font-bold text-white">
              Easy to build your resume now
            </h1>
            <p className="text-white">Create a professional resume for free</p>
            <NavLink to="/templates">
              <button className="bg-white hover:bg-gray-500 text-sm hover:text-white px-5 py-2 rounded-md">
                Build resume
              </button>
            </NavLink>
          </motion.div>
        </div>
        <div className="md:hidden">
          <img className="h-full w-full" src={heroImg}></img>
        </div>
      </div>
    </section>
  );
};

export default Hero;
