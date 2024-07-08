import { Message } from "../models/messageModel.js";
import User from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
    try {
        const user = await User.findAll()
        res.status(200).send(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getUserByLogin = async (req, res) => {
    try {
        const { login } = req.params;
        const user = await User.findOne({ where: { login: login } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserWithMessage = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findByPk(id, {
            include: [
                { model: Message, as: 'SentMessages' },
                { model: Message, as: 'ReceivedMessages' }
            ]
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { login, password } = req.body
        const findUser = await User.findOne({ where: { login: login, password: password } })

        if (!findUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.send(findUser)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const registerUser = async (req, res) => {
    try {
        const { login, password, userName } = req.body
        const findUser = await User.findOne({ where: { login: login } })
        if (findUser) {
            return res.status(404).json({ error: 'User already exists' });
        }
        console.log(req.file.filename);
        const newUser = User.create({
            login: login,
            password: password,
            userName: userName,
            image:req.file?.filename,
        })

        res.status(newUser).json(newUser)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}