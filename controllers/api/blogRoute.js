// dependencies
const router = require('express').Router();
const { Blog } = require('../../models');
const { withAuth } = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    console.log(req.body);
 try {
    const newBlog = await Blog.create({
        title: req.body.name,
        description: req.body.description,
        user_id: req.session.user_id,
    }); 
    console.log(newBlog);
    res.status(200).json(newBlog);
} catch (err) {
    console.log(err);
    res.status(400).json(err);
} 
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updateBlog = await Blog.update(req.params.id, {
            where: {
            id: req.params.id,
            user_id: req.session.user_id,
            }
        });

        res.status(200).json(updateBlog);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    try {
       const blogData = await Blog.destroy({
        where: {
        id: req.params.id,
        user_id: req.session.user_id,
        }

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