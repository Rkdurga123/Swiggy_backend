const Vendor=require("../models/Vendor")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()
const secretKey=process.env.whatisyourname

//middleware to verify jwt
const verifyToken=async function(req,res,next) {
    const token=req.headers.token 
    if (!token){
        res.status(401).json({error:"Token is required"})
    }
    try {
        const decodedToken=jwt.verify(token,secretKey)
        const vendor=await Vendor.findById(decodedToken.vendorId)
        if (!vendor){
            return res.status(404).json({error: "Vendor not found"})
        }
        req.vendorId=vendor._id
        next();
    } catch (err) {
        res.status(500).json({
            message:`${err.message}`,
            status:"Failure"
        })
    }
}

module.exports=verifyToken