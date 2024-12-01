import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        maxLength: 7
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true
    },
    profileImage: {
        type: String
    }
}, { timestamps: true });

const User = mongoose.model("User",userSchema);
export default User;
