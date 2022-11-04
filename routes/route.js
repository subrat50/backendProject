const express=require("express")
const router=express.Router()
const contactController=require("../controller/controller.js")

router.post("/createContact", contactController.createContact )

router.get("/getContact/:contactId", contactController.getContact )
router.put("/updateContact/:contactId", contactController.updateContact )
router.delete("/deleteContact/:contactId", contactController.deleteContact )
module.exports=router;