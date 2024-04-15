import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import OutlineButton from './outline-button';
import './place-card.css';

const UniversityCard = (props) => {
  const navigate = useNavigate();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    const truncatedText = text.substr(0, text.lastIndexOf(' ', maxLength));
    return truncatedText + '...';
  };
const handleClick=()=>{
  console.log('c')
navigate('university-name')
}
  return (
    <div className="place-card-container">
      <img
        alt={props.imageAlt || image}
        src={props.image}
        className="place-card-image"
      />
      <div className="place-card-container1">
        <span className="place-card-text">{props.city}</span>
        <span className="place-card-text1" style={{ textAlign: 'justify' }}>
          {showFullDescription ? props.description : truncateDescription(props.description, 100)}
          {!showFullDescription && (
            <button className="learn-more-button" onClick={toggleDescription}>
              Learn More
            </button>
          )}
          {showFullDescription && (
            <button className="show-less-button" onClick={toggleDescription}>
              ..Show Less
            </button>
          )}
        </span>
        <div onClick={handleClick}>
        <OutlineButton button1="Discover place" ></OutlineButton>
        </div>
     
      </div>
    </div>
  );
};

UniversityCard.defaultProps = {
  image:
    'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/27/a8/8d.jpg',
  imageAlt: 'image',
  city: 'City Name',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
};

UniversityCard.propTypes = {
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  city: PropTypes.string,
  description: PropTypes.string,
};

export default UniversityCard;
