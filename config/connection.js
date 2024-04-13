const Sequelize = require('sequelize');
require('dotenv').config();
// requires .env for process Sequelize
let sequelize;

if (process.env.DB_URL){
    sequelize = new Sequelize(process.env.DB_URL)}
    else { 
        sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'postgres',
        }
        )
     }


module.exports = Sequelize;     
