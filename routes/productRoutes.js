const express=require("express")
const productController=require("../controllers/productController")
const router=express.Router()

router.post("/add-product/:firmId",productController.addProduct)
router.get("/:firmId/products",productController.getProductByFirm)
router.delete("/:productId",productController.deleteProductById)


router.get("/uploads/:imageName",function(req,res){
    try {
        const imageName=req.params.imageName
        res.headersSent('content-type','image/jpeg')
        res.sendFile(Path2D.join(__dirname,"..","uploads",imageName))
    } catch (error) {
        
    }
})


module.exports=router