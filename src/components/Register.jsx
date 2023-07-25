import React, { useState } from "react"
import "../components/css/register.css"
import axios from "axios"
import Top from "./Top"
import Footer from "./Footer"
import { useDispatch } from "react-redux"
import { showLoading,hideLoading } from "./Features/alertslice"
import { Navigate } from "react-router-dom"
const Register = () => {
    const dispatch=useDispatch();
    const [user,setuser]=useState({
        name:"",
        email:"",
        password:"",
        confirmpassword:""
    })

    const handlechange=e=>{
        const {name,value}=e.target;
        setuser({
            ...user,
            [name]:value
        })
    }


    const register = () => {
        const { name, email, password, confirmpassword } = user;
        if (name && email && password && password === confirmpassword) {
          // Show loading indicator before the API call
          dispatch(showLoading());
    
          axios
            .post("http://localhost:9002/register", user)
            .then((res) => {
              // Hide loading indicator after the API call is successful
              dispatch(hideLoading());
              alert("User registered Successfully");
              console.log(res);
              if(res.data.message==="User registered Successfully")
              {
                <Navigate to="/login"/>
              }
            })
            .catch((error) => {
              // Hide loading indicator after the API call fails
              dispatch(hideLoading());
              console.log(error);
            });
        } else {
          alert("Invalid Input");
        }
      };
    return (
        <>
        <div>
        <Top/>
        <div className="back">
        <div className="register1">
            {console.log("User",user)}      
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} onChange={handlechange} placeholder="Your name"  aria-label="vd"/>
            <input type="text" name="email" value={user.email} onChange={handlechange} placeholder="Your email" aria-label="vdf"/>
            <input type="password" name="password" value={user.password} onChange={handlechange} placeholder="Your password" aria-label="vdf" />
            <input type="password" name="confirmpassword" value={user.confirmpassword} onChange={handlechange} placeholder="Confirm your password" aria-label="vdf"/>
            <div className="button" onClick={register}>Register</div>
            <div>or</div>
            {/* <Link to="/login"> */}
            <div className="button"><a href='/login'>login</a> </div>
            {/* </Link> */}
        </div>
        </div>
        <Footer/>
        </div>
        </>
    )
}

export default Register