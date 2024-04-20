module.exports = {
    withAuth: (req, res, next) => {
        if(req.originalUrl === '/login'){
            next();
            return;
        }
        if(!req.session.logged_in){
            res.redirect('/login');
         }else {
             next();
         }
    }
};

//middleware to handle authorization