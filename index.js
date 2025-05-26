const express=require("express")
const dotenv=require("dotenv")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const vendorRoutes=require("./routes/vendorRoutes")
const firmRoutes=require("./routes/firmRoutes")
const productRoutes=require("./routes/productRoutes")
const path=require("path")
const app=express();
app.use(bodyParser.json())

dotenv.config()
const {MONGO_URL,PORT}=process.env


mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("Mongoose connected successfully")
})
.catch((err)=>{
    console.log(`${err.message}`)
})


app.use("/vendor",vendorRoutes)
app.use("/firm",firmRoutes)
app.use("/product",productRoutes)
app.use("/uploads",express.static('uploads'))  // standard format
 
app.use("/home",(req,res)=>{
   res.send("<h1>  Welcome to Suby")
})
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})