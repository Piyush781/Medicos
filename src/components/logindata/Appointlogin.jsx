import React, {useState} from "react"
import "../css/Admin.css"
import "../css/login.css"
import Top from "../Top"
// import {Link} from "react-router-dom";
import Footer from "../Footer"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { showLoading,hideLoading } from "../Features/alertslice"
import axios from "axios";
const Login = ({setloginuser}) => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [user,setuser]=useState({
        email:"",
        password:""
        
    })

    const handlechange=e=>{
        const {name,value}=e.target;
        setuser({
            ...user ,
            [name]:value
        })
    }
    // const location = useLocation();
    // let path = null;
    // if(location.pathname === "/events")
    //     path = "/setEvent";
    // else path ="/Garbage";


    const login = () => {
      dispatch(showLoading())
        axios
          .post("http://localhost:9002/login", user)
          .then((res) => {
            dispatch(hideLoading())
            alert(res.data.message);
            setloginuser(res.data.user);
            if (res.data.message === 'Login Successful') {
              const token=res.data.token;
                localStorage.setItem('token',token);
                // Replace the following line with your logic to navigate to the next page
                navigate('/Book');
              }
            // Navigate to "/ser" if the login is successful
          })
          .catch((error) => {
            dispatch(hideLoading())
            console.error("Login error:", error);
            // Handle error condition if needed
          });
    }
    return (
        <>
        <Top/>
        <div className="backgroundimage">
        <div className="login">
            {console.log("User",user)}
            <h1>User Login</h1>
            <input type="text" name="email" value={user.email} onChange={handlechange} placeholder="Your email" aria-label="ferf" />
            <input type="password" name="password" value={user.password} onChange={handlechange} placeholder="Your password" aria-label="fvd" />
            <div className="button" onClick={login}>Login</div>
            
            <div>or</div>
            <div className="button"><a href="/Admin">Admin</a></div>
        </div>
        </div>
        <br/>
        <Footer/>
        </>
    )
}

export default Login