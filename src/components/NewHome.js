import React from 'react'
import './NewHome.css'
import logo from "../assets/img/logo.svg";
import LottieAnimation from "./LottieAnimation";
import animationData from "../assets/lotties/study.json";
import jobs from "../assets/img/jobs.jpg";
import event from '../assets/lotties/workshops.json';
import job5 from '../assets/img/job5.jpg';
import workshop from '../assets/img/workshop.jpg';
import college from '../assets/img/college.jpg';
import stay from '../assets/img/stay.jpg';
import brand from '../assets/img/brand.png';
import eventsworldlynk from '../assets/img/eventsworldlynk.jpg';
import mentor from '../assets/img/mentor.jpg';
import NavBar from './NavBar';
import QueryForm from './QueryForm';

const NewHome = () => {
    
  return (
    <div>
       
         <div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" class="navbar w-nav">
        <div class="w-layout-blockcontainer container w-container">
           
            <div class="navbar-contents">
                <div id="w-node-_06216545-40ad-bd51-1b83-2f6c6ddd3194-6ddd3191" class="brand"><a href="/" id="w-node-_06216545-40ad-bd51-1b83-2f6c6ddd3195-6ddd3191" aria-current="page" class="brand-link w-nav-brand w--current">
                   
                    {/* <img src={logo} loading="lazy" alt="" class="heading-logo"/> */}
                    <img src={logo} loading="lazy" alt="" class="heading-logo"/>
                    </a></div>
                <nav
                    role="navigation" id="w-node-_06216545-40ad-bd51-1b83-2f6c6ddd3197-6ddd3191" class="nav-menu w-nav-menu">
                    <div class="tablet">
                        <div class="locales-wrapper-2 w-locales-list">
                            <div data-delay="200" data-hover="false" class="margin-0 w-dropdown">
                                <div class="green-button with-icon small hollow w-dropdown-toggle">
                                    <div>UK</div>
                                    <div class="icon-embed-xxsmall w-embed"></div>
                                </div>
                                <nav class="table9_dropdown-list small w-dropdown-list">
                                    <div role="list" class="w-locales-items">
                                        <div role="listitem" class="w-locales-item">
                                            <a hreflang="en-GB" href="/" aria-current="page" class="table9_dropdown-link w-inline-block w--current">
                                                <div class="text-size-small-2">UK</div>
                                            </a>
                                        </div>
                                        <div role="listitem" class="w-locales-item">
                                            <a hreflang="es-AR" href="/es-ar" class="table9_dropdown-link w-inline-block">
                                                <div class="text-size-small-2">AR</div>
                                            </a>
                                        </div>
                                        <div role="listitem" class="w-locales-item">
                                            <a hreflang="en-NZ" href="/en-nz" class="table9_dropdown-link w-inline-block">
                                                <div class="text-size-small-2">NZ</div>
                                            </a>
                                        </div>
                                        <div role="listitem" class="w-locales-item">
                                            <a hreflang="en-US" href="/en-us" class="table9_dropdown-link w-inline-block">
                                                <div class="text-size-small-2">US</div>
                                            </a>
                                        </div>
                                        <div role="listitem" class="w-locales-item">
                                            <a hreflang="en-CA" href="/en-ca" class="table9_dropdown-link w-inline-block">
                                                <div class="text-size-small-2">CA</div>
                                            </a>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div><a href="/partnerships" class="nav-link">Partner with us</a><a href="/about" class="nav-link">Learn about us</a><a href="/contact" class="nav-link">Speak with us</a>
                    <div class="nav-right-content mobile"><a href="/login" class="glass-button smaller w-button">Sign in</a><a class="green-button w-button"><QueryForm/></a></div>
                    </nav>
                    <div id="w-node-_06216545-40ad-bd51-1b83-2f6c6ddd31cb-6ddd3191" class="nav-right">
                        <div class="menu-button w-nav-button"><img src="https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65ed8eb0c8c77c845c67f274_menu%20icon%201.svg" loading="lazy" alt="" class="menu-icon" /></div>
                        <div class="nav-right-content desktop"><a href="/login" class="glass-button smaller w-button">Sign in</a><div >
                    <div className="green-button-wrap">
                      <a  className="green-button with-icon">
                        {/* <div>Join now</div> */}
                        <QueryForm/>
                      </a>
                    </div>
                  </div>
                            {/* <div class="locales-wrapper-2 w-locales-list">
                                <div data-delay="200" data-hover="false" class="margin-0 w-dropdown">
                                    <div class="green-button with-icon small hollow w-dropdown-toggle">
                                        <div>UK</div>
                                        <div class="icon-embed-xxsmall w-embed"></div>
                                    </div>
                                    <nav class="table9_dropdown-list small w-dropdown-list">
                                        <div role="list" class="w-locales-items">
                                            <div role="listitem" class="w-locales-item">
                                                <a hreflang="en-GB" href="/" aria-current="page" class="table9_dropdown-link w-inline-block w--current">
                                                    <div class="text-size-small-2">UK</div>
                                                </a>
                                            </div>
                                            <div role="listitem" class="w-locales-item">
                                                <a hreflang="es-AR" href="/es-ar" class="table9_dropdown-link w-inline-block">
                                                    <div class="text-size-small-2">AR</div>
                                                </a>
                                            </div>
                                            <div role="listitem" class="w-locales-item">
                                                <a hreflang="en-NZ" href="/en-nz" class="table9_dropdown-link w-inline-block">
                                                    <div class="text-size-small-2">NZ</div>
                                                </a>
                                            </div>
                                            <div role="listitem" class="w-locales-item">
                                                <a hreflang="en-US" href="/en-us" class="table9_dropdown-link w-inline-block">
                                                    <div class="text-size-small-2">US</div>
                                                </a>
                                            </div>
                                            <div role="listitem" class="w-locales-item">
                                                <a hreflang="en-CA" href="/en-ca" class="table9_dropdown-link w-inline-block">
                                                    <div class="text-size-small-2">CA</div>
                                                </a>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div> */}
                        </div>
                    </div>
            </div>
        </div>
    </div>
    
    <section>
    <div className="w-layout-blockcontainer container w-container">
        <div className="bento m" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div className="limit-large">
              <h2 className="heading">Are you studying in UK ? Are you looking for <span className="text-color-green">Accommodation, </span><span className="text-color-green">Jobs</span> and <span className="text-color-green">Mentorship ?</span></h2>
              {/* <div className="title-tag-wrapper">
                <div className="title-tag-contents">
                  <div>United Kingdom</div>
                </div>
              </div> */}
              {/* <a href="#" className="showreel-button w-inline-block w-lightbox">
                <div className="play-button-wrap">
                  <img src="https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65ed8eb0c8c77c845c67f287_play%20button.svg" loading="lazy" alt="" />
                </div>
                <div>Watch now</div>
              </a> */}
            </div>
            <div className="spread-vertical large">
              <div className="limit-medium">
                <p className="large-text">WorldLynk is your one-stop solution for seamless student experience in UK.</p>
                <div className="button-stack">
                  <div className="button-wrap">
                    <div className="green-button-wrap">
                      <a  className="green-button with-icon w-inline-block">
                        {/* <div>Join now</div> */}
                        <QueryForm/>
                      </a>
                    </div>
                  </div>
                  <div className="glass-button-wrap">
                    <a href="/login" className="glass-button w-button">Sign in</a>
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
        <div style={{margin:"0 0 10px 0"}}>
        <img  src={jobs}/>
        </div>
        <div class="horizontal-spread">
            <div>
                <h3>Job Opportunities</h3>
                <p class="no-space-bottom">Your gateway to global job opportunities. Break geographical boundaries and access international opportunities. Empower your career with WorldLynk.</p>
            </div>
        </div>
    </div>
</div>
<div id="w-node-_7a84004a-190d-05e0-4cc8-df053c58d6ed-5c67f262" class="bento">
    <div class="bento-content-vertical">
        <div style={{margin:"0 0 10px 0"}}>
            <img src={eventsworldlynk}/>

        </div>
        <div class="horizontal-spread">
            <div>
                <h3>Events</h3>
                <p class="no-space-bottom">Discover and participate in engaging events tailored for international students. Explore academic, social, and cultural gatherings that enhance your educational journey in the UK.</p>
            </div>
        </div>
    </div>
</div>
                    <div id="w-node-_7a84004a-190d-05e0-4cc8-df053c58d6fb-5c67f262" class="bento-grid-3x">
                        <div id="w-node-_7a84004a-190d-05e0-4cc8-df053c58d6fc-5c67f262" class="bento">
                            <div class="bento-content-vertical">
                                <div><img src={college} 
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
                                <div><img src={stay} 
                                    /></div>
                                </div>
                                <div class="center-content center-text">
                                <h4>Accommodation</h4>
                                    <p  style={{textAlign:"justify"}}>Find your ideal stay seamlessly. Explore diverse accommodation options tailored to your preferences. Break barriers, discover international stays, and elevate your living arrangements with WorldLynk.</p>
                                    {/* <div class="green-button-wrap full-width"><a href="/join-waiting-list" class="green-button with-icon w-inline-block"><img src="https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65ef442193061e6b4fb6caa7_white-bg_black-s_bright-green-hand.png" loading="lazy" width="29" sizes="(max-width: 991px) 29px, (max-width: 1279px) 100vw, (max-width: 1919px) 2vw, 29px" alt="" srcset="https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65ef442193061e6b4fb6caa7_white-bg_black-s_bright-green-hand-p-500.png 500w, https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65ef442193061e6b4fb6caa7_white-bg_black-s_bright-green-hand-p-800.png 800w, https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65ef442193061e6b4fb6caa7_white-bg_black-s_bright-green-hand-p-1080.png 1080w, https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65ef442193061e6b4fb6caa7_white-bg_black-s_bright-green-hand.png 1188w"/><div>Join now</div></a></div> */}
                                </div>
                            </div>
                            {/* <img src="https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65ed8eb0c8c77c845c67f2a1_dots%20.png" loading="lazy" width="119" alt="" class="dots-pattern" /> */}
                            </div>
                        <div id="w-node-_7a84004a-190d-05e0-4cc8-df053c58d713-5c67f262"
                            class="bento">
                            <div class="bento-content-vertical">
                                <div>
                                    <div class="title-tag-wrapper">
                                    <div><img src={mentor} 
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
                        <div class="limit-medium">
                            {/* <div class="title-tag-wrapper">
                                <div class="title-tag-contents"><img src="https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65f0415153e12c7daa9c1fba_white-bg_black-s_bright-green-hand%20(1).png" loading="lazy" width="23" sizes="(max-width: 991px) 23px, (max-width: 1439px) 2vw, (max-width: 1919px) 23px, 1vw"
                                        alt="" srcset="https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65f0415153e12c7daa9c1fba_white-bg_black-s_bright-green-hand%20(1)-p-500.png 500w, https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65f0415153e12c7daa9c1fba_white-bg_black-s_bright-green-hand%20(1)-p-800.png 800w, https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65f0415153e12c7daa9c1fba_white-bg_black-s_bright-green-hand%20(1).png 813w"
                                    />
                                    <div>Account</div>
                                </div>
                            </div> */}
                            <h2>Join the <span>community.</span></h2>
                        </div>
                        <div class="space-top-medium">
                            <div class="three-column-grid">
                                <div id="w-node-aad99063-6a7c-d8e1-3dce-51d0a2bf2ac3-5c67f262" class="feature-card limit-tiny">
                                    <div class="alignment-line bigger"></div>
                                    <div class="green-button-wrap smaller">
                                        <div class="green-icon-wrap smaller">
                                            <img src="https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65ed8eb0c8c77c845c67f35e_application-one%201.svg"
                                             loading="lazy" alt="" /></div>
                                    </div>
                                    <h5 class="no-space-bottom">Create an account</h5>
                                </div>
                                <div id="w-node-aad99063-6a7c-d8e1-3dce-51d0a2bf2aca-5c67f262" class="feature-card limit-tiny">
                                    <div class="alignment-line bigger"></div>
                                    <div class="green-button-wrap smaller">
                                        <div class="green-icon-wrap smaller"><img src="https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65ed8eb0c8c77c845c67f35d_graphic-stitching%201.svg" loading="lazy" alt="" /></div>
                                    </div>
                                    <h5 class="no-space-bottom">Connect with brands</h5>
                                </div>
                                <div id="w-node-aad99063-6a7c-d8e1-3dce-51d0a2bf2ad1-5c67f262" class="feature-card limit-tiny">
                                    <div class="alignment-line bigger"></div>
                                    <div class="green-button-wrap smaller">
                                        <div class="green-icon-wrap smaller"><img src="https://assets-global.website-files.com/65ed8eb0c8c77c845c67f1ff/65ed8eb0c8c77c845c67f35c_shield%201.svg" loading="lazy" alt="" /></div>
                                    </div>
                                    <h5 class="no-space-bottom">Explore the missions</h5>
                                </div>
                            </div>
                        </div>
                        <div class="space-top-medium">
                            <div class="button-stack">
                                <div class="button-wrap">
                                    <div class="green-button-wrap"><a  class="green-button with-icon w-inline-block">
                        {/* <div>Join now</div> */}
                        <QueryForm/>
                                           </a></div>
                                </div>
                                <div class="glass-button-wrap"><a href="/login" class="glass-button w-button">Sign in</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  
    <section class="footer">
        <div class="w-layout-blockcontainer container w-container">
            <div class="footer-content">
                
                <div id="w-node-f3b10b78-278d-2c6b-c975-d2648da07d6b-8da07d68" class="limit-small"><a href="/old-home" class="w-inline-block"></a>
                <img src={logo} loading="lazy" alt="" class="heading-logo"/>

                    <div
                        class="space-top-small">
                            
                        <p class="large-text white-text">WorldLynk is your one-stop solution for seamless student experience in UK.</p>
                </div>
                <div class="social-logos-wrap">
                    <a href="/" target="_blank" class="social-logo w-inline-block">
                        <div class="icon-embed-xsmall w-embed"></div>
                    </a>
                    <a href="/" target="_blank" class="social-logo w-inline-block">
                        <div class="icon-embed-xsmall w-embed"></div>
                    </a>
                    <a href="/" target="_blank" class="social-logo w-inline-block">
                        <div class="icon-embed-xsmall w-embed"></div>
                    </a>
                    <a href="/" target="_blank" class="social-logo w-inline-block">
                        <div class="icon-embed-xsmall w-embed"></div>
                    </a>
                </div>
            </div>
            <div id="w-node-f3b10b78-278d-2c6b-c975-d2648da07d77-8da07d68" class="footer-columns">
                <div     id="w-node-f3b10b78-278d-2c6b-c975-d2648da07d78-8da07d68" class="footer-link-column">
                    <div id="w-node-f3b10b78-278d-2c6b-c975-d2648da07d79-8da07d68" class="footer-column-titile">Company</div>
                    <a href="/" id="w-node-f3b10b78-278d-2c6b-c975-d2648da07d7b-8da07d68" aria-current="page" class="footer-link w-inline-block w--current">
                        <div>Home </div>
                    </a>
                    <a href="/partnerships" id="w-node-f3b10b78-278d-2c6b-c975-d2648da07d7e-8da07d68" class="footer-link w-inline-block">
                        <div>Partnerships</div>
                    </a>
                    <a href="/about" id="w-node-f3b10b78-278d-2c6b-c975-d2648da07d94-8da07d68" class="footer-link w-inline-block">
                        <div>About</div>
                    </a>
                    <a href="/newsroom" id="w-node-_0e8a5424-6d07-d04a-8956-a42956017799-8da07d68" class="footer-link w-inline-block">
                        <div>Newsroom</div>
                    </a>
                    <div class="alignment-line smaller"></div>
                    <a href="/contact" id="w-node-b07bc73a-1591-149d-a41a-d1699793fdbe-8da07d68" class="footer-link w-inline-block">
                        <div>Contact</div>
                    </a>
                </div>
                <div id="w-node-_3cf6e9e0-961c-5f0d-35c1-94757fe19ece-8da07d68" class="footer-stack">
                    <div id="w-node-f3b10b78-278d-2c6b-c975-d2648da07d97-8da07d68" class="footer-link-column">
                        <div id="w-node-f3b10b78-278d-2c6b-c975-d2648da07d98-8da07d68" class="footer-column-titile">Platform</div>
                        <a id="w-node-f3b10b78-278d-2c6b-c975-d2648da07d9a-8da07d68" class="footer-link w-inline-block">
                            <div>Join </div>
                        </a>
                        <a href="/login" id="w-node-_05bed204-af49-6806-586c-d0440a0b7f82-8da07d68" class="footer-link w-inline-block">
                            <div>Sign in</div>
                        </a>
                        <div class="alignment-line smaller"></div>
                    </div>
                    <div class="footer-link-column">
                        <div id="w-node-d0e7d79e-52d4-f3ef-3f89-3bbd8596fcef-8da07d68" class="footer-column-titile">Service</div>
                        <a href="/partnerships/youth-verified" id="w-node-d0e7d79e-52d4-f3ef-3f89-3bbd8596fcf1-8da07d68" class="footer-link w-inline-block">
                            <div>Verification</div>
                        </a>
                        <div class="alignment-line smaller"></div>
                    </div>
                </div>
                <div id="w-node-_1b1e73d0-b89e-9f53-3549-ef6d4862bba4-8da07d68" class="footer-link-column">
                    <div id="w-node-_1b1e73d0-b89e-9f53-3549-ef6d4862bba5-8da07d68" class="footer-column-titile">Solution</div>
                    <a href="/partnerships/talent" id="w-node-_1b1e73d0-b89e-9f53-3549-ef6d4862bba7-8da07d68" class="footer-link w-inline-block">
                        <div>Talent </div>
                    </a>
                    <a href="/partnerships/communications" id="w-node-_2da2c486-3f70-1690-3115-0e283b12c042-8da07d68" class="footer-link w-inline-block">
                        <div>Communications</div>
                    </a>
                    <a href="/partnerships/development" id="w-node-_3c8ac7a1-bd89-3e61-ee45-f00bacee3c9b-8da07d68" class="footer-link w-inline-block">
                        <div>Development</div>
                    </a>
                    <a href="/partnerships/pricing" id="w-node-fdf00af3-65a4-8598-ffe5-6cc32eb0133e-8da07d68" class="footer-link w-inline-block">
                        <div>Pricing</div>
                    </a>
                    <div class="alignment-line smaller"></div>
                </div>
            </div>
        </div>
       
        </div>
    </section>
    </div>
  )
}

export default NewHome