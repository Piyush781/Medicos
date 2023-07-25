import React from 'react'
import Top from './Top'
import '../index.css'
import Content from './Content'
import About from './About'
import Service from './Service'
import Appoint from './Appoint'
import Footer from './Footer'
import Blog from './Blog'
import TeamCarousel from './TeamCarousel'
export default function Homepage() {
  return (
    <div>
      <Top/>
      <Content/>
      <About/>
      <Service/>
      <Appoint/>
      <TeamCarousel/>
      <Blog/>
      <Footer/>
    </div>
  )
}
