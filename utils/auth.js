module.exports = {
    withAuth: (req, res, next) => {
        if(!req.sessions.logged_in){
            res.redirect('/login');
         }else {
             next();
         }
    }
};

//middleware to handle authorization