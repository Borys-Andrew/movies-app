import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();

const { ACCESS_TOKEN_SECRET } = process.env;

export const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      res.status(401);
    }

    try {
      const { _id } = jwt.verify(token, ACCESS_TOKEN_SECRET);
      const user = await User.findById(_id);

      if (!user) {
        return res.status(401);
      }

      req.user = {
        _id: user._id,
        userName: user.userName,
        email: user.email,
      };
      next();
    } catch (error) {
      error.status(401);
      throw error;
    }
  } catch (error) {
    next();
  }
};
