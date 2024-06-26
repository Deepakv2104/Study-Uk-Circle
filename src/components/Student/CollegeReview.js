import React from 'react';
import { Paper, Typography, Box, Card, CardContent, CardHeader, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';

const CollegeReviews = () => {
  // Sample data for reviews
  const reviewsData = [
    { user: 'John Doe', avatar: 'JD', rating: 4.5, review: 'My time at the University of Oxford has been great! Tips: It is definitely difficult to adjust to a completely different academic environment and a new country in the beginning. So students should keep an open mind and engage themselves in different cultural activities to ensure the transition period is smooth. Homesickness is real but I would encourage students to reach out for help whenever they need it. All the counsellors and supervisors are always ready to listen to you. I have been very fortunate to have attended the University of Oxford, which was my dream university and the experience I have had was nothing less than amazing. Likes (Student Life): Student life is great! I have learnt so much during my time at Oxford. What I enjoyed the most was problem based learning sessions wherein the entire cohort was divided into groups and given activities and questions to answer based on clinical cases. The quality of education is really commendable. The events that were organised by the university as well as the student unions are also ample. Students can join different clubs and societies and pursue their interests.Dislikes (Internships): There are a lot of opportunities to apply for internships however since the MSc program is of a year it might be difficult to apply and continue an internship with so much to cover in academics. The program might make it difficult to take up internships during the course duration.' },
    { user: 'Jane Smith', avatar: 'JS', rating: 5, review: 'Amazing atmosphere and facilities.' },
    { user: 'Alice Johnson', avatar: 'AJ', rating: 3.5, review: 'Good experience overall, but could improve in some areas.' },
    { user: 'Bob Williams', avatar: 'BW', rating: 4, review: 'Highly recommended for quality education.' },
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? true : false;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={`full-${i}`} />);
    }

    if (halfStar) {
      stars.push(<StarHalfIcon key="half-star" />);
    }

    return stars;
  };

  return (
    <div className="bg-gray-800 text-white p-4">
    <h6 className="text-xl font-bold mb-2">College Reviews</h6>
    <div className="mt-2">
        {reviewsData.map((review, index) => (
            <div key={index} className="bg-gray-700 rounded-lg mb-2">
                <div className="p-4">
                    <div className="flex items-center mb-2">
                        <div className="bg-gray-600 w-10 h-10 flex items-center justify-center rounded-full mr-4">
                            {review.avatar}
                        </div>
                        <div>
                            <p className="font-bold">{review.user}</p>
                            <p>{renderStars(review.rating)}</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-300">{review.review}</p>
                </div>
            </div>
        ))}
    </div>
</div>

  );
};

export default CollegeReviews;
