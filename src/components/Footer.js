// DetailsPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import logo from "../assets/img/logo.svg";
import '../styles/Footer.css'

const Footer = () => {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate('/join-waiting-list');
  };
  
  const handleBrandFormClick = () => {
    navigate('/write-to-us');
  };

  return (
    <section className="footer">
      <div className="w-layout-blockcontainer container w-container">
        <div className="footer-content">
          <div id="w-node-f3b10b78-278d-2c6b-c975-d2648da07d6b-8da07d68" className="limit-small">
            <div className="w-inline-block">
              <img src={logo} loading="lazy" alt="" className="heading-logo" />
            </div>
            <div className="space-top-small">
              <p className="large-text white-text">
                WorldLynk is your one-stop solution for seamless student experience in UK.
              </p>
            </div>
          </div>
          <div id="w-node-f3b10b78-278d-2c6b-c975-d2648da07d77-8da07d68" className="footer-columns">
            <div id="w-node-f3b10b78-278d-2c6b-c975-d2648da07d78-8da07d68" className="footer-link-column">
              <div id="w-node-f3b10b78-278d-2c6b-c975-d2648da07d79-8da07d68" className="footer-column-titile">Company</div>
              <div id="w-node-f3b10b78-278d-2c6b-c975-d2648da07d7b-8da07d68" className="footer-link w-inline-block ">
                <div>Home</div>
              </div>
              <div onClick={handleBrandFormClick} id="w-node-f3b10b78-278d-2c6b-c975-d2648da07d7e-8da07d68" className="footer-link w-inline-block">
                <div>Partnerships</div>
              </div>
              <div id="w-node-f3b10b78-278d-2c6b-c975-d2648da07d94-8da07d68" className="footer-link w-inline-block">
                <div>About</div>
              </div>
              <div id="w-node-_0e8a5424-6d07-d04a-8956-a42956017799-8da07d68" className="footer-link w-inline-block">
                <div>Newsroom</div>
              </div>
              <div className="alignment-line smaller"></div>
              <div id="w-node-b07bc73a-1591-149d-a41a-d1699793fdbe-8da07d68" className="footer-link w-inline-block">
                <div>Contact</div>
              </div>
            </div>
            <div id="w-node-_3cf6e9e0-961c-5f0d-35c1-94757fe19ece-8da07d68" className="footer-stack">
              <div id="w-node-f3b10b78-278d-2c6b-c975-d2648da07d97-8da07d68" className="footer-link-column">
                <div id="w-node-f3b10b78-278d-2c6b-c975-d2648da07d98-8da07d68" className="footer-column-titile">Platform</div>
                <div onClick={handleJoinClick} id="w-node-f3b10b78-278d-2c6b-c975-d2648da07d9a-8da07d68" className="footer-link w-inline-block">
                  <div>Join</div>
                </div>
                <div onClick={handleJoinClick} id="w-node-_05bed204-af49-6806-586c-d0440a0b7f82-8da07d68" className="footer-link w-inline-block">
                  <div>Sign in</div>
                </div>
                <div className="alignment-line smaller"></div>
              </div>
            </div>
            <div id="w-node-_1b1e73d0-b89e-9f53-3549-ef6d4862bba4-8da07d68" className="footer-link-column">
              <div id="w-node-_1b1e73d0-b89e-9f53-3549-ef6d4862bba5-8da07d68" className="footer-column-titile">Solution</div>
              <div id="w-node-_1b1e73d0-b89e-9f53-3549-ef6d4862bba7-8da07d68" className="footer-link w-inline-block">
                <div>Talent</div>
              </div>
              <div id="w-node-_2da2c486-3f70-1690-3115-0e283b12c042-8da07d68" className="footer-link w-inline-block">
                <div>Communications</div>
              </div>
              <div id="w-node-_3c8ac7a1-bd89-3e61-ee45-f00bacee3c9b-8da07d68" className="footer-link w-inline-block">
                <div>Development</div>
              </div>
              <div id="w-node-fdf00af3-65a4-8598-ffe5-6cc32eb0133e-8da07d68" className="footer-link w-inline-block">
                <div>Pricing</div>
              </div>
              <div className="alignment-line smaller"></div>
            </div>
          </div>
        </div>
        <p className="large-text white-text">@copyright all rights reserved</p>
      </div>
    </section>
  );
}

export default Footer;
