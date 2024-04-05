import React, { Component } from 'react';
import SolidButton from './SolidButton';
import UniversityCard from './UniversityCard';
import './landing-page.css';
import UniversityDetails from './UniversityDetails';

class University extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      universities: [
        {
          city: "Massachusetts Institute of Technology (MIT)",
          src: "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/27/a8/8d.jpg",
          description: "Located in Cambridge, Massachusetts, the well-respected Massachusetts Institute of Technology (MIT) is a private research university with a strong focus on technology, science, and engineering. Although it’s a 168-acre urban campus, you’ll see visually interesting buildings mixed with peaceful green spaces."
        },
        {
          city: "University of Oxford",
          src: "https://imageio.forbes.com/specials-images/imageserve/63c7f514c2ccb05c88766ebe/Oxford-University/960x0.jpg?format=jpg&width=960",
          description: "The oldest university in the English-speaking world, the University of Oxford is the main draw to the riverside town of Oxford. With a history dating back to the 11th century, the university’s many colleges offer a wealth of gorgeous historical architecture—not to mention settings for movies including the Harry Potter series."
        },
        {
          city: "University of Cambridge",
          src: "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/39/92/84.jpg",
          description: "Founded in 1209, the University of Cambridge is one of Britain’s oldest and most prestigious universities. Made up of six schools, 31 constituent colleges, and more than 100 academic departments, the historic university boasts an impressive alumni, which includes Sir Isaac Newton, Charles Darwin, Stephen Hawking, and Lord Byron."
        },
        {
          city: "University of Chicago",
          src: "https://media.istockphoto.com/id/1332952590/photo/aerial-view-of-a-large-university-in-the-chicago-neighborhood-of-hyde-park.jpg?s=612x612&w=0&k=20&c=v70bNZdLe6bTspTfLgFueNMCbMWNU5J2B-mjrBdDFAg=",
          description: "Founded in 1890, the University of Chicago is among the premier private research universities in the world. Best known for its achievements in medicine, science, and engineering, it proudly claims more than 100 Nobel laureates among its alumni and faculty. The picturesque campus is located in Chicago’s Hyde Park neighborhood."
        },
        {
          city: "University of Toronto",
          src: "https://www.utoronto.ca/sites/default/files/picpath/2016-03-11-uoftbirthday.jpg",
          description: "One of Canada’s most prestigious universities, the University of Toronto is known to academics and scholars. But the downtown campus is also a top attraction for visitors to Toronto, who stroll its well-tended paths, check out the stately buildings, and wander through the leafy Philosopher’s Walk."
        },
        {
          city: "National University of Singapore (NUS)",
          src: "https://images.collegedunia.com/public/college_data/SAcampusimage/1599288975nus_infra4.jpg?w=830&h=582&mode=stretch?h=85&mode=stretch",
          description: "Founded in 1905, the National University of Singapore (NUS) is a comprehensive research university located in Singapore. With a vibrant and diverse community of students and staff from over 100 countries, NUS offers a global approach to education and research, with a focus on Asian perspectives and expertise."
        }
      ]
      
    };
  }

  render() {
    return (
      <div className="landing-page-container">
        <div className="landing-page-top-container">
          <div className="landing-page-hero">
            <div className="landing-page-content-container">
              <h1 className="Heading landing-page-text09">Discover Your Dream University</h1>
              <h2 style={{ color: "black" }} className="Subheading landing-page-subheading">
                Explore Thousands of Universities
              </h2>
              <span className="landing-page-text10">
                <span style={{ color: "black" }}>
                  Plan Your Future with Confidence,
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <br />
                <span style={{ color: "black" }}>Finding the perfect University is a crucial step in shaping your future. At WorldLynk, we're dedicated to simplifying the University search process for you. Whether you're seeking renowned universities, specialized institutions, or vibrant community colleges, we've got you covered.</span>
              </span>
              <SolidButton button="Explore Universities"></SolidButton>
            </div>
          </div>
        </div>
        <div id="main-section" className="landing-page-main">
          <h1>Most Famous Universities</h1>
          <span className="landing-page-text15">Recommended</span>
          <div className="landing-page-cards-container">
            {this.state.universities.map((university, index) => (
              <UniversityCard
                key={index}
                city={university.city}
                src={university.src}
                description={university.description}
              />
            ))}
          </div>
        </div>
       
            <div className="landing-page-footer">
  <div className="landing-page-menu">
    <h1>WorldLynk</h1>
    <div className="landing-page-links-container2">
      <div className="landing-page-container1">
        <a
          href="https://example.com"
          target="_blank"
          rel="noreferrer noopener"
          className="landing-page-link05"
        >
          United Kingdom
        </a>
        <a
          href="https://example.com"
          target="_blank"
          rel="noreferrer noopener"
          className="landing-page-link06"
        >
          Germany
        </a>
        <a
          href="https://example.com"
          target="_blank"
          rel="noreferrer noopener"
          className="landing-page-link07"
        >
          Canada
        </a>
        <a
          href="https://example.com"
          target="_blank"
          rel="noreferrer noopener"
          className="landing-page-link08"
        >
          United States
          <span dangerouslySetInnerHTML={{ __html: ' ' }} />
        </a>
      </div>
      <div className="landing-page-container2">
        <a
          href="https://example.com"
          target="_blank"
          rel="noreferrer noopener"
          className="landing-page-link09"
        >
          About us
        </a>
        <a
          href="https://example.com"
          target="_blank"
          rel="noreferrer noopener"
          className="landing-page-link10"
        >
          FAQ
        </a>
        <a
          href="https://example.com"
          target="_blank"
          rel="noreferrer noopener"
          className="landing-page-link11"
        >
          Terms and conditions
        </a>
        <a
          href="https://example.com"
          target="_blank"
          rel="noreferrer noopener"
          className="landing-page-link12"
        >
          Contact
        </a>
      </div>
    </div>
    <div className="landing-page-follow-container1">
      <span className="landing-page-text16">
        Follow us on
        <span dangerouslySetInnerHTML={{ __html: ' ' }} />
      </span>
      <div className="landing-page-icons-container1">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer noopener"
          className="landing-page-link13"
        >
          <svg viewBox="0 0 877.7142857142857 1024" className="landing-page-icon11">
            <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
          </svg>
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer noopener"
          className="landing-page-link14"
        >
          <svg viewBox="0 0 602.2582857142856 1024" className="landing-page-icon13">
            <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
          </svg>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer noopener"
          className="landing-page-link15"
        >
          <svg viewBox="0 0 950.8571428571428 1024" className="landing-page-icon15">
            <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
          </svg>
        </a>
      </div>
    </div>
  </div>
</div>

          </div>

    );
  }
}

export default University;
