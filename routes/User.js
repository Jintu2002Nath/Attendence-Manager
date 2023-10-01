const express=require('express')

const router=express.Router()

const{sendOTP,signUp,login,deleteAccount}=require("../controllers/Auth")
const {attendence, updateAttendence}=require("../controllers/attendence")
const{resetPassword,resetPasswordToken}=require("../controllers/ResetPassword")

router.post("/login",login)
router.post("/signup",signUp)
router.post("/sendotp",sendOTP)

router.post("/resetpasswordtoken",resetPasswordToken)

router.post("/resetpassword", resetPassword)


router.post('/attendence', attendence);
router.post('/updateAttendence', updateAttendence);

router.post("/deleteAccount", deleteAccount)


module.exports=router