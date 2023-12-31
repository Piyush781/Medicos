import React,{useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../Features/alertslice';
import axios from 'axios';
import { setUser } from '../Features/userslice';
export default function Protectedroute({children}) {
   const dispatch=useDispatch();
   const {user}=useSelector(state=>state.user)

   const getUser=async()=>{
    try {
      dispatch(showLoading())
      const res=await axios.post("http://localhost:9002/getUserData",
      {token:localStorage.getItem('token')},
      {
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      }
      )
      dispatch(hideLoading())
      if(res.data.success )
      {
        dispatch(setUser(res.data.data));
      }else{
        <Navigate to="/login"/>
        localStorage.clear();
      }
    } catch (error) {
      dispatch(hideLoading())
      localStorage.clear();
      console.log(error);
    }
   };
   useEffect(() => {
    if(!user)
    {
      getUser();
    }
   }, [user,getUser])
   
  if(localStorage.getItem("token"))
  {
    return children;
  }else{
    return <Navigate to="/login"/>;
  }
}
