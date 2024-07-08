import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./userModel.js";

const Message = sequelize.define("Message", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    senderID: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    receiverID: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    messageText: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
}, {
    tableName: 'messages',
    timestamps: false
});

User.hasMany(Message, { as: 'SentMessages', foreignKey: 'senderID' });
User.hasMany(Message, { as: 'ReceivedMessages', foreignKey: 'receiverID' });

Message.belongsTo(User, { as: 'Sender', foreignKey: 'senderID' });
Message.belongsTo(User, { as: 'Receiver', foreignKey: 'receiverID' });

export { User, Message };