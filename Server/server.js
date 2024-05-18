import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

const PORT = 5001;

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected to MongoDB");
}).catch((error)=>{
    console.error("MOngoDb Connection error", error);
})

import userRouter from './Controllers/user.js'; 


app.use('/api/users' , userRouter )

app.get('/', (req , res)=>{
    res.send("hello zoya");
});

app.listen(PORT , ()=>{
    console.log(`server is running on ${PORT}`);
} )
