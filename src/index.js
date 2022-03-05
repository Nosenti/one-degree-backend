import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import cors from "cors"


import router from './routes/index.js';
import connectDB from './config/db.js';

import 'dotenv/config.js';
import { handshake, userConnection } from './libs/chat.js';
import initEmitter from "./utils/emitEvent.js"

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

connectDB()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

app.use('/api', router)

app.listen(PORT, () => {
    console.log('Server has started at port', PORT);
});


//chat handler
io.use(handshake).on("connection", userConnection);

initEmitter()

export default app;