const Vendor=require("../models/Vendor")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt") // to change the passwords into # to secure it
const dotenv=require("dotenv")
dotenv.config()
const secretKey=process.env.whatisyourname

const vendorRegister=async function(req,res){
    const {username,email,password}=req.body
    try{
     const vendorEmail=await Vendor.findOne({email})
     if (vendorEmail){
        return res.status(400).json({
            message:"Email already taken"
        })
     }
    const hashedPassword=await bcrypt.hash(password,10)
    const newVendor=new Vendor({
        username,
        email,
        password:hashedPassword
    })
    await newVendor.save()
    res.status(201).json({
        message:"Vendor Registered Successfully",
        status:"Success",
        newVendor
    })
    console.log("Registered")
    }catch(err){
        res.status(500).json({
            message:`${err.message}`,
            status:"Failure"
        })
    }
}

const vendorLogin=async function(req,res) {
    const {email,password}=req.body 
    try{
        const vendor=await Vendor.findOne({email})
        if (!vendor || !(await bcrypt.compare(password,vendor.password))){  // when ever we are comparing the password it will take some time that's why use await
      return res.status(401).json({
        message:"Invalid username or password"
      })
        } 
        const token=jwt.sign({vendorId:vendor._id},secretKey,{expiresIn:"1h"})
        res.status(200).json({
            message:"Login successfully",
            token
        })
        console.log(token)
    }catch(err){
        res.status(500).json({
            message:`${err.message}`,
            status:"Failure"
        })
    }
}

const getAllVendors=async function(req,res) {
    try {
        const vendors=await Vendor.find().populate('firm') // we used populate to get the details of the all vendors along with firm details
        res.status(200).json({vendors})
        
    } catch (err) {
        res.status(500).json({
            message:`${err.message}`,
            status:"Failure"
        })
    }
}

const getVendorById=async function(req,res) {
    const vendorId=req.params.id
    try {
        const vendor=await Vendor.findById(vendorId)
        if (!vendor){
            return res.status(404).json({error:"Vendor Not Found"})
        }
        res.status(201).json({
            message:"Vendor details displayed below",
            status:"Success",
            vendor
        })
    } catch (err) {
        res.status(500).json({
            message:`${err.message}`,
            status:"Failure"
        })
    }
    
}
module.exports={vendorRegister,vendorLogin, getAllVendors, getVendorById}