const Blog = require('./blog');
const User = require('./user');

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Blog.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { Blog, User };