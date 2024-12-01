import mongoose from "mongoose";
import "dotenv/config"
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL).then(() => {
            console.log("Database Connected!!");
        })
    } catch (error) {
        console.log(error);
    }
}
export default connectDb;
