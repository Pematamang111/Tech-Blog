const router = require('express').Router();
// routes holding for blog and user
const blogRoute = require('./blogRoute');
const userRoute = require('./userRoute');

router.use('/blog', blogRoute);
router.use('./profile', userRoute);

module.exports = router;

