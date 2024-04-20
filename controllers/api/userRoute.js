//dependencies
const router = require('express').Router();
const { User } = require('../../models');
// All of these routes are PREFIXED with '/api/users'
router.post('/signup', async (req, res) => {
   console.log("Incoming Data: ", req.body);
   try {
   const newUser = await User.create(req.body);
   console.log("New User: ", newUser);
   req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json(newUser);
   })
} catch (err) {
   console.log("NewUser error",err);
   res.status(400).json(err);
}
});

router.post('/login', async (req, res) => {
   console.log("Req Obj Data: ", req.body);
  try {
   const userData = await User.findOne({ where: {email: req.body.email}});
   const validPassword = await User.findOne({ where: {password: req.body.password}});

//   if (!userData) {
//    res.json({ message: 'Invalid email or password' });
//   }

//   const validPassword = await User.findOne({ where: {password: req.body.password}});

// if (!validPassword) {
//    res.json({ message: 'Invalid email or password'});
// }

if (!userData && !validPassword) {
   res.json({ message: 'Invalid email or password' });
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

router.post('/logout', async (req,res) => {
   if(req.session.logged_in){
      req.session.destroy(() => {
         res.status(204).end();
      })
   } else {
      res.status(404).end();
   }
});

module.exports = router;

