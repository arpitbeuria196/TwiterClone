import express from 'express';
import connectDB from './config/dbconfig.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRouter.js'; // Ensure path is correct

const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Routes setup
app.use("/auth", authRouter);

// Connect to MongoDB and start the server
connectDB().then(() => {
    console.log("MongoDB connection started");
    app.listen(8000, () => {
        console.log("App is running at port number 8000");
    });
}).catch((error) => {
    console.error("MongoDB connection failed:", error);
});
