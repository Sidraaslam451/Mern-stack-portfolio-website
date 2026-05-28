import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

export const register = async (req, res) => {
  try {
    console.log("Register hit hua!", req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Naam, email aur password sab zaroori hain!",
      });
    }
    const existingUser = await User.findOne({ email });
    // console.log("Existing user check:", existingUser);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Yeh email already registered hai!",
      });
    }
    const user = await User.create({ name, email, password });
    // console.log("User bana:", user);
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Admin account ban gaya! 🎉",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
    } catch (error) {
    console.log("❌ Register Error:", error.message, error.stack);
    res.status(500).json({ success: false, message: error.message });
  }
  };
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email aur password dono zaroori hain!",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email ya password galat hai!",
        // ⚠️ "Email nahi mila" mat likho — security risk hai
      });
    }
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Email ya password galat hai!",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login ho gaye! 👋",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getMe = async (req, res) => {
  try {
    // req.user auth.middleware ne set kiya tha
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
