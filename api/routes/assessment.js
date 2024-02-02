const router = require("express").Router()
const {
    createAssessment,
    getAssessments,
    updateAssessments,
    deleteAssessments,
    
  } = require("../controllers/assesmentController"); 
const { verifyToken } = require("./verifyToken");

router.post("/create",verifyToken ,createAssessment);
router.get("/:id",verifyToken ,getAssessments);
router.put("/update/:id",verifyToken ,updateAssessments);
router.delete("/delete/:id",verifyToken ,deleteAssessments);


module.exports=router;
