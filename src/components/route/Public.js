import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Public({children}) {
  if(localStorage.getItem('token'))
  {
    return <Navigate to="/Book"/>
  }else{
    return children;
  }
}
