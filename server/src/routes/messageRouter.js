import express from "express"
import { addMessage, deleteMessage, getAllMessages } from "../controllers/messageController.js"

const messageRouter = express.Router()

messageRouter.get("/",getAllMessages)
messageRouter.post("/",addMessage)
messageRouter.delete("/:id",deleteMessage)

export default messageRouter