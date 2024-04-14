const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils');

router.get('/', async (req, res) => {
try {
    const blogData = await Blog.findAll({
        include: [{ model: User, attributes: ['name'] }]
    })

const blogs = blogData.map((blog) => blog.get({ plain: true }));

res.render('main', { 
    blogs,
    loged_in: req.session.logged_in  });

} catch (err) {
    res.status(400).json(err);
}
});

