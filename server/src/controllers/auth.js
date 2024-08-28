// import mongoose from "mongoose";
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import express from 'express';
import { auth } from '../middleware/auth.js';

dotenv.config();

export const { ACCESS_TOKEN_SECRET } = process.env;
const { REFRESH_TOKEN_SECRET } = process.env;

export default () => {
  const router = express.Router();
  // router.use(auth middleware) // movies

  router.post('/register', async (req, res) => {
    try {
      const { userName, email, password } = req.body;
      console.log(userName, email, password);
      const hashPassword = bcrypt.hashSync(password, 10);

      const user = new User({
        email,
        password: hashPassword,
        userName,
      });

      await user.save();

      res
        .status(201)
        .json({ message: `User ${userName} created successfully` });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        res.status(401).send({ message: 'Email not found' });

        return;
      }

      if (!bcrypt.compareSync(password, user.password)) {
        res.status(401).send({ message: 'Password is wrong' });

        return;
      }

      res.status(200).send({
        message: 'Loget in successfully',
        userId: user._id,
        userName: user.userName,
      });

      // Create JWTs
      // const payload = {
      //   _id: user._id,
      // };

      // const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      //   expiresIn: '1h',
      // });

      // const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      //   expiresIn: '12h',
      // });

      // // Update user (add hashed refresh token)
      // await User.findByIdAndUpdate(user._id, { token: refreshToken });

      // // Set cookie hashed token
      // res.cookie('jwt', refreshToken, {
      //   httpOnly: true,
      //   maxAge: 12 * 60 * 60 * 1000,
      // });
      // res.send({ accessToken });
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  });

  router.get('/me', auth, async (req, res) => {
    res.send(req.user);
  });

  return router;
};
