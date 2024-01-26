import express, { Express, Request, Response, json } from "express";
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import mongoose from "mongoose";
import router from './routes/index';

interface User {
    id: string;
    email: string;
}

let users = new Map<string, Array<User>>();
let socketToRoom = new Map<string, string>();
const maximum = process.env.MAXIMUM || 5;

users.set("1234", [{ id: "fictional", email: "fictional@email" }])

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use('/', router());
const port = process.env.PORT || 4000;

app.use(cors({
    credentials: true,
    origin: '*'
}));
  
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

//simmulation of a signaling server for a P2P application 

//client joins a room with other users so it can then make an offer and establish a WebRTC connection with other clients

io.on("connection", (socket: Socket) => {
    console.log("User joined");
    socket.on("join_room", (data) => {
        if (users.get(data.room)) {
            const length = users.get(data.room)!.length;
            if (length === maximum) {
                socket.to(socket.id).emit("room_full");
                return;
            }
            const user = { id: socket.id, email: data.email };
            users.get(data.room)!.push(user);
            console.log("Modified array of users", users.get(data.room)!)
        } else {
            users.set(data.room, [{ id: socket.id, email: data.email }]);
        }
        socketToRoom.set(socket.id, data.room);

        socket.join(data.room);
        console.log(`[${socketToRoom.get(socket.id)}]: ${socket.id} enter`);

        const usersInThisRoom = users.get(data.room)!.filter(
            user => user.id !== socket.id
        );

        console.log(usersInThisRoom);


        socket.emit("all_users", {users: usersInThisRoom});
        // io.sockets.to(socket.id).emit("all_users", {users: usersInThisRoom});
    });

   
    socket.on("disconnect", () => {
        console.log(`[${socketToRoom.get(socket.id)}]: ${socket.id} exit`);
        if(!socketToRoom.get(socket.id)){
            socket.to(socket.id).emit(`There's no room ${socket.id} where exists`);
            return;
        }
        const roomID: string | undefined = socketToRoom.get(socket.id)!;
        let room = users.get(roomID);
        if (room) {
            room = room.filter(user => user.id !== socket.id);
            users.set(roomID,room);
            if (room.length === 0) {
                users.delete(roomID);
                return;
            }
        }
        socket.to(roomID).emit("user_exit", { id: socket.id });
        console.log(users);
    });
});

server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });

const mongodbUri = process.env.MONGO_URI || "";

mongoose.Promise = Promise;
mongoose.connect(mongodbUri);
mongoose.connection.on('connection', () => console.log("Connected"));
mongoose.connection.on('error', (error: Error) => console.log(error));

