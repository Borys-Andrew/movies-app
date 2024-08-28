import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import AuthController from './controllers/auth.js';
import MovieController from './controllers/movie.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = 8080;
const { DB_HOST } = process.env;
const app = express();

app.use(cors());
app.use(express.json());
// app.use('/', (req, res) => {
//   res.send('Hello World!');
// });

app.use('/auth', AuthController());
app.use('/movie', MovieController());

mongoose
  .connect(DB_HOST)
  .then(() => console.log('DB conected successfully'))
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server is running on port http://localhost:${PORT}`);
    }),
  )
  .catch((error) => console.log(error.message));
