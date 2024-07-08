import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './src/routes/userRoute.js';
import messageRouter from './src/routes/messageRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/public", express.static(path.join(__dirname, 'src/public')));
app.use('/api/users', userRouter);
app.use('/api/messages', messageRouter);

export const emitMessage = (message) => {
    io.emit('newMessage', message);
};

server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
