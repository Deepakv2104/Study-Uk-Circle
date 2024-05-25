import React from 'react'
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import insight from '../assets/img/insight.png'
import events from '../assets/img/events.png'
import './NewHome.css'
import enhance from '../assets/img/enhance.png'
import LottieAnimation from "./LottieAnimation";
import animationData from "../assets/lotties/study.json";
import mentorship2 from "../assets/img/mentorship2.png";
import university from '../assets/img/university.png'
import amp from '../assets/img/amp.png'
import job from '../assets/img/job.png';
import accomadation from '../assets/img/accomadation .png';
import Footer from './Footer';
import NewNav from './NewNav';
const NewHome = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    // const [sidebarOpen, setSidebarOpen] = useState(false);

 
const handleJoinClick =()=>{
    navigate('/join-waiting-list')
}
const handleBrandFormClick =()=>{
    navigate('/write-to-us')
}
  return (
    <div className='home-page'>
       <NewNav/>
        
    <section>
    <div className="w-layout-blockcontainer container w-container" style={{marginTop:'20px'}}>
        <div className="bento m" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div className="limit-large">
            {/* <h3 className="heading">Welcome to <span className="text-color-green">WorldLynk </span></h3> */}

              <h3 className="heading">Are you studying in UK ? Looking for <span className="text-color-green">Mentorship, </span><span className="text-color-green">Accommodations</span> and <span className="text-color-green"><br/>Jobs ?</span></h3>
             
            </div>
            <div className="spread-vertical large">
              <div className="limit-medium">
                <p className="large-text">WorldLynk is your one-stop solution for seamless student experience in UK.</p>
                <div className="button-stack">
                  <div className="button-wrap">
                    <div className="green-button-wrap">
                      <div  className="green-button with-icon w-inline-block" onClick={handleJoinClick}>
                       
                        Join Now
                      </div>
                    </div>
                  </div>
                  <div className="glass-button-wrap">
                    <div onClick={handleJoinClick} className="glass-button w-button">Sign in</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <LottieAnimation
              animationData={animationData}
              className="hero-image"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            {/* <img src={animationData}/> */}
          </div>
        </div>
      </div>
    </section>
    <section>
        <div class="w-layout-blockcontainer container w-container"></div>
    </section>
    <section>
    <div class="w-layout-blockcontainer container w-container">
        <div class="space-top-medium">
            <div class="bento-grid-2x">
            <div id="w-node-_7a84004a-190d-05e0-4cc8-df053c58d6df-5c67f262" class="bento">
    <div class="bento-content-vertical">
        <div style={{margin:"0 0 10px 0", display: "flex", justifyContent: "center"}}>
        <img  src={job} style={{height:'350px', width:'500px'}} alt=""/>
        </div>
        <div class="center-content center-text">
            <div>
                <h4>Job Opportunities</h4>
                <p class="no-space-bottom" style={{textAlign:"justify"}}>Your gateway to global job opportunities. Break geographical boundaries and access international opportunities. Empower your career with WorldLynk.</p>
            </div>
        </div>
    </div>
</div>
<div id="w-node-_7a84004a-190d-05e0-4cc8-df053c58d6ed-5c67f262" class="bento">
    <div class="bento-content-vertical">
    <div style={{margin:"0 0 10px 0", display: "flex", justifyContent: "center"}}>
    <img src={events} style={{height:'350px',width:'350px'}} alt=""/>
</div>

        <div class="center-content center-text">
            <div>
                <h4>Events</h4>
                <p class="no-space-bottom" style={{textAlign:"justify"}}>Discover and participate in engaging events tailored for international students. Explore academic, social, and cultural gatherings that enhance your educational journey in the UK.</p>
            </div>
        </div>
    </div>
</div>
                    <div id="w-node-_7a84004a-190d-05e0-4cc8-df053c58d6fb-5c67f262" class="bento-grid-3x">
                        <div id="w-node-_7a84004a-190d-05e0-4cc8-df053c58d6fc-5c67f262" class="bento">
                            <div class="bento-content-vertical">
                                <div><img src={university}  alt=""
                                    /></div>
                                <div class="center-content center-text">
                                    <h4>Universities</h4>
                                    <p style={{textAlign:"justify"}}>Explore top universities across the UK, detailed with program offerings, campus facilities, and admission requirements. Find your perfect academic fit and start your journey to educational excellence.</p>
                                </div>
                            </div>
                        </div>
                        <div id="w-node-_7a84004a-190d-05e0-4cc8-df053c58d705-5c67f262" class="bento">
                            <div class="bento-content-vertical">
                                <div>
                                <div><img src={accomadation} style={{height:'350px'}} alt=""
                                    /></div>
                                </div>
                                <div class="center-content center-text">
                                <h4>Accommodation</h4>
                                    <p  style={{textAlign:"justify"}}>Find your ideal stay seamlessly. Explore diverse accommodation options tailored to your preferences. Break barriers, discover international stays, and elevate your living arrangements with WorldLynk.</p>
                                </div>
                            </div>
                            {/* <img src="https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65ed8eb0c8c77c845c67f2a1_dots%20.png" loading="lazy" width="119" alt="" class="dots-pattern" /> */}
                            </div>
                        <div id="w-node-_7a84004a-190d-05e0-4cc8-df053c58d713-5c67f262"
                            class="bento">
                            <div class="bento-content-vertical">
                                <div>
                                    <div class="title-tag-wrapper">
                                    <div><img src={mentorship2}  alt=""
                                  /></div>
                                    </div>
                                </div>
                                <div class="center-content center-text">
                                    <h4>Mentorship</h4>
                                    <p style={{textAlign:"justify"}}>Connect with experienced mentors who can guide you through your academic and career challenges. Our mentorship program offers personalized advice and support to help you succeed in your educational journey and beyond.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  
    <section>
        <div class="w-layout-blockcontainer container w-container">
            <div class="space-top-medium">
                <div class="bento l green-card">
                <img src="https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65ed8eb0c8c77c845c67f284_Grid%20bg.png" loading="lazy" sizes="(max-width: 479px) 95vw, (max-width: 991px) 93vw, (max-width: 1439px) 94vw, 1278px" srcset="https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65ed8eb0c8c77c845c67f284_Grid%2520bg-p-500.png 500w, https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65ed8eb0c8c77c845c67f284_Grid%2520bg-p-800.png 800w, https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65ed8eb0c8c77c845c67f284_Grid%2520bg-p-1080.png 1080w, https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65ed8eb0c8c77c845c67f284_Grid%2520bg-p-1600.png 1600w, https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65ed8eb0c8c77c845c67f284_Grid%2520bg-p-2000.png 2000w, https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65ed8eb0c8c77c845c67f284_Grid%20bg.png 2414w"
                        alt="" class="centered-bg-grid" />
                    <div>
                        <div >
                            {/* <div class="title-tag-wrapper">
                                <div class="title-tag-contents"><img src="https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65f0415153e12c7daa9c1fba_white-bg_black-s_bright-green-hand%20(1).png" loading="lazy" width="23" sizes="(max-width: 991px) 23px, (max-width: 1439px) 2vw, (max-width: 1919px) 23px, 1vw"
                                        alt="" srcset="https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65f0415153e12c7daa9c1fba_white-bg_black-s_bright-green-hand%20(1)-p-500.png 500w, https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65f0415153e12c7daa9c1fba_white-bg_black-s_bright-green-hand%20(1)-p-800.png 800w, https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65f0415153e12c7daa9c1fba_white-bg_black-s_bright-green-hand%20(1).png 813w"
                                    />
                                    <div>Account</div>
                                </div>
                            </div> */}
                            <h2>Partner <span>With Us.</span></h2>
                            <p>Embark on a journey of mutual growth and success by aligning your brand with WorldLynk. Partnering with us offers unparalleled advantages:</p>
                        </div>
                        <div class="space-top-medium">
                            <div class="three-column-grid">
                                <div id="w-node-aad99063-6a7c-d8e1-3dce-51d0a2bf2ac3-5c67f262" class="feature-card limit-tiny">
                                    <div class="alignment-line bigger"></div>
                                    <div class="green-button-wrap smaller">
                                        <div class="green-icon-wrap smaller">
                                            <img src={amp}
                                             loading="lazy" alt="" /></div>
                                    </div>
                                    <h5 class="no-space-bottom">Amplified Reach</h5>
                                </div>
                                <div id="w-node-aad99063-6a7c-d8e1-3dce-51d0a2bf2aca-5c67f262" class="feature-card limit-tiny">
                                    <div class="alignment-line bigger"></div>
                                    <div class="green-button-wrap smaller">
                                        <div class="green-icon-wrap smaller"><img src={enhance} loading="lazy" alt="" /></div>
                                    </div>
                                    <h5 class="no-space-bottom">Enhanced Engagement</h5>
                                </div>
                                <div id="w-node-aad99063-6a7c-d8e1-3dce-51d0a2bf2ad1-5c67f262" class="feature-card limit-tiny">
                                    <div class="alignment-line bigger"></div>
                                    <div class="green-button-wrap smaller">
                                        <div class="green-icon-wrap smaller"><img src={insight} loading="lazy" alt="" /></div>
                                    </div>
                                    <h5 class="no-space-bottom">Insightful Analytics</h5>
                                </div>
                            </div>
                        </div>
                        <div class="space-top-medium">
                            <div class="button-stack">
                                <div class="button-wrap">
                                    <div class="green-button-wrap" onClick={handleBrandFormClick}><div  class="green-button with-icon w-inline-block"  >
                        <div style={{color:'black',fontWidth:'700'}}>Write to us</div>
                       
                                           </div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  
 <Footer/>

    </div>
  )
}

export default NewHome