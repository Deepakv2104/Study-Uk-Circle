import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Card = (props) => {
    const navigate = useNavigate();
    const [showFullDescription, setShowFullDescription] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            // setLoading(false);
        }, 1000); // Adjust the delay as needed
        return () => clearTimeout(timer);
    }, []);

    const truncatedDescription = props.description.substring(0, 80);
    const remainingDescription = props.description.slice(80);

    const handleClick = () => {
        navigate(props.id);
    };

    return (
        <div className="max-w-xs rounded-lg overflow-hidden shadow-lg" style={{ maxWidth: '250px' }}>
            <div className="aspect-w-16 aspect-h-9">
              <img src={props.img} alt="Sample" load='lazy' />
            </div>
      
            <div className="p-2">
         
                <h5 className="text-lg font-semibold mb-1">{props.title}</h5>
                <p className="text-sm text-white-600 mb-1">{truncatedDescription}...</p>
                {!showFullDescription && remainingDescription && (
                  <p className="text-sm text-pink-600 cursor-pointer" onClick={handleClick}>
                    Read more
                  </p>
                )}
                {showFullDescription && (
                  <p className="text-sm text-pink-600 cursor-pointer" onClick={() => setShowFullDescription(false)}>
                    Show less
                  </p>
                )}
         
            </div>
      </div>
      
    );
};

export default Card;
