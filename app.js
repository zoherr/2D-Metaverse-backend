import express from "express";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.js";
export const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(userRouter);
app.use(errorMiddleware);

app.get("/",(req,res)=> {
    res.send("Testing!!");
})
