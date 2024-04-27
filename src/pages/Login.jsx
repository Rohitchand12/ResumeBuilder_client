import React,{useEffect , useRef} from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import AuthenticationButtons from '../components/AuthenticationButtons';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import useUser from "../hooks/useUser";
import {useNavigate,useLocation} from "react-router-dom"
import MainSpinner from '../components/MainSpinner';
const Login = () => {
  const notify = () => toast.success("Wow so easy!");
  const {data,isLoading,error} = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    if(!isLoading && data)
    {
      navigate(location?.state?.prevPath || '/');
    }
  },[data,isLoading,location])

  if(isLoading)
  {
    return <MainSpinner/>
  }

  return (
    <div className='min-h-[90vh] w-screen flex flex-col justify-center items-center'>
      <div className='p-3 w-3/4 md:w-1/3 flex gap-5 flex-col justify-center items-center'>
        <div className='w-full text-center p-3'>
          <h1 className='font-bold text-xl lg:text-2xl text-violet-500'>Welcome to Resume Builder</h1>
        </div>
        <div className='w-full flex flex-col gap-5 items-center '>
          <AuthenticationButtons text="Sign in with Google" Icon = {FcGoogle} provider = "GoogleAuthProvider" />
          <AuthenticationButtons text="Sign in with Github" Icon = {FaGithub} provider = "GithubAuthProvider"/>
          <button onClick = { notify }>toast</button>
          <ToastContainer />
        </div>  
      </div>
    </div>
  )
}

export default Login