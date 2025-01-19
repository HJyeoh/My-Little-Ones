import React, { useState } from "react";
import "./DescriptionBox.css";

// Dummy review data (you'd fetch this from the server in a real application)
const reviewsData = [
  { id: 1, user: "Alice", review: "Great product, loved it!", rating: 5 },
  {
    id: 2,
    user: "Bob",
    review: "Good quality but the shipping was slow.",
    rating: 4,
  },
];

const DescriptionBox = ({ product }) => {
  const [isReviewWindowOpen, setIsReviewWindowOpen] = useState(false);
  const [reviews, setReviews] = useState(reviewsData);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5); // Default rating is 5 stars

  // Function to handle review submission
  const handleSubmitReview = () => {
    const newReviewData = {
      id: reviews.length + 1, // auto-increment ID
      user:
        localStorage.getItem("userType") === "user"
          ? localStorage.getItem("userEmail").split("@")[0] // Extract username from email
          : "Anonymous", // Default to "Anonymous" for non-users
      review: newReview,
      rating: newRating,
    };
    setReviews([...reviews, newReviewData]);
    setNewReview("");
    setNewRating(5); // Reset rating to 5 after submission

    // Here, you would also send the updated reviews to your backend to update `reviews.json`
  };

  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">
          <button
            className="rounded-md"
            onClick={() => setIsReviewWindowOpen(true)}
          >
            Reviews ({reviews.length})
          </button>
        </div>
      </div>
      <div className="descriptionbox-description">
        <p>{product.description}</p>
      </div>

      {isReviewWindowOpen && (
        <div className="review-popup">
          <div className="review-popup-content">
            <h2>Reviews</h2>
            <div className="reviews-list">
              {reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <p>
                    <strong>{review.user}</strong>: {review.review} (Rating:{" "}
                    {review.rating} stars)
                  </p>
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
                  style={{ color: star <= newRating ? "gold" : "gray" }}
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
