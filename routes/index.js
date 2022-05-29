const express = require('express');
const router = express.Router();

router.use('/api-docs', require('./swagger'));
router.use('/todo', require('./todo'));


module.exports = router;