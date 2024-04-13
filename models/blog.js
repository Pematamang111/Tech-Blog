const { Model, DataTypes } = require('sequilize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Blog extends Model {};

Blog.init ({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncreament: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_created: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: DataTypes.NOW,

    },
    user_id : {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        }
    }
},
{
   sequelize,
   timestamps: false,
   freezeTableName: true,
   underscored: true,
   modelName: 'blog',
}
)

module.exports = Blog;