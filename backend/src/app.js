// In app.js server is created and it should be added in the src folder

const express = require('express')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth.routes')
const foodItemRouter = require("./routes/foodItem.routes")
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.get("/",(req,res)=>{
    res.send("Hello world")
})

app.use("/api/auth",authRouter)
app.use("/api/food-item",foodItemRouter)


module.exports = app