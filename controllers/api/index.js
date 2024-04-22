const router = require('express').Router();
// routes holding for blog and user
const blogRoute = require('./blogRoute');
const userRoute = require('./userRoute');
// all of these routes are PREFIXED with '/api'
router.use('/blogs', blogRoute);
router.use('/profile', userRoute);
router.use('/users', userRoute);

module.exports = router;

