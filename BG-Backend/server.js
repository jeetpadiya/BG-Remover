import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongoDB.js';
import userRouter from './routes/userRoute.js';
import imageRouter from './routes/ImagesRoute.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept'
  ]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);
app.use('/api/images', imageRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
