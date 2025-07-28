import mongoose from "mongoose";

const conntctDB = async()=>{
    try{
            mongoose.connection.on("connected",()=>{
                console.log("DataBase is Connected")})
        
    await mongoose.connect(`${process.env.MONGODB_URI}/BG-Remover`)
    }
    catch(error){
            console.log(error);
    }
}
export default conntctDB;