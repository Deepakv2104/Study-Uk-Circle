import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './card.css';

const Card = (props) => {
    const navigate = useNavigate();
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [loading, setLoading] = useState(true); // State to manage loading status

    // Simulate loading delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust the delay as needed
        return () => clearTimeout(timer);
    }, []);

    // Split description by words
    const descriptionWords = props.description.split(' ');

    // Extract first 18 words
    const truncatedDescription = props.description.substring(0,80)

    // Extract remaining words after the first 18
    const remainingDescription = descriptionWords.slice(18).join(' ');

    const handleClick = () => {
        navigate(props.id);
    };

    return (
        <div className="container1">
            <main className="grid card">
                <article>
                    <div className="image-container">
                        <img src={props.img} style={{ objectFit: 'cover' }} alt="Sample photo" />
                        {/* <div className="overlay">
                            <h3>Coming Soon</h3>
                        </div> */}
                    </div>

                    <div className="text">
                        <>
                            <h5>{props.title}</h5>
                            {/* Display truncated description */}
                            <p>{ props.title.length > 30 ? `${truncatedDescription.substring(0, 40)}... `:` ${truncatedDescription}...`}</p>
                            {/* Show "Read More" text if description is truncated */}
                            {!showFullDescription && remainingDescription && (
                                <p style={{ color: '#c22169', cursor: 'pointer' }} onClick={handleClick}>
                                    Read more
                                </p>
                            )}
                            {/* Show "Show Less" text if description is expanded */}
                            {showFullDescription && (
                                <p style={{ color: '#c22169', cursor: 'pointer' }} onClick={() => setShowFullDescription(false)}>
                                    Show less
                                </p>
                            )}
                        </>
                    </div>
                </article>
            </main>
        </div>
    );
};

export default Card;
