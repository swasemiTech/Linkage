import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const register = async (req, res) => {
    try {
        const { name, email, password, username } = req.body;

        if (!name || !email || !password || !username) {
            return res.status(400).json({ Message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ Message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            username
        });

        await newUser.save();

        const profile = new Profile({
            userId: newUser._id,
        });
        await profile.save();
        return res.status(201).json({ Message: "User created successfully" });

    } catch (e) {
        return res.status(500).json({ Message: "Something went wrong in register controller : " + e.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ Message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ Message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ Message: "Invalid Credentials" });
        }

        const token = crypto.randomBytes(32).toString("hex");
        await User.updateOne({ _id: user._id, $set: { token } });

        return res.status(200).json({ Message: "User logged in successfully" });
    } catch (e) {
        return res.status(500).json({ Message: "Something went wrong in login controller : " + e.message });
    }
}
export const updateProfilePicture = async (req, res) => {
    const { Token } = req.body;

    try {
        const user = await User.findOne({ Token });
        if (!user) {
            return res.status(404).json({ Message: "User not found" });
        }

        user.profilePicture = req.file.filename;
        await user.save();

        return res.status(200).json({ Message: "Profile picture updated successfully" });
    } catch (error) {
        return res.status(500).json({ Message: "Something went wrong in updateProfilePicture controller : " + error.message });
    }
}

export const updateUserProfile = async (req, res) => {

    const { Token, ...newUserData } = req.body;
    try {

        const user = await User.findOne({ Token });

        if (!user) {
            return res.status(404).json({ Message: "User not found" });
        }
        //getting username and email from newUserData to check if user exists
        const { username, email } = newUserData;

        const exitingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (exitingUser) {
            //if user exists and user id is not the same then give error else let the user update the profile
            if (exitingUser && String(exitingUser._id) !== String(user._id)) {
                return res.status(400).json({ Message: "User already exists" });
            }
        }
        Object.assign(user, newUserData);
        await user.save();

        return res.status(200).json({ Message: "User updated successfully" });
    } catch (error) {
        return res.status(500).json({ Message: "Something went wrong in updateUserProfile controller : " + error.message });
    }
}

export const getUserAndProfile = async (req, res) => {
    const { Token } = req.query;
    try {
        const user = await User.findOne({ Token });
        if (!user) {
            return res.status(404).json({ Message: "User not found" });
        }
        const userProfile = await Profile.findOne({ userId: user._id })
            .populate("userId", "name username profilePicture");
        return res.status(200).json({ user, userProfile });
    } catch (error) {
        return res.status(500).json({ Message: "Something went wrong in getUserAndProfile controller : " + error.message });
    }
}