import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// for sign up *********************************************************
export const signUp = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Check, user is exists user in db
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password before saving for security
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User sign Up successfully. Please sign in..." });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// // //

// export const signIn = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // compare password if username is correct
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // generate jwt token if username & password are correct
//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "5h" }
//     );

//     res.status(200).json({
//       message: "Sign-in successful",
//       token, // Send the token back to the front-end
//       role: user.role, // Return the user's role
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };
// signin logic

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role }, // include role in token
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    res.status(200).json({
      message: "Sign-in successful",
      token, // Send the token back to the frontend
      role: user.role, //  role in the response
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
