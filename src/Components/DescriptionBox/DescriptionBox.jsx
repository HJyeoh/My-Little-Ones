import React, { useState } from 'react';
import './DescriptionBox.css';

// Dummy review data (you'd fetch this from the server in a real application)
const reviewsData = [
  { id: 1, user: 'Alice', review: 'Great product, loved it!', rating: 5 },
  { id: 2, user: 'Bob', review: 'Good quality but the shipping was slow.', rating: 4 }
];

const DescriptionBox = () => {
  const [isReviewWindowOpen, setIsReviewWindowOpen] = useState(false);
  const [reviews, setReviews] = useState(reviewsData);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5); // Default rating is 5 stars

  // Function to handle review submission
  const handleSubmitReview = () => {
    const newReviewData = {
      id: reviews.length + 1, // auto-increment ID
      user: 'Anonymous', // This can be dynamically set based on user input
      review: newReview,
      rating: newRating,
    };
    setReviews([...reviews, newReviewData]);
    setNewReview('');
    setNewRating(5); // Reset rating to 5 after submission

    // Here, you would also send the updated reviews to your backend to update `reviews.json`
  };

  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">
          <button onClick={() => setIsReviewWindowOpen(true)}>
            Reviews ({reviews.length})
          </button>
        </div>
      </div>
      <div className="descriptionbox-description">
        <p>
          hh My Little Ones is your one-stop destination for high-quality baby and mommy essentials, designed to make parenting joyful and stress-free. From cosy baby clothes and safe feeding products to stylish maternity wear and playful toys, we offer a carefully curated selection of trusted items to meet your family’s needs. With a focus on comfort, safety, and affordability, My Little Ones is dedicated to supporting every step of your parenting journey, ensuring your little one gets the very best while giving you peace of mind. Shop with us today and experience the magic of parenthood made easy!
        </p>
      </div>

      {isReviewWindowOpen && (
        <div className="review-popup">
          <div className="review-popup-content">
            <h2>Reviews</h2>
            <div className="reviews-list">
              {reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <p><strong>{review.user}</strong>: {review.review} (Rating: {review.rating} stars)</p>
                </div>
              ))}
            </div>
            <textarea 
              value={newReview} 
              onChange={(e) => setNewReview(e.target.value)} 
              placeholder="Write your review here..." 
            />
            <div className="rating">
              <span>Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  onClick={() => setNewRating(star)} 
                  style={{ color: star <= newRating ? 'gold' : 'gray' }}
                >
                  ★
                </button>
              ))}
            </div>
            <button onClick={handleSubmitReview}>Submit Review</button>
            <button onClick={() => setIsReviewWindowOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionBox;
