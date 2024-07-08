import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: 'ID'
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image:{
        type:DataTypes.STRING,
        defaultValue:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYNdmRpP34_YSuudNGwkNDUOYnLkK-bOxyQw&s"
    },
    joinDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    isOnline: {
        type: DataTypes.TINYINT,
        defaultValue: "0"
    }
},
{
    tableName:"user",
    timestamps:false
})

export default User