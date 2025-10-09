import React, { useState } from 'react';
import './Add.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]); // Changed to handle multiple images
  const [unit, setUnit] = useState('/pc');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0); // Add stock state
  const [discount, setDiscount] = useState(0); // Changed from 30 to 0 as default

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name + ` (${unit})`);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('stock', stock); // Add stock to form data
    formData.append('discount', discount); // Add discount to form data

    // Append multiple images
    images.forEach((image) => {
      formData.append('images', image);
    });

    // Debug: Log all form data
    console.log('Form data entries:');
    for (let [key, value] of formData.entries()) {
      console.log(key, ':', value instanceof File ? value.name : value);
    }

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        toast.success('Food item added successfully');
        setName('');
        setPrice('');
        setCategory('');
        setImages([]);
        setUnit('');
        setDescription('');
        setStock(0); // Reset stock
        setDiscount(0); // Reset discount to 0 instead of 30%
      } else {
        toast.error('Failed to add food item');
      }
    } catch (error) {
      console.error('Error adding food:', error);
      toast.error('Error adding food item');
    }
  };

  return (
    <div className='add'>
      <h2>Add New Food Item</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Name:</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder='Enter food item description'
            rows='3'
          />
        </div>

        <div className='form-group'>
          <label>Price:</label>
          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        {/* Unit selection field */}
        <div className='form-group'>
          <label>Unit</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required>
            <option value='/pc'>/Pcs</option>
            <option value='/kg'>/Kg</option>
            <option value='/ltr'>/Ltr</option>
          </select>
        </div>

        <div className='form-group'>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required>
            <option value=''>Select Category</option>
            <option value='Green Tea'>Green Tea</option>
            <option value='Teabags'>Teabags</option>
            <option value='Resin'>Resin</option>
            <option value='Dryfruits'>Dryfruits</option>
            <option value='Grocery'>Grocery</option>
            {/* <option value='Transportation'>Transportation</option>
            <option value='Packing & Forwarding'>Packing & Forwarding</option> */}
          </select>
        </div>

        <div className='form-group'>
          <label>Stock:</label>
          <input
            type='number'
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            min='0'
            required
          />
        </div>

        <div className='form-group'>
          <label>Discount (%):</label>
          <input
            type='number'
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            min='0'
            max='100'
            placeholder='Enter discount percentage'
          />
        </div>

        <div className='add-img-upload flex-col'>
          <label htmlFor='images'>
            <p>Upload Images (PNG, JPG, JPEG, WEBP, GIF)</p>
          </label>
          <input
            onChange={(e) => setImages(Array.from(e.target.files))}
            type='file'
            id='images'
            multiple
            accept='image/png,image/jpg,image/jpeg,image/webp,image/gif'
            hidden
            required
          />

          {/* Image Preview */}
          {images.length > 0 && (
            <div className='image-preview'>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  style={{
                    width: '100px',
                    height: '100px',
                    margin: '5px',
                    objectFit: 'cover',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <button type='submit' className='submit-btn'>
          Add Food Item
        </button>
      </form>
    </div>
  );
};

export default Add;
