import bcrypt from 'bcrypt';
import User from '../model/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../model/token.js';

dotenv.config();

export const signUpUser = async (request, response) => {
    try {
        // Destructure the user fields from the request body
        const { name, email, password } = request.body;  //^^ username
        
        // Check if all required fields are present
        if (!name || !email || !password) {              //^^ username
            return response.status(400).json({ msg: "All fields are required" });
        }
        
        // Check if a user with the provided username already exists
        const existingUser = await User.findOne({ email }); //^^ username
        if (existingUser) {
            return response.status(409).json({ msg: "Email already registered" });
        }
        
        // Hashing password.
        // const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        // Create a new user with the provided data
        const newUser = new User({
            name,
            email,                                      //^^ username
            // password  // Add your password field directly (no hashing for now)
            password:hashedPassword // storing the hashed password
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with a success message
        return response.status(201).json({ msg: 'Sign-Up Successful' });
    } catch (error) {
        // console.error("Error during sign-up:", error);
        console.error("Error during sign-up :", error.message, error.stack);

        return response.status(500).json({ msg: 'Error While Sign-Up ' });
    }
}

export const loginUser = async (request, response) => {
    let user = await User.findOne({ email: request.body.email});
    if(!user){
        return response.status(400).json({ msg: 'Email does not match'});
    }
    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if(match)
        {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

           const newToken = new Token({ token: refreshToken});
           await newToken.save();

           return response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, email: user.email});
        }
        else{
           return response.status(400).json({msg: 'Password does not match'});
        }
    } catch (error) {
        return response.status(500).json({msg: 'Error while login in user'});
    }
    
}