const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
   try {
   const newUser = User.create(req.body);
   
   req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json(newUser);
   })
} catch (err) {
   res.status(400).json(err);
}
});

router.post('/login', withAuth, async (req, res) => {
  try {
   const userData = await User.findOne({ where: {email: req.body.email}});

  if (!userData) {
   res.json({ message: 'Invalid email or password' });
  }

  const validPassword = await User.findOne({ where: {password: req.body.password}});

if (!validPassword) {
   res.json({ message: 'Invalid email or password'});
}

req.session.save(() => {
   req.session.user_id = userData.id;
   req.session.logged_in = true;

   res.status(200).json({ 
      user: userData,
      message: 'you are logged in'})
})
} catch (err) {
  res.status(400).json(err); 
}

});

router.post('/logout', withAuth, async (req,res) => {
   if(req.session.logged_in){
      req.session.destroy(() => {
         res.status(204).end();
      })
   } else {
      res.status(404).end();
   }
});

module.exports = router;

