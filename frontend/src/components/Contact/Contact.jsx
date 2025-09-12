import React, { useState, useContext } from 'react';
import './Contact.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Contact = () => {
  const { url } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/contact/submit`, formData);
      if (response.data.success) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='contact-container' id='contact'>
      <div className='contact-left'>
        <h2>Get in Touch</h2>
        <p>We'd love to hear from you! Send us a message.</p>

        <div className='contact-info'>
          <div className='contact-item'>
            <img src={assets.location} alt='location' />
            <div>
              <h3>Address</h3>
              <p>
                S.B enterprises, 614 Bhovapur kaushambi ghaziabad Uttar Pradesh
                201010
              </p>
            </div>
          </div>

          <div className='contact-item'>
            <img src={assets.mobile} alt='phone' />
            <div>
              <h3>Phone</h3>
              <p>+919212324909</p>
            </div>
          </div>

          <div className='contact-item'>
            <img src={assets.email} alt='email' />
            <div>
              <h3>Email</h3>
              <p>driinkOxygen@gmail.com</p>
            </div>
          </div>
        </div>

        <div className='social-links'>
          <a href='https://www.facebook.com/share/19n8wgqTLe/'>
            <img src={assets.facebook} alt='Facebook' />
          </a>
          <a href='https://www.instagram.com/driinkoxygenalkalinewater?utm_source=qr&igsh=cDBiYTAxYnQzeHlz'>
            <img src={assets.instagram} alt='Instagram' />
          </a>
          <a href='#'>
            <img src={assets.twitter} alt='Twitter' />
          </a>
        </div>
      </div>

      <div className='contact-right'>
        <form onSubmit={handleSubmit}>
          <div className='form-row'>
            <input
              type='text'
              placeholder='Your Name'
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              type='email'
              placeholder='Your Email'
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <input
            type='text'
            placeholder='Subject'
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            required
          />
          <textarea
            placeholder='Your Message'
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required></textarea>
          <button type='submit'>Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
