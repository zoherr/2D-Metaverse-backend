import {app} from "./app.js"
import connectDb from "./utils/connectDb.js"
import "dotenv/config"

app.listen(process.env.PORT,()=>{
    connectDb();
    console.log("Server is running!!");
})
