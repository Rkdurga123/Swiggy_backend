const Firm=require("../models/Firm")
const Vendor=require("../models/Vendor")
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


const addFirm=async function(req,res) {
    try {
        const {firmname,area,category,region,offer}=req.body
        const image=req.file? req.fil.filename: undefined
        const vendor=await Vendor.findById(req.vendorId)
        if (!vendor){
            res.status(401).json({error:"Vendor not found"})
        }
        const firm=new Firm({firmname,area,category,region,offer,image,vedor:vendor._id})
        const savedFirm=await firm.save()
        vendor.firm.push(savedFirm)
        await vendor.save()
        res.status(200).json({
            message:"Firm added successfully"
        })
    } catch (error) {
        message:`${error.message}`
    }
}

const deletefirmById=async function(req,res) {
  try {
    const firmId=req.params.firmId
    const deletedFirm=await Firm.findByIdAndDelete(firmId)
    if (!deletedFirm){
        res.status(400).json({error:"Firm not found"})
    }
    res.status(200).json({message:"Deleted Successfully",deletedProduct})
} catch (err) {
    res.status(500).json({
        message:`${err.message}`,
        status:"Failure"
    })
}
}

module.exports={addFirm: [upload.single('image'),addFirm],deletefirmById}