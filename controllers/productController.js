const Product=require("../models/Product")
const Firm=require("../models/Firm")
const multer=require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // folder where images will be stored
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // unique filename with original extension
    }
  });
  const upload = multer({storage: storage})

  const addProduct=async function(req,res) {
    try {
        const {productname, price,category, bestseller,description}=req.body
        const image=req.file? req.file.filename :undefined
        const firmId=req.params.firmId
        const firm=await Firm.findById(firmId)
        if (!firm){
            return res.status(401).json({error:"No Firm found"})
        }
        const product=new Product({productname, price,category, bestseller,description,image,firm:firm._id})
        const savedProduct=await product.save();
        firm.products.push(savedProduct) // products name sholud be we have  defined in firm model relation with product
        await firm.save()
        res.status(200).json({message:"Prduct added successfully"})
    } catch (err) {
        res.status(500).json({
            message:`${err.message}`,
            status:"Failure"
        })
    }
  }

  const getProductByFirm=async function(req,res) {
    try {
        const firmId=req.params.firmId
        const firm=await Firm.findById(firmId)
        if (!firm){
            return res.status(401).json({error:"No Firm found"})
        }
        const products=await Product.find({firm:firmId})
        const firmName=firm.firmname
        res.status(200).json({firmName,products})
    } catch (err) {
        res.status(500).json({
            message:`${err.message}`,
            status:"Failure"
        })
    }
  }

  const deleteProductById=async function(req,res){
    try {
        const productId=req.params.productId
        const deletedProduct=await Product.findByIdAndDelete(productId)
        if (!deleteProductById){
            res.status(400).json({error:"Product not found"})
        }
        res.status(200).json({message:"Deleted Successfully",deletedProduct})
    } catch (err) {
        res.status(500).json({
            message:`${err.message}`,
            status:"Failure"
        })
    }
    
  }
  module.exports={addProduct:[upload.single('image'),addProduct],getProductByFirm,deleteProductById}