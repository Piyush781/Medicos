import React, { useState } from 'react'
import Homepage from './Homepage'
import { Routes,Route } from 'react-router-dom'
// import About from './About'
import Services from './Services'
import Register from './Register'
import Login from './Login'
import Contact from './Contact'
import Care from './Care'
import Admin from './Admin'
import Book from './Book'
import Appointlogin from "../components/logindata/Appointlogin"
import { useSelector } from 'react-redux'
import Spinner from './Features/Spinner'
import Protectedroute from './route/Protectedroute'
import Public from './route/Public'
import ApplyDoctor from './Features/ApplyDoctor'
import NotificationPage from './Pages/NotificationPage'
import Doctors from './Pages/Doctors'
import Users from './Pages/Users'
import Profile from './Pages/Profile'
import BookingPage from './Pages/BookingPage'
import Appointments from './Pages/Appointments'
import DoctorAppointment from './Pages/DoctorAppointment'
export default function App() {
  const [user,setloginuser]=useState({})
  const {loading}=useSelector(state=>state.alerts)
  return (
    <div>
      {loading ? (
          <Spinner/>
      ):(
      <Routes>
        <Route
  exact
  path="/ser"
  element={user && user._id ? <Services /> : <Login/>}
/>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/Services" element={<Services/>}/>
      <Route path="/registration" element={
        <Public>

          <Register/>
        </Public>
        
      }/>
      <Route path="/login" element={
        <Public>

          <Login setloginuser={setloginuser}/>
        </Public>
     
      
      }/>
      <Route path="/appointments" element={
        <Protectedroute>

          <Appointments/>
        </Protectedroute>
     
      
      }/>
      <Route path="/Contact" element={<Contact/>}/>
      <Route path='/Care' element={<Care/>}/>
      <Route path='/Admin' element={<Admin/>}/>
      <Route path='/Book' element={<Protectedroute>
        <Book/>
        </Protectedroute>
        }/>
      <Route path='/apply-doctor' element={<Protectedroute>
        <ApplyDoctor/>
        </Protectedroute>
        }/>
         <Route
              path="/notification"
              element={
                <Protectedroute>
                  <NotificationPage/>
                </Protectedroute>
              }
            />
         <Route
              path="/pages/Doctors"
              element={
                <Protectedroute>
                  <Doctors/>
                </Protectedroute>
              }
            />
         <Route
              path="/pages/Users"
              element={
                <Protectedroute>
                  <Users/>
                </Protectedroute>
              }
            />
         <Route
              path="/pages/profile/:id"
              element={
                <Protectedroute>
                  <Profile/>
                </Protectedroute>
              }
            />
         <Route
              path="/pages/book-appointment/:doctorId"
              element={
                <Protectedroute>
                  <BookingPage/>
                </Protectedroute>
              }
            />
         <Route
              path="/doctor-appointments"
              element={
                <Protectedroute>
                  <DoctorAppointment/>
                </Protectedroute>
              }
            />
      <Route path='/Appointlogin' element={
      <Public>

        <Appointlogin setloginuser={setloginuser}/>
      </Public>
      }/>
      </Routes>
      )}
    </div>
  )
}