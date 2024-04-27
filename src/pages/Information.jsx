import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { Outlet } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import { resumeDetails } from '../utils/helpers'

const Information = () => {
  const navigate = useNavigate();
  const {templateId,resumeId,resumeName,detail:details} = useParams();

  return (
    <main className='relative grid grid-cols-12 w-full h-screen'>
      <motion.aside
      key={details}
      className='self-start hidden md:col-span-2 md:flex flex-col gap-2 sticky top-[10vh] left-0 shadow-md'>
       { resumeDetails.map((detail,index)=>{
        return <motion.button 
        transition={{type:'spring',duration:0.5}}
        whileHover={{backgroundColor:'#c4b5fd' , scale:1.1}}
        key={details} 
        onClick = {()=>{
          navigate(`/templates/${templateId}/${resumeId}/${resumeName}/build/${detail.path}`)
        }}
        className={`w-full px-4 py-4 rounded-r-md ${details === detail.path ? 'bg-violet-300' : null}`}>{detail.info}</motion.button>
       })}
       <motion.button
       onClick={()=>navigate(`/${templateId}/${resumeId}/preview`)}
       whileHover={{scale:1.05}}
       transition={{stiffness:800,type:'spring'}}
       className='px-5 py-4 bg-violet-500 text-white rounded-md hover:bg-violet-600'>Generate Resume</motion.button>
      </motion.aside>

      {/* rendering forms here   */}
      <Outlet/>
    </main>
  )
}

export default Information