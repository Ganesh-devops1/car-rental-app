const fs = require('fs');
const path = require('path');
const carsFile = path.join(__dirname, '../data/cars.json');

exports.getCars = (req, res) => {
  const cars = JSON.parse(fs.readFileSync(carsFile, 'utf8'));
  res.json(cars);
};

exports.addCar = (req, res) => {
  const cars = JSON.parse(fs.readFileSync(carsFile, 'utf8'));
  const newCar = req.body;
  newCar.id = cars.length + 1;
  cars.push(newCar);
  fs.writeFileSync(carsFile, JSON.stringify(cars, null, 2));
  res.status(201).json(newCar);
};

exports.deleteCar = (req, res) => {
  let cars = JSON.parse(fs.readFileSync(carsFile, 'utf8'));
  const carId = parseInt(req.params.id);
  cars = cars.filter((car) => car.id !== carId);
  fs.writeFileSync(carsFile, JSON.stringify(cars, null, 2));
  res.json({ message: `Car ${carId} deleted` });
};
