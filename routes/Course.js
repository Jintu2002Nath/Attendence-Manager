const express=require('express')
const{auth, isInstructor,isStudent}=require("../middlewares/auth")
const router=express.Router()


const{createCourse,joinCourse,showallLecture,userDeletefromCourse, regenerateToken,showallCourse}=require("../controllers/createCourse")

const{createLecture}=require('../controllers/createLecture')


router.post("/createcourse", auth,isInstructor, createCourse)
router.post("/joincourse",auth,isStudent, joinCourse)

router.post("/showallcourse",auth,showallCourse)

router.post("/createlecture",createLecture)


router.post("/showlecture",showallLecture)

router.post("/regenerateToken", regenerateToken);

router.post('/userDeletefromCourse',userDeletefromCourse)


module.exports=router;