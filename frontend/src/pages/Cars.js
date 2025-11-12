import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../api';
import { useNavigate } from 'react-router-dom';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  // Fetch car list from backend
  useEffect(() => {
    axios.get(`${API_URL}/api/cars`)
      .then(res => setCars(res.data))
      .catch(err => console.error('Error fetching cars:', err));
  }, []);

  // Navigate to booking page with selected car
  const handleBook = (carName) => {
    navigate('/bookcar', { state: { selectedCar: carName } });
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1503736334956-4c8f8e92946d')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '90px',
        color: 'white'
      }}
    >
      <div className="container">
        <h2 className="text-center text-warning mb-5 fw-bold" style={{ fontSize: '2rem' }}>
          🚗 Available Cars
        </h2>

        <div className="row justify-content-center">
          {cars.map((car) => (
            <div
              className="col-md-4 mb-4"
              key={car.id}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div
                className="card shadow-lg border-0"
                style={{
                  width: '100%',
                  maxWidth: '340px',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                  backgroundColor: 'rgba(255,255,255,0.95)'
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {/* Car Image */}
                <img
                  src={car.image || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70'}
                  className="card-img-top"
                  alt={car.name}
                  height="200"
                  style={{ objectFit: 'cover' }}
                />

                {/* Car Info */}
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold mb-2">{car.name}</h5>
                  <p className="card-text mb-1">Model: {car.model}</p>
                  <p className="card-text text-warning fw-bold mb-1">
                    ₹{car.price_per_day}/day
                  </p>
                  <p className="card-text">
                    {car.available ? '✅ Available' : '❌ Booked'}
                  </p>

                  {/* Book Now Button */}
                  {car.available && (
                    <button
                      onClick={() => handleBook(car.name)}
                      className="btn btn-warning btn-sm fw-bold"
                      style={{
                        borderRadius: '8px',
                        padding: '8px 18px',
                        transition: 'background-color 0.3s ease'
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = '#f5b800')}
                      onMouseOut={(e) => (e.target.style.backgroundColor = '#ffc107')}
                    >
                      🧾 Book Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;
