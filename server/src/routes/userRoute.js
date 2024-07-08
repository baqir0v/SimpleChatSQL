import express from "express"
import { getAllUsers, getUserByLogin, getUserWithMessage, loginUser, registerUser } from "../controllers/userController.js"
import upload from "../middlewares/multer.js"

const userRouter = express.Router()

userRouter.get("/",getAllUsers)
userRouter.get("/:id",getUserWithMessage)
userRouter.post("/login",loginUser)
userRouter.post("/register",upload.single("image"),registerUser)
userRouter.get('/login/:login', getUserByLogin);


export default userRouter