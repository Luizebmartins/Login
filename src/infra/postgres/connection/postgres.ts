import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
    username: 'admin',
    password: 'admin',
    database: 'postgres',
    dialect: 'postgres',
    host: '172.17.0.3',
    port: 5432,
    logging: false
});


module.exports = {
    sequelize
}