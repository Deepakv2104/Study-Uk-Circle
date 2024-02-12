import React from 'react'
import { Banner } from './Banner'

import { Projects } from './Projects';
import { Footer } from './Footer';

import { NavBar } from './NavBar';
import PicCarousel from './PicCarousel';
const Welcome = () => {
  return (
    <div>
      <NavBar/>
        <Banner/>
        <PicCarousel />
      <Projects />
 
      <Footer />
      
    </div>
  )
}

export default Welcome