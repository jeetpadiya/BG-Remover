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
const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
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
