import mongoose from "mongoose";

export const databaseConnection = async ()=>{
    try {
        const connectionDB = await mongoose.connect(process.env.MONGODB_URI,{dbName:"Chat-App"})
        console.log(connectionDB.connection.host)
        
    } catch (error) {
        console.error(error?.message || "DataBase Connection Error");
        throw new Error(error?.message);
    }
}

