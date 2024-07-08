import { Op } from "sequelize";
import { emitMessage } from "../../index.js";
import sequelize from "../config/db.js";
import { Message } from "../models/messageModel.js";

export const getAllMessages = async (req, res) => {
    try {
        const [message, metadata] = await sequelize.query(`
            select 
	            messages.id AS messageID,
                messages.messageText,
                messages.created_at,
                sender.id AS senderID,
                sender.login AS senderName,
                receiver.id AS receiverID,
                receiver.login AS receiverName
            from admin_erp.messages
                join admin_erp.user sender on admin_erp.messages.senderID = sender.id
                join admin_erp.user receiver on admin_erp.messages.receiverID = receiver.id;
`)
        res.status(200).send(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const addMessage = async (req, res) => {
    try {
        const { senderID, receiverID, messageText } = req.body

        if (!senderID || !receiverID || !messageText) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const message = await Message.create({
            senderID,
            receiverID,
            messageText
        })

        emitMessage(message)

        res.send(message)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params

        const deleted = await Message.destroy({ where: { id } })

        res.send("Message Deleted")
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
