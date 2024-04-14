const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/blog', withAuth, async (req, res) => {
 try {
    const newBlog = await Blog.create({
        ...req.body,
        user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
} catch (err) {
    res.status(400).json(err);
}
});

router.delete('/blog/:id', withAuth, async (req, res) => {
    try {
       const blogData = await Blog.destroy({
        where: req.params.id,
        user_id: req.session.user_id,
       });
       if (!blogData) {
        res.status(404).json({ message: 'No blog found with this id!' })
       }
       res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;