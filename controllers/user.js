// Import for Auth
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

const secret = 'test';

export const signin = async (req, res) => {
  // Get the Email and Password from body.
  const { email, password } = req.body;

  try {
    // Get the User from database with the provided Email.
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User Does Not Exist!' });
    }

    // Check if password entered is correct using Bcrypt
    const validatePassword = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!validatePassword) {
      return res.status(400).json({ message: 'Password does not match!' });
    }

    // Send JSON Web token if correct credentials are entered.
    // This 'test' is a secret key. Research how you can do better security by moving it to .env etc.
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secret,
      { expiresIn: '1h' },
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log(error);
    // Send Error code 500 (Undefined server error);
    res.status(500).json({
      message: 'Something went wrong here (server/controllers/user.js)signIn',
    });
  }
};

export const signup = async (req, res) => {
  // Get information from body
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    // Check if user is already existing
    console.log('Called in Sign Up.');
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // Check if the passwords match.
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match...' });
    }

    // Hash the password for security - second parameter is 'salt' - level of 'difficulty'. Usually 12.
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('Hashed Password:', hashedPassword);
    console.log('Email: ', email);
    console.log('Password: ', password);

    // Create User
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    console.log('Result: ', result);

    // Create a token using the information from the created User.
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: '1h',
    });
    console.log('Token: ', token);

    res.status(201).json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something went wrong here (server/controllers/user.js)signUp',
    });
  }
};
