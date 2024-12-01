import User from "../models/user.models.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import ErrorHandler from "../utils/errorHandler.js"

export const userRegister = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return next(new ErrorHandler("Please provide all required details", 400));
        }

        const isUsernameExist = await User.findOne({ username });
        const isEmailExist = await User.findOne({ email });
        if (isEmailExist || isUsernameExist) {
            return next(new ErrorHandler("User already exists with this email!", 400));
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRETKEY, { expiresIn: '7d' });

        res.cookie("usertoken", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 1 year
        });

        await user.save();

        res.status(200).json({
            success: true,
            message: "User registered successfully!"
        });
    } catch (error) {
        next(error)
    }
}

export const userGetInfo = async (req, res, next) => {
    try {
        const token = req.cookies?.usertoken;
        if (!token) {
            return next(new ErrorHandler("User not Authorized!!", 400))
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRETKEY);
        const user = await User.findById(decodeToken.userId);
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error)
    }
}

export const userLogout = async (req, res, next) => {
    try {
        const token = req.cookies?.usertoken;
        if (!token) {
            return next(new ErrorHandler("User already logout!!", 400));
        }
        res.clearCookie("usertoken");
        res.status(200).json({
            success: true,
            message: "User logout successfully!!"
        })
    } catch (error) {
        next(error);
    }
}

export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("Please provide all required details", 400));
        }
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorHandler("User not found!!", 400));
        }
        const isPassCorrect = await bcrypt.compare(password, user.password);
        if (!isPassCorrect) {
            return next(new ErrorHandler("Wrong password!!", 400));
        }
        const tokenData = {
            userId: user._id
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRETKEY, { expiresIn: '7d' });
        res.cookie("usertoken", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 1 year
        });

        res.status(200).json({
            success: true,
            message: "User Login successfully!!"
        })
    } catch (error) {
        next(error)
    }
}
