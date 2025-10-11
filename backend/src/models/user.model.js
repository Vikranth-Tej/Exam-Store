import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true,
            match: /^[a-zA-Z0-9._%+-]+@student\.nitw\.ac\.in$/,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        profilePic: {
            type: String,
            default: "",
        },
    },
    {timestamps: true}
);

const User = mongoose.model("User", userSchema);

export default User;