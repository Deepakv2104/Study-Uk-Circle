// University.jsx

import React, { Component } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import Card from './card';
import './University.css'; // Import the CSS file

class University extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      universities: [
        // University data
        {
          collegeName: "Massachusetts Institute of Technology (MIT)",
          src: "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/27/a8/8d.jpg",
          description: "Located in Cambridge, Massachusetts, the well-respected Massachusetts Institute of Technology (MIT) is a private research university with a strong focus on technology, science, and engineering. Although it’s a 168-acre urban campus, you’ll see visually interesting buildings mixed with peaceful green spaces."
        },
        {
          collegeName: "University of Oxford",
          src: "https://imageio.forbes.com/specials-images/imageserve/63c7f514c2ccb05c88766ebe/Oxford-University/960x0.jpg?format=jpg&width=960",
          description: "The oldest university in the English-speaking world, the University of Oxford is the main draw to the riverside town of Oxford. With a history dating back to the 11th century, the university’s many colleges offer a wealth of gorgeous historical architecture—not to mention settings for movies including the Harry Potter series."
        },
        {
          collegeName: "University of Cambridge",
          src: "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/39/92/84.jpg",
          description: "Founded in 1209, the University of Cambridge is one of Britain’s oldest and most prestigious universities. Made up of six schools, 31 constituent colleges, and more than 100 academic departments, the historic university boasts an impressive alumni, which includes Sir Isaac Newton, Charles Darwin, Stephen Hawking, and Lord Byron."
        },
        {
          collegeName: "University of Chicago",
          src: "https://media.istockphoto.com/id/1332952590/photo/aerial-view-of-a-large-university-in-the-chicago-neighborhood-of-hyde-park.jpg?s=612x612&w=0&k=20&c=v70bNZdLe6bTspTfLgFueNMCbMWNU5J2B-mjrBdDFAg=",
          description: "Founded in 1890, the University of Chicago is among the premier private research universities in the world. Best known for its achievements in medicine, science, and engineering, it proudly claims more than 100 Nobel laureates among its alumni and faculty. The picturesque campus is located in Chicago’s Hyde Park neighborhood."
        },
        {
          collegeName: "University of Toronto",
          src: "https://www.utoronto.ca/sites/default/files/picpath/2016-03-11-uoftbirthday.jpg",
          description: "One of Canada’s most prestigious universities, the University of Toronto is known to academics and scholars. But the downtown campus is also a top attraction for visitors to Toronto, who stroll its well-tended paths, check out the stately buildings, and wander through the leafy Philosopher’s Walk."
        },
        {
          collegeName: "National University of Singapore (NUS)",
          src: "https://images.collegedunia.com/public/college_data/SAcampusimage/1599288975nus_infra4.jpg?w=830&h=582&mode=stretch?h=85&mode=stretch",
          description: "Founded in 1905, the National University of Singapore (NUS) is a comprehensive research university located in Singapore. With a vibrant and diverse community of students and staff from over 100 countries, NUS offers a global approach to education and research, with a focus on Asian perspectives and expertise."
        }
      ]
    };
  }

  componentDidMount() {
    // Simulate data fetching delay
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }

  render() {
    const { loading, universities } = this.state;

    return (
      <div className="landing-page-container">
        <div id="main-section" className="landing-page-main">
          <div className="university-banner">
          <img
              src="https://source.unsplash.com/1200x400/?university"
              srcSet="https://source.unsplash.com/600x200/?university 600w,
                        https://source.unsplash.com/1200x400/?university 1200w"
              sizes="(max-width: 600px) 600px, 1200px"
              alt="Famous Universities Banner"
            />
            <div className="overlay">
              <h1>Explore Your Dream University</h1>
              <p>Discover the rich history and academic excellence of institutions like Oxford and Cambridge. From the picturesque landscapes of Scotland to the vibrant city life in London, the UK offers a diverse range of educational experiences to pursue your aspirations.</p>
              <button>explore</button>
            </div>
          </div>

          <div className="landing-page-text">
            <h3>Popular Universities</h3>
            <span className="landing-page-text15">Recommended</span>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <CircularProgress />
            </div>
          ) : (
            <Grid container spacing={3}>
              {universities.map((university, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    title={university.collegeName}
                    img={university.src}
                    description={university.description}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </div>
        <div className="landing-page-footer">
          {/* Add footer content if needed */}
        </div>
      </div>
    );
  }
}

export default University;
