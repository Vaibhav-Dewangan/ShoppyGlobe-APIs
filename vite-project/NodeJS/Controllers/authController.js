import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

// User registration 
export const register = async (req, res)=>{
    const{username, email, password } = req.body;
    try{
        const hashedPass = await bcrypt.hash(password,10);
        const user = new User({username, email, password: hashedPass });
        await user.save();
        res.json({message: 'User registered succesfully'});
    }catch (error) {
        res.status(500).json({ message: 'Error registering user' });
      }
};

// User login
export const login = async (req, res) => {
    try{
        const {email, password } = req.body;
        const user = await User.findOne({email}); // Find user by email
        if(!user) return res.status(404).json({ message: 'User not found' });

        // compare passwords 
        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({userId: user._id },"SecretKey" , {expiresIn: '30m'});
        res.status(200).json({token}); // send as response

    } catch (error) {
        res.status(500).json({ message: 'Error logging in user' });
      }


};


