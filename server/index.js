import express from "express"
import connectDb from "./config/db.js"
import colors from "colors"
import dotenv from "dotenv";
import userRoutes from "./router/user.js";
import cors from 'cors'
const PORT = process.env.PORT || 8080
const app = express()

//configure env
dotenv.config();

//database config
connectDb();

// cors 
app.use(cors());

// middleware 
app.use(express.json())

app.get("/" , (req,res)=>{
    res.send("api is running")
})
// routes
app.use("/api/v1" , userRoutes)

app.listen(PORT , (error)=>{
    console.log(`app is running on port ${PORT}`.bgGreen.white)
})
