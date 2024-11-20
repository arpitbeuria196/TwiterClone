const express = require('express');
const connectDB = require('./config/dbconfig');

const app = express();

const authRouter = require("./routes/authRouter");

app.use("/auth",authRouter);


connectDB().then(()=>
{
    console.log("MongoDB connection started");
    app.listen(8000,()=>{
        console.log("App is running at port number 8000");
    })
}).catch((error)=>
{
    console.error("MongoDB connection failed:", error);
})


