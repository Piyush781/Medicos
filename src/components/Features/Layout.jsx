import React from "react";
import "../css/appoint.css";
import { usermenu,Adminmenu } from "./data";
import {message,Badge} from 'antd'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const Layout = ({ children }) => {
  const {user}=useSelector(state=>state.user)
  const location = useLocation();
  const navigate=useNavigate();
  const Handlelogout=()=>{
    localStorage.clear();
    message.success('Login Successfully');
    navigate("/login");
  }

  // Doctor List
 const Doctormenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/pages/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  // Rendering Menu List
  const SidebarMenu=user?.isAdmin
  ?Adminmenu
   :user?.isDoctor
   ?Doctormenu
   :usermenu;
  return (
    <>
     <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>DOC APP</h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item `} onClick={Handlelogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{cursor:"pointer"}}>
                <Badge count={user && user.notifcation.length} onClick={()=>{navigate('/notification')}}>
                  <i class="fa-solid fa-bell"></i>
                </Badge>

                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;