import express from "express";
import cors from "cors";
import {Server} from 'socket.io';
import http from 'http'


const app = express()

app.use(express.json({limit : "4mb"}));
app.use(express.urlencoded({limit : "4mb" , extended:true}));
app.use(express.static("./public"));

app.use(cors({
    origin : "*"
}));
const server = http.createServer(app);

//initialize socket.io sover
export const io = new Server(server , {
    cors : {origin : "*"}
});

//store online users
export const userSocketMap = {}; // {userId : socketId}
io.on('connection',(socket)=> {
    const userId = socket.handshake.query.userId;
    console.log('User Connection' , userId);
    if(userId){
        userSocketMap[userId] = socket.id;
    }
    //emit online usres to all connected client
    io.emit('getOnlineUsres' , Object.keys(userSocketMap));
    socket.on('disconnect', ()=> {
        console.log('User disconnect' , userId);
        delete userSocketMap[userId];
        io.emit('getOnlineUsres' , Object.keys(userSocketMap));
    })
});
//import all routes
import userRoute from './routes/user.route.js';
import messageRoute from './routes/message.route.js';

app.use("/api/v1/user" ,userRoute);
app.use("/api/v1/message" ,messageRoute);

export {app}