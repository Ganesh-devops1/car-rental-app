import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div className="container">
      <Link className="navbar-brand fw-bold text-warning" to="/">🚗 CarRental</Link>
      <div>
        <Link className="nav-link d-inline text-light" to="/cars">Cars</Link>
        <Link className="nav-link d-inline text-light" to="/bookcar">Book Car</Link>
        <Link className="nav-link d-inline text-light" to="/bookings">Bookings</Link>
        <Link className="nav-link d-inline text-light" to="/register">Register</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
