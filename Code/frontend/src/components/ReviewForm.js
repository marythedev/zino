import React, { useState } from 'react';
import './ReviewForm.css';
import ImageUploader from './ImageUploader';

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
            createdAt: new Date(),
            images: images,
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
                    <ImageUploader publicKey="9aff252c34d4e829b757" secretKey="18ec2585a2351f059b2f" multiple={true} images={images} onChange={setImages} >
                        <img src={window.location.origin + '/icons/add-image.png'} height={30} alt="add images" />
                    </ImageUploader>
                    <button type="submit" className={rating === 0 ? 'not-working' : ''}>Add Review</button>
                </div>
            </div>
            <div className="preview-images">
            </div>
        </form>
    )
}

export default ReviewForm;
