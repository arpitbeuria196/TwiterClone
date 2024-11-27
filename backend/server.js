import express from 'express';
import connectDB from './config/dbconfig.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRouter.js';
import postRouter from './routes/postRouter.js';

const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
  }));
  
  // Add a simple logger for CORS preflight checks
  app.use((req, res, next) => {
    console.log('CORS Request Origin:', req.headers.origin);
    next();
  });
  
// Routes setup
app.use("/auth", authRouter);
app.use("/post",postRouter);

// Connect to MongoDB and start the server
connectDB().then(() => {
    console.log("MongoDB connection started");
    app.listen(8000, () => {
        console.log("App is running at port number 8000");
    });
}).catch((error) => {
    console.error("MongoDB connection failed:", error);
});
