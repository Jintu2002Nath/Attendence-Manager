
const User=require('../model/User')

const bcrypt=require("bcrypt")
const mailSender=require("../utils/mailSender")
const crypto=require("crypto")

const {passwordUpdated}=require("../templates/passwordUpdate")

const{successMessage}=require("../templates/successMessage")


exports.resetPasswordToken=async (req,res)=>{

    try{      
  
        const {email,path}=req.body

        const user=await User.findOne({email:email})

        if(!user)
        {
            return res.status(404).json({
                
                
                success:false,

                message:"Your mail is not registered with us"


            })



        }

        const resetToken=crypto.randomUUID();

        const updateDetails=await User.findOneAndUpdate({email:email},{resetToken:resetToken,resetPasswordExpires:Date.now()+5*60*1000}, {new:true})

        const url=`${path}/enterpassword/${resetToken}`

        console.log(url);

        await mailSender(email,"Password Reset LInk",passwordUpdated(url,user.firstName) )



        return res.status(200).json({


            success:true,
            message:"Email Sent successfully, check the email and change the password ",

        })

    }


    catch(err)
    {


        console.log(err)

        return res.status(500).json({


            success:false,
            message:"Something went wrong while reset the password token"
        })
    }




}



exports.resetPassword=async (req,res)=>{

    try{

        const {password,confirmPassword, resetToken}=req.body

        if(password!==confirmPassword)
        {

            return res.json({


                success:false,
                message:"Password is not matching"
            })
        }


        const userDetails=await User.findOne({resetToken:resetToken})

        console.log("old...", userDetails)

        if(!userDetails)
        {

            return res.json({


                success:false,
                message:"Not a valid token"
            })
        }


        //expire checking


        if(userDetails.resetPasswordExpires< Date.now())
        {
            return res.json({



                success:false,
                message:"Token time expired"
            })


        }


        const hashPassword=await bcrypt.hash(password,10)

      const newRes = await User.findOneAndUpdate({resetToken:resetToken},{password:hashPassword},{new:true})

      console.log("....newRes", newRes)
      console.log("update hol;l de")



      await mailSender(newRes.email,"Password Reset Successfully",successMessage(newRes.firstName))


        return res.status(200).json({


            success:true,
            message:'Password reset successful'
        })

    }

    catch(err)
    {
        console.log(err)
        return res.status(500).json({

         
            success:false,
            message:"Error in reset password"



        })


    }



}