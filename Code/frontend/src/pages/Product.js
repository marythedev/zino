import React, { useState, useContext, useEffect } from 'react';
import { ProductsContext } from './ProductsContext';
import { useParams } from 'react-router-dom';
import './Product.css';

const Product = () => {
    const { id } = useParams();
    const { getProductsById } = useContext(ProductsContext);
    const [product, setProduct] = useState({
        title: '',
        seller: '',
        image: '',
        rating: '',
        sold: 0,
        inStock: 0,
        options: []
    });

    useEffect(() => {
        if (id) {
            const fetchedProduct = getProductsById(id);
            if (fetchedProduct) {
                setProduct(fetchedProduct);
            }
        }
    }, [id, getProductsById]);

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
                                <img src={window.location.origin + '/images/placeholders/rating.png'} alt="rating" />
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
                            index % 2 === 0 &&
                            <tr key={index}>
                                <td className="spec-name">{spec.name}</td>
                                <td>{spec.value}</td>
                                {product.specs[index + 1] &&
                                    <>
                                        <td className="spec-name">{product.specs[index + 1].name}</td>
                                        <td>{product.specs[index + 1].value}</td>
                                    </>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <br />

            <div className="reviews">
                <h3>Reviews ({product.reviews && product.reviews.length})</h3>

                {product.reviews && product.reviews.map((review, index) => (
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
                                <img src={window.location.origin + '/images/placeholders/rating.png'} alt="rating" />
                                <p>{review.rating}</p>
                            </div>
                            <p className="review-date">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                    </div>
                ))}

            </div>

            <br />
        </div>
    );
}

export default Product;
