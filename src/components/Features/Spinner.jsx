import React from 'react'
import "../css/login.css"
export default function Spinner() {
  return (
    <div>
      <div className='d-flex justify-content-center spinner'>
        <div className='spinner-border' role='status'>
        <span className='visually-hidden'>Loading..</span>
        </div> 
      </div>
    </div>
  )
}
