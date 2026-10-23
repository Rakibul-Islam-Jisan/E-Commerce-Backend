require("node:dns").setServers(["1.1.1.1"], ["8.8.8.8"]);
const express = require('express')
require('dotenv').config()
const cors = require('cors');
const connectDB = require("./config/ConnectDB");
const { userMiddleware, adminMiddleware, vendorMiddleware } = require("./middlewares/roleWiseMiddlewares");
const app = express()
app.use(express.json())

const authinticationRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes')
const adminRouter = require('./routes/adminRoutes')
const vendorRouter = require('./routes/vendorRoutes')
app.use(cors());
app.use("/api/v1/auth",authinticationRouter)
app.use('/api/v1/user',userMiddleware,userRouter)
app.use('/api/v1/admin',adminMiddleware,adminRouter)
app.use('/api/v1/vendor',vendorMiddleware,vendorRouter)

connectDB()

app.listen(process.env.PORT,()=>{
    console.log("Server is Running");
    
})