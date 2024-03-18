  import React, { useState, useEffect } from "react";
  import { Banner } from "./Banner";
  import Footer from "./Footer";
  import BannerSections from "./BannerSections";
  import AnimatedNav from '../components/Admin/Navbar'
  import '../styles/Welcome.css'
  
  const Welcome = () => {




    return (
      <div >
            <AnimatedNav/>
              <Banner/>
              <BannerSections/>
              <Footer/>

                </div>
      

    );
  };

  export default Welcome;
