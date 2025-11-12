const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// JSON data storage
const carsFile = path.join(__dirname, 'data/cars.json');
const usersFile = path.join(__dirname, 'data/users.json');
const bookingsFile = path.join(__dirname, 'data/bookings.json');

// Helper function to read JSON
const readData = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const writeData = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

// ----------- ROUTES -----------

// Home Dashboard
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Users API + UI
app.get('/api/users', (req, res) => {
  const users = readData(usersFile);
  if (req.query.view === 'html') {
    res.send(`
      <html><body style="background:linear-gradient(45deg,#000,#222);color:#fff;font-family:Poppins;text-align:center">
      <h2>👤 Registered Users</h2>
      <table border="1" cellpadding="10" style="margin:auto;color:#fff;border-collapse:collapse">
      <tr><th>ID</th><th>Name</th><th>Email</th></tr>
      ${users.map(u => `<tr><td>${u.id}</td><td>${u.name}</td><td>${u.email}</td></tr>`).join('')}
      </table><br><a href="/">🏠 Home</a>
      </body></html>
    `);
  } else {
    res.json(users);
  }
});

app.post('/api/users/register', (req, res) => {
  const users = readData(usersFile);
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  writeData(usersFile, users);
  res.json(newUser);
});

// Cars API + UI
app.get('/api/cars', (req, res) => {
  const cars = readData(carsFile);
  if (req.query.view === 'html') {
    res.send(`
      <html><body style="background:url('https://images.unsplash.com/photo-1502877338535-766e1452684a') center/cover no-repeat;height:100vh;color:white;text-align:center;font-family:Poppins;">
      <h2>🚗 Available Cars</h2>
      <table border="1" cellpadding="10" style="margin:auto;background:rgba(0,0,0,0.6);color:white;border-collapse:collapse">
      <tr><th>ID</th><th>Name</th><th>Model</th><th>Price/Day</th><th>Available</th></tr>
      ${cars.map(c => `<tr><td>${c.id}</td><td>${c.name}</td><td>${c.model}</td><td>₹${c.price_per_day}</td><td>${c.available ? '✅' : '❌'}</td></tr>`).join('')}
      </table><br><a href="/">🏠 Back Home</a>
      </body></html>
    `);
  } else {
    res.json(cars);
  }
});

app.post('/api/cars', (req, res) => {
  const cars = readData(carsFile);
  const newCar = { id: cars.length + 1, ...req.body };
  cars.push(newCar);
  writeData(carsFile, cars);
  res.json(newCar);
});

// Bookings API + UI
app.get('/api/bookings', (req, res) => {
  const bookings = readData(bookingsFile);
  if (req.query.view === 'html') {
    res.send(`
      <html><body style="background:url('https://images.unsplash.com/photo-1503376780353-7e6692767b70') center/cover no-repeat;height:100vh;color:white;text-align:center;font-family:Poppins;">
      <h2>🧾 All Bookings</h2>
      <table border="1" cellpadding="10" style="margin:auto;background:rgba(0,0,0,0.6);color:white;border-collapse:collapse">
      <tr><th>ID</th><th>User</th><th>Car</th><th>From</th><th>To</th></tr>
      ${bookings.map(b => `<tr><td>${b.id}</td><td>${b.user}</td><td>${b.car}</td><td>${b.fromDate}</td><td>${b.toDate}</td></tr>`).join('')}
      </table><br><a href="/">🏠 Back Home</a>
      </body></html>
    `);
  } else {
    res.json(bookings);
  }
});

app.post('/api/bookings', (req, res) => {
  const bookings = readData(bookingsFile);
  const newBooking = { id: bookings.length + 1, ...req.body };
  bookings.push(newBooking);
  writeData(bookingsFile, bookings);
  res.json(newBooking);
});

// Run Server
app.listen(5000, () => console.log('✅ Car Rental Backend + UI running on port 5000'));
