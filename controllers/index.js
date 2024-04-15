const router = require('express').Router();
// routes holding for ap and home
const homeRoute = require('./homeRoute');
const apiRoute = require('./api');

router.use('/', homeRoute);
router.use('/api', apiRoute);

module.exports = router;