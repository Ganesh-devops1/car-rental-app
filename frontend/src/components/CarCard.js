import React from 'react';

const CarCard = ({ car }) => {
  const img = car.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70";
  return (
    <div className="card shadow-lg mb-4" style={{ borderRadius: '15px' }}>
      <img
        src={img}
        className="card-img-top"
        alt={car.name}
        height="220"
        style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px', objectFit: 'cover' }}
      />
      <div className="card-body text-center">
        <h5 className="card-title fw-bold">{car.name}</h5>
        <p className="card-text mb-1">Model: {car.model}</p>
        <p className="card-text mb-1 text-warning fw-bold">₹{car.price_per_day}/day</p>
        <p>{car.available ? "✅ Available" : "❌ Booked"}</p>
      </div>
    </div>
  );
};

export default CarCard;
