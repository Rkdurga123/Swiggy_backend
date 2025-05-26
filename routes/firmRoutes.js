const express=require("express")
const firmController=require("../controllers/frimController")
const verifyToken=require("../middlewares/verifyToken")

const router=express.Router()

    router.post("/add-firm",verifyToken,firmController.addFirm)
    router.delete("/:firmId",firmController.deletefirmById)

    router.get("/uploads/:imageName",function(req,res){
        try {
            const imageName=req.params.imageName
            res.headersSent('content-type','image/jpeg')
            res.sendFile(Path2D.join(__dirname,"..","uploads",imageName))
        } catch (error) {
            
        }
    })

module.exports=router