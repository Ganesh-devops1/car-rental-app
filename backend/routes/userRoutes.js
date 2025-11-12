const express = require('express');
const { register, getUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/register', register);
router.get('/', getUsers);

module.exports = router;
