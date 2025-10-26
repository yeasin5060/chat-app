import express from "express";
import cors from "cors"


const app = express()

app.use(express.json({limit : "4mb"}));
app.use(express.urlencoded({limit : "4mb" , extended:true}));
app.use(express.static("./public"));

app.use(cors({
    origin : "*"
}))

//import all routes
import userRoute from './routes/user.route.js'

app.use("/api/v1/user" ,userRoute);

export {app}