import React, { useState, useEffect } from 'react';
import './Explore.css';
import haldirams from '../../assets/img/haldirams.png';
import CircularProgress from '@mui/material/CircularProgress';

const Explore = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ marginTop: '20px' }}>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <CircularProgress />
        </div>
      ) : (
        <div className="explore-container">
          <main className="grid">
            <article className='card'>
              <div className="image-container">
                <img src={haldirams} style={{ objectFit: 'cover' }} alt="Sample photo" />
                <div className="overlay">
                  <h3>Coming Soon</h3>
                </div>
              </div>
              <div className="text">
                <h5>Exciting New Flavors Coming Soon!</h5>
                <p>Exciting news! Haldiram's has something delicious in store for you. Stay tuned for the big reveal!</p>
                <button className="btn-block">Order Now</button>
              </div>
            </article>
          </main>
        </div>
      )}
    </div>
  );
};

export default Explore;
