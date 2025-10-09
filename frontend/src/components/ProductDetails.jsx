import React, { useState, useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import './ProductDetails.css';

const ProductDetails = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const { token } = useContext(StoreContext);

  if (!product || !product.images || product.images.length === 0) {
    return <div>No product data available</div>;
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className='product-details-container'>
      <div className='product-details'>
        <div className='product-images'>
          <div className='main-image-container'>
            <img
              src={`http://localhost:4000/images/${product.images[currentImageIndex]}`}
              alt={product.name}
              className='main-image'
            />

            {product.images.length > 1 && (
              <>
                <button className='nav-btn prev-btn' onClick={prevImage}>
                  &#8249;
                </button>
                <button className='nav-btn next-btn' onClick={nextImage}>
                  &#8250;
                </button>
              </>
            )}
          </div>

          {product.images.length > 1 && (
            <div className='thumbnail-container'>
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:4000/images/${image}`}
                  alt={`${product.name} ${index + 1}`}
                  className={`thumbnail ${
                    index === currentImageIndex ? 'active' : ''
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className='product-info'>
          <h2>{product.name}</h2>
          <p className='description'>{product.description}</p>

          {/* Price Section with Discount */}
          <div className='price-section'>
            {product.discount > 0 ? (
              <>
                <span className='discounted-price'>
                  ${Math.round(product.price * (1 - product.discount / 100))}
                </span>
                <span className='original-price'>${product.price}</span>
                <span className='discount-badge'>{product.discount}% OFF</span>
              </>
            ) : (
              <span className='current-price'>${product.price}</span>
            )}
          </div>

          <p className='category'>Category: {product.category}</p>
          <p className='stock'>Stock: {product.stock}</p>

          {/* Add Review Button - Only visible if user is logged in */}
          {token && (
            <div className='review-actions'>
              <button
                className='add-review-btn'
                onClick={() => setShowWriteReview(!showWriteReview)}>
                {showWriteReview ? 'Cancel Review' : 'Write a Review'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Write Review Section - Only shows when button is clicked and user is logged in */}
      {token && showWriteReview && (
        <div className='write-review-section'>
          <h3>Write Your Review</h3>
          <form className='review-form'>
            <div className='rating-input'>
              <label>Your Rating:</label>
              <div className='star-rating'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className='star-input'>
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className='comment-input'>
              <label>Your Review:</label>
              <textarea
                placeholder='Share your experience with this product...'
                rows='5'
                maxLength='500'
                required
              />
            </div>

            <div className='form-actions'>
              <button type='submit' className='submit-review-btn'>
                Submit Review
              </button>
              <button
                type='button'
                onClick={() => setShowWriteReview(false)}
                className='cancel-review-btn'>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
