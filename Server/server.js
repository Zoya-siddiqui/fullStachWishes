import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5001; // Use the port from environment variables

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB Connection error", error);
  });

import userRouter from './Controllers/user.js';

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.send("hello zoya");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
