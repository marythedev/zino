import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ addReview }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [images, setImages] = useState([]);

    const handleRating = (index) => () => {
        setRating(index + 1);
        const stars = document.querySelectorAll('.review-form-rating img');
        stars.forEach((star, i) => {
            if (i <= index) {
                star.src = window.location.origin + '/icons/star-filled.png';
            } else {
                star.src = window.location.origin + '/icons/star.png';
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            return;
        }
        
        const newReview = {
            author: 'User',
            comment: review,
            rating,
            date: new Date(),
            avatar: '/images/placeholders/reviewUserAvatar.png',
        };

        addReview(newReview);
        setRating(0);
        handleRating(-1)();
        setReview('');
        setImages([]);
    };

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <img src={window.location.origin + '/images/placeholders/reviewUserAvatar.png'} alt="user" height={65} />
            <div className="review-form-body">
                <div className="review-form-rating">
                    {[...Array(5)].map((_, index) => (
                        <img key={index} src={window.location.origin + '/icons/star.png'} alt="star" height={20} onClick={handleRating(index)} />
                    ))}
                </div>
                <div className="review-form-message">
                    <textarea 
                        placeholder="Write a review" 
                        rows={2} 
                        value={review} 
                        onChange={(e) => setReview(e.target.value)} 
                    />
                    <img src={window.location.origin + '/icons/add-image.png'} height={30} alt="add images" />
                    <button type="submit" className={rating === 0 ? 'not-working' : ''}>Add Review</button>
                </div>
            </div>
        </form>
    )
}

export default ReviewForm;
