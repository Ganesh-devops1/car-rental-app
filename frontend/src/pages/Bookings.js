import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../api';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/bookings`).then(res => setBookings(res.data));
  }, []);

  return (
    <div className="container mt-5 pt-5">
      <h2 className="text-center text-warning mb-4">🧾 All Bookings</h2>
      <table className="table table-dark table-striped text-center">
        <thead>
          <tr>
            <th>ID</th><th>User</th><th>Car</th><th>From</th><th>To</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id}>
              <td>{b.id}</td><td>{b.user}</td><td>{b.car}</td><td>{b.fromDate}</td><td>{b.toDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
