//dependencies
const router = require('express').Router();
const { Blog, User } = require('../models');
const { withAuth } = require('../utils/auth');

//homepage
router.get('/', async (req, res) => {
try {
    const blogData = await Blog.findAll({
        include: [{ model: User, attributes: ['name'] }]
    })

const blogs = blogData.map((blog) => blog.get({ plain: true }));
console.log('homepage', blogs) 
res.render('homepage', { 
    blogs,
    loged_in: req.session.logged_in  });
    console.log('homepage', blogs) 

} catch (err) {
    res.status(400).json(err);
    console.err(err);
}
});

router.get('/blog/:id', async (req, res) => {
    try{
    const blogById = await Blog.findByPk(req.params.id, {
       include: [{ model: User, attributes: ['name'], },],
    });

    const blog = blogById.get({ plain: true });
    
    res.render('blog', {
        ...blog,
        logged_in: req.session.logged_in
     });

} catch (err) { res.status(500).json(err) }
})

router.get('/profile', withAuth, async (req, res) => {
    try {
    const profileOfId = await User.findByPk(req.session.user_id, {
       attributes: [ { exclude: 'password' }],
       include: [{ model: Blog }],
    })

    const profile = profileOfId.get({ plain: true });

    res.render('profile', {
        ...profile,
        logged_in: true,
    });

} catch (err) {res.status(400).json(err) }
})

  // If the user is already logged in, redirecting the request to another route
router.get('/login', async (req, res) => {
 if(req.session.logged_in){
     res.redirect('/profile');
    return;
 }
res.render('login');
});

module.exports = router;

