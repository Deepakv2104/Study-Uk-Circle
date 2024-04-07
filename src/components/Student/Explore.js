import React from 'react';
import './Explore.css';
import haldirams from '../../assets/img/haldirams.png';

const Explore = () => {
  return (
    <div style={{ marginTop: '20px' }}>
      <div className="container1">
        <main className="grid">
          <article>
            <div className="image-container">
              <img src={haldirams} style={{ objectFit: 'cover' }} alt="Sample photo" />
              <div className="overlay">
                <h3>Coming Soon</h3>
              </div>
            </div>
            <div className="text">
  <h4>Exciting New Flavors Coming Soon!</h4>
  <p>Exciting news! Haldiram's has something delicious in store for you. Stay tuned for the big reveal!</p>
  <button className="btn-block">Order Now</button>
</div>

          </article>
      
  
        </main>
      </div>
    </div>
  );
};

export default Explore;
