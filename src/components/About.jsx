import React from 'react'
import about from "../img/about.jpg"
export default function About() {
  return (
    <div>
    <div className="container-fluid py-5">
      <div className="container">
        <div className="row gx-5">
          <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: '500px' }}>
            <div className="position-relative h-100">
              <img className="position-absolute w-100 h-100 rounded" src={about} style={{ objectFit: 'cover' }} alt="About" />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="mb-4">
              <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">About Us</h5>
              <h1 className="display-4">Best Medical Care For Yourself and Your Family</h1>
            </div>
            <p>Health care is changing with a new emphasis on patient-centeredness. Fundamental to this transformation is the increasing recognition of patients' role in health care delivery and design. Medical appointment scheduling, as the starting point of most non-urgent health care services, is undergoing major developments to support active involvement of patients. By using the Internet as a medium, patients are given more freedom in decision making about their preferences for the appointments and have improved access.</p>
            <div className="row g-3 pt-3">
              <div className="col-sm-3 col-6">
                <div className="bg-light text-center rounded-circle py-4">
                  <i className="fa fa-3x fa-user-md text-primary mb-3"></i>
                  <h6 className="mb-0">Qualified<small className="d-block text-primary">Doctors</small></h6>
                </div>
              </div>
              <div className="col-sm-3 col-6">
                <div className="bg-light text-center rounded-circle py-4">
                  <i className="fa fa-3x fa-procedures text-primary mb-3"></i>
                  <h6 className="mb-0">Emergency<small className="d-block text-primary">Services</small></h6>
                </div>
              </div>
              <div className="col-sm-3 col-6">
                <div className="bg-light text-center rounded-circle py-4">
                  <i className="fa fa-3x fa-microscope text-primary mb-3"></i>
                  <h6 className="mb-0">Accurate<small className="d-block text-primary">Testing</small></h6>
                </div>
              </div>
              <div className="col-sm-3 col-6">
                <div className="bg-light text-center rounded-circle py-4">
                  <i className="fa fa-3x fa-ambulance text-primary mb-3"></i>
                  <h6 className="mb-0">Free<small className="d-block text-primary">Ambulance</small></h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  
</div>
  )
}
