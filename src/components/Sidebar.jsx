import React from 'react'
import { NavLink } from 'react-router-dom'
import { resumeDetails } from '../utils/helpers'
import { motion } from 'framer-motion'
function Sidebar({templateId,resumeId,resumeName,onClose}) {
  return (
    <motion.aside 
    initial={{x:-30,opacity:0}}
    animate={{x:0,opacity:1}}
    exit={{x:-30,opacity:0}}
    className='lg:hidden fixed top-[8vh] left-0 h-full w-1/2 gap-5 flex flex-col py-5 items-center text-center bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-10'>
        <button onClick = {onClose} className='h-10 w-10 rounded-full bg-gray-200'>x</button>
        <div>
            {resumeDetails.map((detail, index) => {
            return (
                <button
                className='w-full'
                key={index}
                >
                <NavLink
                    to={`/templates/${templateId}/${resumeId}/${resumeName}/build/${detail.path}`}
                    onClick={onClose}
                    className={({isActive})=>{
                    return isActive ? "w-full h-full flex items-center justify-center px-4 py-4 bg-violet-400 text-white"
                    : "w-full h-full flex items-center justify-center px-4 py-4"
                    }}
                >
                    {detail.info}
                </NavLink>
                </button>
            );
            })}

        </div>
    </motion.aside>
  )
}

export default Sidebar