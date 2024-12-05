import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {           //^^ username
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

// Create the User model
const User = mongoose.model('User', userSchema);

export default User;
