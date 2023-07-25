import React from 'react'
import {Link} from 'react-router-dom'
export default function Service() {
  return (
    <div>
     <div className="container-fluid py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: '500px' }}>
          <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">Services</h5>
          <h1 className="display-4">Excellent Medical Services</h1>
        </div>
        <div className="row g-5">
          <div className="col-lg-4 col-md-6">
            <Link to='/registration' style={{color:'#000',textDecoration:'none'}}>
            <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
              <div className="service-icon mb-4">
                <i className="fa fa-2x fa-user-md text-white"></i>
              </div>
              <h4 className="mb-3">Emergency Care</h4>
              <p className="m-0">If you're not paying for it through the health plan, you pay for it in the emergency room.</p>
              <a className="btn btn-lg btn-primary rounded-pill" href="/">
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
            </Link>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
              <div className="service-icon mb-4">
                <i className="fa fa-2x fa-procedures text-white"></i>
              </div>
              <h4 className="mb-3">Operation &amp; Surgery</h4>
              <p className="m-0">Surgeons see people at their worst and their best.</p>
              <a className="btn btn-lg btn-primary rounded-pill" href="/">
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
              <div className="service-icon mb-4">
                <i className="fa fa-2x fa-pills text-white"></i>
              </div>
              <h4 className="mb-3">Medicine &amp; Pharmacy</h4>
              <p className="m-0">Medicine is not a science; it is empiricism founded on a network of blunders.</p>
              <a className="btn btn-lg btn-primary rounded-pill" href="/">
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
              <div className="service-icon mb-4">
                <i className="fa fa-2x fa-microscope text-white"></i>
              </div>
              <h4 className="mb-3">Blood Testing</h4>
              <p className="m-0">The only way to know if you're healthy is to get a blood test.</p>
              <a className="btn btn-lg btn-primary rounded-pill" href="/">
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
