const mongoose=require("mongoose")
const mailSender = require("../utils/mailSender")

const otpTemplate=require("../templates/emailVerificationTemplate")
const User = require("./User")


const otpSchema=new mongoose.Schema({

    email:{

        type:String,
        required:true
    },


    otp:
    {
        type:String,
        required:true

    },

    createdAt:{

        type:Date,
        default:Date.now(),

        expires:10*60


    }






})



async function sendVerificationEmail(email,otp,name)
{

    try{

        // const user=await User.findOne({email})

        const mailResponse=await mailSender(email, 'OTP Email Verification',otpTemplate(otp,name))
        

        console.log("Email sent ", mailResponse)
    }

    catch(err)
    {
        console.log(err)
        console.log("Error occured while sending otp")

    }
}



otpSchema.pre("save", async function(next){





    await sendVerificationEmail(this.email, this.otp)
    next()
})


module.exports=mongoose.model("OTP", otpSchema)