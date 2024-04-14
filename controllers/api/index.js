const router = require('express').Router();

const blogRoute = require('./blogRoute');
const profileRoute = require('./profileRoute');

router.use('/blog', blogRoute);
router.use('./profile', profileRoute);

module.exports = router;

