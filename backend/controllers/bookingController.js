let bookings = [];

exports.createBooking = (req, res) => {
  const { user, car, fromDate, toDate } = req.body;
  const booking = { id: bookings.length + 1, user, car, fromDate, toDate };
  bookings.push(booking);
  res.status(201).json(booking);
};

exports.getBookings = (req, res) => {
  res.json(bookings);
};
