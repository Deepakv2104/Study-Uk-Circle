import React from 'react'
import { Banner } from './Banner'

import { Gallary } from './Gallary';
import Footer from './Footer';
import { Contact } from './Contact';
import AnimatedNav from './Admin/Navbar';
import BannerSections from './BannerSections';
import Layers from '../components/Testing';
// import HomePage from './Testing';
const Welcome = () => {
  return (
    <div>
   <AnimatedNav/>
        <Banner/> 
         <BannerSections />
         {/* <Layers/> */}
      <Gallary />
      <Contact />
      <Footer />
 {/* <HomePage/> */}
      
    </div>
  )
}

export default Welcome