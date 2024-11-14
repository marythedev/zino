import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';
import axios from 'axios';
import './Product.css';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({
        title: '',
        seller: '',
        image: '',
        rating: '',
        sold: 0,
        inStock: 0,
        options: [],
        reviews: [],
    });
    const [sortOption, setSortOption] = useState('mostRecent');
    const [visibleReviews, setVisibleReviews] = useState(5);

    useEffect(() => {
        if (id) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/find/${id}`)
            .then((response) => {
                setProduct(response.data);
            }).catch((error) => {
                console.error('Error fetching product:', error);
            });
        }
    }, [id]);

    const addReview = (newReview) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            reviews: [newReview, ...prevProduct.reviews],
        }));
    };

    const sortedReviews = () => {
        return [...product.reviews].sort((a, b) => {
            if (sortOption === 'mostRecent') {
                return new Date(b.date) - new Date(a.date);
            }
            if (sortOption === 'mostOldest') {
                return new Date(a.date) - new Date(b.date);
            }
            if (sortOption === 'highestToLowest') {
                return b.rating - a.rating;
            }
            if (sortOption === 'lowestToHighest') {
                return a.rating - b.rating;
            }
            return 0;
        });
    };

    const loadMoreReviews = () => {
        setVisibleReviews((prevVisible) => prevVisible + 5);
    };

    return (
        <div className="product-page">
            <div className="overview">
                <div className="product-image">
                    <img src={window.location.origin + product.image} alt={product.title} />
                </div>

                <div className="product-desc">
                    <div className="product-heading">
                        <div>
                            <h1>{product.title}</h1>
                            <p className="seller">{product.seller}</p>
                        </div>

                        <div className="rating-sold-stock">
                            <div className="rating">
                                <div className="star-rating">
                                    {[...Array(5)].map((_, index) => (
                                        <img
                                            key={index}
                                            src={
                                                index < product.rating
                                                    ? window.location.origin + '/icons/star-filled.png'
                                                    : window.location.origin + '/icons/star.png'
                                            }
                                            alt="star"
                                        />
                                    ))}
                                </div>
                                <p>{product.rating}</p>
                            </div>
                            <p>{product.sold > 2000 ? '2000+' : product.sold} sold</p>
                            <p style={{ color: product.inStock < 20 ? 'red' : 'black' }}>{product.inStock} left in stock</p>
                        </div>
                    </div>

                    <div className="product-custom-options">
                        {product.options && product.options.map((option, index) => {
                            if (index < 2) {
                                if (option.type === "color") {
                                    return (
                                        <div key={index} className="option">
                                            <p>{option.name}</p>
                                            <div className="option-chips">
                                                {option.options.map((color, index) => (
                                                    <div key={index} className="color-option">
                                                        <button>
                                                            <img src={window.location.origin + color.image} alt={color.name} />
                                                        </button>
                                                        <p>{color.name}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                } else if (option.type === "chip") {
                                    return (
                                        <div key={index} className="option">
                                            <p>{option.name}</p>
                                            <div className="option-chips">
                                                {option.options.map((chip, index) => (
                                                    <button key={index} className="option-chip">{chip}</button>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }
                            } else {
                                return (
                                    <button key={index} className="more-options">More Options</button>
                                );
                            }
                        })}
                    </div>

                    <div className="buy-product">
                        <button className="add-to-cart">Add to cart</button>

                        <p className='price'>
                            {product.priceBefore ?
                                <div className="sale">
                                    <p className="price-before">${product.priceBefore}</p>
                                    <p className="discount">{
                                        Math.ceil(((product.priceBefore - product.price) / product.priceBefore) * 100)
                                    }% off</p>
                                </div>
                                : null}
                            ${product.price}
                        </p>
                    </div>
                </div>
            </div>

            <br />

            <div className="specs">
                <h3>Specifications</h3>

                <table>
                    <tbody>
                        {product.specs && product.specs.map((spec, index) => (
                            <tr key={index}>
                                <td className="spec-name">{spec.name}</td>
                                <td>{spec.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <br />

            <div className="reviews">
                <h3>Reviews ({product.reviews && product.reviews.length})</h3>

                <ReviewForm addReview={addReview} />

                <br />

                <div className="filter-reviews">
                    <button onClick={() => setSortOption('mostRecent')}>Most Recent</button>
                    <button onClick={() => setSortOption('mostOldest')}>Most Oldest</button>
                    <button onClick={() => setSortOption('highestToLowest')}>Highest to Lowest Rating</button>
                    <button onClick={() => setSortOption('lowestToHighest')}>Lowest to Highest Rating</button>
                </div>
                <div className="review-section">
                    {product.reviews.length > 0 ? (
                        sortedReviews().slice(0, visibleReviews).map((review, index) => (
                            <div key={index} className="review-card">
                                <div className="review">
                                    <img className="review-avatar" src={window.location.origin + review.avatar} alt="Reviewer Avatar" />
                                    <div className="review-body">
                                        <p className="review-author">{review.author}</p>
                                        <p>{review.comment}</p>
                                    </div>
                                </div>
                                <div className="review-metadata">
                                    <div className="rating">
                                        <div className="star-rating">
                                            {[...Array(5)].map((_, index) => (
                                                <img
                                                    key={index}
                                                    src={
                                                        index < review.rating
                                                            ? window.location.origin + '/icons/star-filled.png'
                                                            : window.location.origin + '/icons/star.png'
                                                    }
                                                    alt="star"
                                                />
                                            ))}
                                        </div>
                                        <p>{review.rating}</p>
                                    </div>
                                    <p className="review-date">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}

                    {visibleReviews < product.reviews.length && (
                        <button onClick={loadMoreReviews} className="load-more">Load More Reviews</button>
                    )}
                </div>
            </div>

            <br />
        </div>
    );
}

export default Product;