import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_CONNECTION_URL)
        .then(()=> {
            console.log("MONGOODB CONNECTED");
            
        })
    } catch (error) {
        console.log("mongoodb connection error" , error);
    }
}