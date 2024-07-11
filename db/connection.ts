import { Sequelize } from "sequelize";

const db = new Sequelize(
    process.env.NAME_DB as string,
    process.env.USER_DB as string,
    process.env.PASS_DB as string,
    {
        host: process.env.HOST_DB,
        dialect: process.env.DIALECT_DB as 'mysql',
    });

export default db;