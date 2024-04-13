//dependencies
const sequelize = require('../config/connection');
const { Blog, User } = require('../models');
  
const blogData = require('./blogData.json');
const userData = require('./userData.json');
// function to create users and blogs 
const seedDatabase = async () => {
   await sequelize.sync({ force: true });
  
   const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
   });

   for (const blog of blogData){
   await Blog.create( {
   ...blog,
   user_id: Math.floor(Math.random()*users.length).id
   })
   }
   process.exit(0);

}
//init
seedDatabase();