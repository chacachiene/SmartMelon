import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    role: {
        type: String,
        default: "subscriber",
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    picture: {
        type: String,
        default: "/avatar.png",
    },
    location: {
        type: String,
    },
    stored: {
        type: Array,
        default: [],
    },

    // resetPasswordLink: {
    //     data: String,
    //     default: "",
    // },
    }, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;
