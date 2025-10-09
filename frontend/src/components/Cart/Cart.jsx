import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { food_list, cartItems, addToCart, removeFromCart } =
    useContext(StoreContext);
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [productImages, setProductImages] = useState([]);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const foundProduct = food_list.find((item) => item._id === id);
    if (foundProduct) {
      setProduct(foundProduct);

      // Only use the main product image or all uploaded images
      const images =
        foundProduct.images && foundProduct.images.length > 0
          ? foundProduct.images
          : [foundProduct.image];

      setProductImages(images);
      setMainImage(images[0]);
    }
  }, [id, food_list]);

  if (!product) {
    return (
      <div className='product-details-loading'>
        <div className='loading-spinner'></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const currentQuantity = cartItems[product._id] || 0;
  const remainingStock = product.stock - currentQuantity;
  const discount = product.discount || 30; // Default to 30% if not specified
  const discountedPrice = Math.round((product.price * (100 - discount)) / 100);
  const savings = product.price - discountedPrice;

  const handleAddToCart = () => {
    if (!isOutOfStock && remainingStock > 0) {
      addToCart(product._id);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleBuyNow = () => {
    if (!isOutOfStock && remainingStock > 0) {
      addToCart(product._id);
      navigate('/cart');
    }
  };

  return (
    <div className='product-details'>
      <div className='product-details-container'>
        {/* Breadcrumb */}
        <div className='breadcrumb'>
          <span onClick={() => navigate('/')} className='breadcrumb-link'>
            Home
          </span>
          <span className='breadcrumb-separator'> / </span>
          <span
            onClick={() => navigate('/#explore-menu')}
            className='breadcrumb-link'>
            Menu
          </span>
          <span className='breadcrumb-separator'> / </span>
          <span className='breadcrumb-current'>
            {product.name.replace(/\s*\([^)]*\)$/, '')}
          </span>
        </div>

        <div className='product-details-content'>
          {/* Product Images */}
          <div className='product-images'>
            <div className='main-image-container'>
              <img
                src={mainImage}
                alt={product.name}
                className={`main-product-image ${isZoomed ? 'zoomed' : ''}`}
                onClick={() => setIsZoomed(!isZoomed)}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400';
                }}
              />
              <div className='discount-badge-large'>{discount}% OFF</div>
              <div className='zoom-indicator'>🔍 Click to zoom</div>
            </div>

            {/* Thumbnail images */}
            <div className='thumbnail-images'>
              {productImages.map((image, index) => (
                <div key={index} className='thumbnail-container'>
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className={`thumbnail ${
                      mainImage === image ? 'active' : ''
                    }`}
                    onClick={() => setMainImage(image)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/80';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className='product-info'>
            <h1 className='product-title'>
              {product.name.replace(/\s*\([^)]*\)$/, '')}
            </h1>

            {/* Rating */}
            <div className='product-rating'>
              <div className='stars'>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className='star'>
                    ★
                  </span>
                ))}
              </div>
              <span className='rating-text'>(4.8/5) 120 Reviews</span>
            </div>

            {/* Price */}
            <div className='product-pricing'>
              <div className='price-container'>
                <span className='current-price'>₹{discountedPrice}</span>
                <span className='original-price'>₹{product.price}</span>
                <span className='savings'>
                  You Save ₹{savings} ({discount}%)
                </span>
              </div>
              <div className='unit-info'>
                {product.name.includes('kg')
                  ? 'Per Kg'
                  : product.name.includes('ltr')
                  ? 'Per Ltr'
                  : 'Per Pack (6 Pcs)'}
              </div>
            </div>

            {/* Stock Status */}
            <div
              className={`stock-status ${isOutOfStock ? 'out-of-stock' : ''}`}>
              {isOutOfStock ? (
                <span className='stock-text'>❌ Out of Stock</span>
              ) : (
                <span className='stock-text'>
                  ✅ In Stock ({remainingStock} available)
                </span>
              )}
            </div>

            {/* Product Description */}
            <div className='product-description'>
              <h3>About this product</h3>
              <p>{product.description}</p>
              <div className='product-features'>
                <div className='feature'>
                  <span className='feature-icon'>🌱</span>
                  <span>100% Natural & Fresh</span>
                </div>
                <div className='feature'>
                  <span className='feature-icon'>🚚</span>
                  <span>Fast Delivery</span>
                </div>
                <div className='feature'>
                  <span className='feature-icon'>💯</span>
                  <span>Quality Guaranteed</span>
                </div>
                <div className='feature'>
                  <span className='feature-icon'>❄️</span>
                  <span>Fresh & Hygienic</span>
                </div>
              </div>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className='product-actions'>
              {!cartItems[product._id] ? (
                <div className='action-buttons'>
                  <button
                    className={`add-to-cart-btn ${
                      isOutOfStock ? 'disabled' : ''
                    }`}
                    onClick={handleAddToCart}
                    disabled={isOutOfStock || remainingStock <= 0}>
                    <span>🛒</span>
                    Add to Cart
                  </button>
                  <button
                    className={`buy-now-btn ${isOutOfStock ? 'disabled' : ''}`}
                    onClick={handleBuyNow}
                    disabled={isOutOfStock || remainingStock <= 0}>
                    Buy Now
                  </button>
                </div>
              ) : (
                <div className='quantity-controls-large'>
                  <button
                    className='quantity-btn decrease'
                    onClick={() => removeFromCart(product._id)}>
                    <img src={assets.remove_icon_red} alt='-' />
                  </button>
                  <span className='quantity-display'>
                    {cartItems[product._id]}
                  </span>
                  <button
                    className={`quantity-btn increase ${
                      remainingStock <= 0 ? 'disabled' : ''
                    }`}
                    onClick={() =>
                      remainingStock > 0 && addToCart(product._id)
                    }>
                    <img src={assets.add_icon_green} alt='+' />
                  </button>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className='additional-info'>
              <div className='info-item'>
                <strong>Category:</strong> {product.category}
              </div>
              <div className='info-item'>
                <strong>Delivery:</strong> Free delivery on orders above ₹500
              </div>
              <div className='info-item'>
                <strong>Return Policy:</strong> 24-hour return policy
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className='related-products'>
          <h2>You might also like</h2>
          <div className='related-products-grid'>
            {food_list
              .filter(
                (item) =>
                  item.category === product.category && item._id !== product._id
              )
              .slice(0, 4)
              .map((item) => {
                const itemDiscountedPrice = Math.round(
                  (item.price * (100 - (item.discount || 30))) / 100
                );
                return (
                  <div
                    key={item._id}
                    className='related-product-card'
                    onClick={() => navigate(`/product/${item._id}`)}>
                    <img src={item.image} alt={item.name} />
                    <h4>{item.name.replace(/\s*\([^)]*\)$/, '')}</h4>
                    <div className='related-product-price'>
                      <span className='current'>₹{itemDiscountedPrice}</span>
                      <span className='original'>₹{item.price}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
