import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import Card from './card'
import './University.css'; // Import the CSS file
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../../firebase'; // Import your Firestore instance

const University = () => {
  const [loading, setLoading] = useState(true);
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const universitiesCollection = collection(firestore, 'universities');
        const snapshot = await getDocs(universitiesCollection);
        const fetchedUniversities = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUniversities(fetchedUniversities);
        localStorage.setItem('universities', JSON.stringify(fetchedUniversities));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching universities:', error);
        setLoading(false);
      }
    };

    const storedUniversities = localStorage.getItem('universities');
    if (storedUniversities) {
      setUniversities(JSON.parse(storedUniversities));
      setLoading(false);
    } else {
      fetchUniversities();
    }
  }, []);

  return (
    <div className="landing-page-container">
      <div id="main-section" className="landing-page-main">
        <div className="university-banner">
          <img
            src="https://source.unsplash.com/1200x400/?university"
            srcSet="https://source.unsplash.com/600x200/?university 600w,
                        https://source.unsplash.com/1200x400/?university 1200w"
            sizes="(max-width: 600px) 600px, 1200px"
            loading='lazy'
            alt="Famous Universities Banner"
          />
          <div className="overlay">
            <h1>Explore Your Dream University</h1>
            <p>Discover the rich history and academic excellence of institutions like Oxford and Cambridge. From the picturesque landscapes of Scotland to the vibrant city life in London, the UK offers a diverse range of educational experiences to pursue your aspirations.</p>
            <button>Explore</button>
          </div>
        </div>

        <div className="landing-page-text">
          <h5>Popular Universities</h5>
          <span className="landing-page-text15">Recommended</span>
        </div>

        {loading ? (
          <div className="loading-spinner">
            <CircularProgress />
          </div>
        ) : (
          <Grid container spacing={1}> {/* Adjust spacing value as needed */}
            {universities.map((university, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  title={university.collegeName}
                  img={university.cardImage}
                  description={university.description}
                  id={university.collegeId}
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
};

export default University;
