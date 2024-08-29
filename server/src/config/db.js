import dotenv from "dotenv"
import { Sequelize } from "sequelize"
dotenv.config()

const sequelize = new Sequelize({
    host: "localhost",
    username: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "admin_erp",
    dialect: "mysql",
    logging: false
})

export default sequelize