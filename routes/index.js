const express = require('express');
const router = express.Router();

router.use('/api-docs', require('./swagger'));
router.use('/todo', require('./todo'));
router.use('/user', require('./user'))


module.exports = router;