const router = require('express').Router();

const blogRoute = require('./blogRoute');
const userRoute = require('./userRoute');

router.use('/blog', blogRoute);
router.use('./profile', userRoute);

module.exports = router;

