import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import OutlineButton from './outline-button';

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

  const handleClick = () => {
    navigate('university-name');
  };

  return (
    <div className="flex items-center border border-gray-200 p-4 rounded-md shadow-md">
      <img
        alt={props.imageAlt || 'image'}
        src={props.image}
        className="w-32 h-32 object-cover rounded-md mr-4"
      />
      <div className="flex flex-col flex-grow">
        <span className="text-lg font-semibold mb-2">{props.city}</span>
        <span className="text-sm text-justify mb-2">
          {showFullDescription ? props.description : truncateDescription(props.description, 100)}
          {!showFullDescription && (
            <button className="text-blue-500 hover:underline" onClick={toggleDescription}>
              Learn More
            </button>
          )}
          {showFullDescription && (
            <button className="text-blue-500 hover:underline" onClick={toggleDescription}>
              ..Show Less
            </button>
          )}
        </span>
        <OutlineButton button1="Discover place" onClick={handleClick} />
      </div>
    </div>
  );
};

UniversityCard.defaultProps = {
  image:
    'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/27/a8/8d.jpg',
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
