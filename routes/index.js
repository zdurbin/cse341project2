const express = require('express');
const router = express.Router();

router.use('/api-docs', require('./swagger'));
router.use('/todo', require('./todo'));
router.use('/user', require('./user'));
router.use('/group', require('./group'));
router.use('company', reqire('./company'));


module.exports = router;