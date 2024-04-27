import React from 'react'
import {PuffLoader, PulseLoader} from "react-spinners"
const MainSpinner = ({pulse}) => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      {!pulse ? <PuffLoader color="#7c3aed" size={80}/> : <PulseLoader color="#7c3aed" size={50}/>}  
    </div>
  )
}

export default MainSpinner