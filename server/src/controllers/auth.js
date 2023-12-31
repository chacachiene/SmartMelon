import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      confirmPassword,
      picture,
      role,
      location,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !username ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const salt = await bcrypt.genSalt();
    if (password != confirmPassword) {
      return res.status(400).json({
        message: "Comfirm pass not right",
      });
    }
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      picture,
      username,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const data = req.body;

    const user = await User.findOne({ username: data.username });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
      });
    } else {
      console.log(`find ${user.username}`);
    }
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect Password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({
      token,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
