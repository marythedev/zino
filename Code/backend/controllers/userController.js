/***********************************************
 *                                              *
 *   This File handles user account creation    *
 *                                              *
 ***********************************************/
const bcrypt = require("bcrypt");
const User = require("../models/User");

//Import jwt
const jwt = require("jsonwebtoken");

//Password rules:
const min = 12; //min length
const max = 18; // max length

function validatePassword(password) {
  return password.length >= min && password.length <= max;
}

//Help prevent noSQL injecton via validation regex
function validateUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  return usernameRegex.test(username);
}

//Help prevent noSQL injecton via validation regex
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

async function createUser(req, res) {
  const { username, email, password } = req.body;
  try {
    // Check if username and email are provided

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email, and password are required" });
    }

    // Validate username (no symbols)
    if (!validateUsername(username)) {
      return res
        .status(400)
        .json({ message: "Username cannot contain symbols" });
    }

    // Validate username (no symbols)
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate password (minimum length)
    valid = validatePassword(password);
    if (valid == false) {
      return res.status(400).json({
        message:
          "Password must be between " +
          min +
          " and " +
          max +
          " characters long",
      });
    }

    // Check DB: if username is already taken
    let existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // Check DB: if email is already registered
    existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const hashedPW = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPW,
    });

    //save to DB
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function loginUser(req, res) {
  const { username, password } = req.body;

  // Find the user by username
  let user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Compare password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Generate a token
  const token = jwt.sign(
    { userId: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token });
}

module.exports = {
  createUser,
  loginUser,
};
