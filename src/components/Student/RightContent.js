import React from "react";
import {
  FaEnvelope,
  FaBell,
  // FaMoon,
  // FaSun,
  // FaCheckCircle,
  // FaClock,
} from "react-icons/fa";
import './UserDashboard.css'
const RightContent = () => {
 



  return (
    <div>
      {" "}
      <div className="right-content">
        <div className="interaction-control interactions">
          <FaEnvelope className="notified" />
          <FaBell className="notified" />
          {/* <div className="toggle" onclick={switchTheme}>
            <div className="mode-icon moon">
              <FaMoon className="bx bxs-moon" />
            </div>
            <div className={`mode-icon sun ${isSunHidden ? "hidden" : ""}`}>
              <FaSun className="bx bxs-sun" />
            </div>
          </div> */}
        </div>
        {/* <div className="analytics">
          <h1>Analytics</h1>
          <div class="analytics-container">
            <div class="total-events">
              <div className="event-number card">
                <h2>Past Events</h2>
                <p>20</p>
                <FaCheckCircle className="icon1" />
              </div>
              <div className="event-number card">
                <h2>Upcoming Events</h2>
                <p>3</p>
                <FaClock className="icon1" />
              </div>
            </div>

            <div className="chart" id="doughnut-chart">
              <h2>Distribution of Attended Events</h2>
              <canvas id="doughnut"></canvas>
              <ul></ul>
            </div>
          </div>
        </div> */}

        <div class="contacts">
          <h1>Contacts</h1>
          <div class="contacts-container">
            <div class="contact-status">
              <div class="contact-activity">
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e56800db-687d-4d0e-a470-51e37a4431c7"
                  alt=""
                />
                <p>
                  Matt favored <span>Jazz Fusion Night</span>
                </p>
              </div>
              <small>1 hour ago</small>
            </div>

            <div class="contact-status">
              <div class="contact-activity">
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/fac9f27b-c1ea-4bba-973f-88996322fa2d"
                  alt=""
                />
                <p>
                  Bella bought a ticket for
                  <span>Acoustic Serenade Under the Stars</span>
                </p>
              </div>
              <small>4 hours ago</small>
            </div>

            <div class="contact-status">
              <div class="contact-activity">
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/1499d73c-ccc0-41a1-b530-1d629012aebd"
                  alt=""
                />
                <p>
                  Lucas bought a ticket for
                  <span>Wimbledon Championships - 2024</span>
                </p>
              </div>
              <small>1 day ago</small>
            </div>

            <div class="contact-status">
              <div class="contact-activity">
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/949768d4-0196-486c-b386-edb47ddd54c2"
                  alt=""
                />
                <p>
                  Sophia favored
                  <span>Clay Sculpting Class</span>
                </p>
              </div>
              <small>1 day ago</small>
            </div>

            <div class="contact-status">
              <div class="contact-activity">
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/8a470b8b-b5cf-4189-b36e-f22551997ff4"
                  alt=""
                />
                <p>
                  Kate bought a ticket for
                  <span>Latin Rhythms Fusion</span>
                </p>
              </div>
              <small>3 day ago</small>
            </div>

            <div class="contact-status">
              <div class="contact-activity">
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7740acc0-3f86-4c28-8a8c-5ae67c343edb"
                  alt=""
                />
                <p>
                  Ben favored
                  <span>Harry Potter Film Concert Series</span>
                </p>
              </div>
              <small>6 day ago</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightContent;
