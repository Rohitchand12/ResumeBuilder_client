import React from 'react'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {motion} from 'framer-motion'
const EducationCard = ({
    education,
    index,
    onDelete,
    onEdit,
    ...props
}) => {
  return (
    <motion.div 
    {...props}
    variants={{
        hidden:{opacity:0,y:50},
        visible:{opacity:1,y:0}
    }}
    layout
    className='grid grid-cols-12 rounded-lg px-5 py-5 w-[90%] lg:w-[80%] shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
        <div className='flex flex-col col-span-7 lg:col-span-10 gap-3 '>
            <h1 className='text-2xl font-bold text-violet-600'>{education.qualification}</h1>
            <h2 className='text-base font-semibold'>{`${education.course} , ${education.branch}`}</h2>
            <p>{education.institute}</p>
        </div>
        <div className='grid grid-rows-8 col-span-5 lg:col-span-2'>
            <div className='row-span-2 text-sm grid place-items-center'>{`${education.fromyear}-${education.toyear}`}</div>
            <div className='row-span-4 text-2xl font-bold grid place-items-center'>{education.grades}</div>
            <div className='row-span-2 flex justify-center items-center gap-5'>
                <button onClick={()=>onEdit(index)} className='text-xl text-violet-500 h-10 w-10 rounded-full flex items-center justify-center bg-gray-200'><MdEdit/></button>
                <button onClick={()=>onDelete(index)} className='text-red-500 text-xl h-10 w-10 rounded-full flex items-center justify-center bg-gray-200'><MdDelete/></button>
            </div>
        </div>
    </motion.div>
  )
}

export default EducationCard