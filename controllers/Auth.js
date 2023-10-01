const User=require("../model/User")
const OTP=require("../model/OTP")

const otpGenerator=require("otp-generator")

const bcrypt=require("bcrypt")

const mailSender=require("../utils/mailSender")

const jwt=require("jsonwebtoken")

require("dotenv").config();

exports.sendOTP=async (req,res)=>{

try{

    console.log("Hello je")
    const {email}=req.body

    console.log("...............",email)

    const checkUserPresent=await User.findOne({email})


    if(checkUserPresent)
    {

        return res.status(401).json({

            success:false,
            message:"User Already Exiist"


        })
    }

    //generate otp



    var otp=otpGenerator.generate(6,{

        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false


    })


    let result=await OTP.findOne({otp:otp})

    console.log("OTP", otp);

    while(result)
    {
        otp=otpGenerator.generate(6,{

            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
    
    
        })
    
        result=await OTP.findOne({otp:otp})
    }


    const otpPayload={email,otp}

    const otpBody= await OTP.create(otpPayload)


    console.log("otpbo......",otpBody)

    res.status(200).json({

        success:true,
        message:"OTP sent successfully",
        otp


    })

}
catch(err)
{


    console.log(err)


    return res.status(500).json({

        success:false,
        message:err.message

        
    })
}





}


exports.signUp=async (req,res)=>{

try{

    const{

       rollno, firstName,
            lastName, email, password, confirmPassword, accountType,
            otp

    }=req.body


    if(!firstName || !lastName || !email || !password || !confirmPassword || !otp)
    {

        return res.status(403).json({
        
            success:false,
            message:"All the field required"
        })
    }


    if(password!==confirmPassword)
    {
       return res.status(400).json({

        success:false,
        message:"password and confirmpassword mismatch"
        
       }) 
    }

    const existingUser=await User.findOne({email})

    if(existingUser)
    {
        return res.status(400).json({

            success:false,
            message:"User already Registered"

        })
    }

    // check for instructor


    if(accountType==="Instructor")
    {
    const insToken=req.body.insToken;
console.log(insToken);
        // check token

        if(process.env.INSTRUCTOR_TOKEN!==insToken)
        {

            return res.status(400).json({


                success:false,
                message:"Instructor token is invalid"
            })
        }

    }


 const recentOtp=await OTP.find({email}).sort({createdAt:-1})
console.log(recentOtp);
if(recentOtp.length===0)
{
    return res.status(400).json({

        success:false,
        message:"OTP not found in database"
    })
}

else if(otp!==recentOtp[0].otp)
{
    return res.status(400).json({


        success:false,
        message:"Otp is mismatching"
    })
}

console.log("de r ");
const hashpassword=await bcrypt.hash(password,10)

const user=await User.create({

    firstName,
    lastName,
    email,
    accountType,
    rollno,  
    password:hashpassword,

})


// console.log("recentOtp..........",recentOtp)

// const deletotp=await OTP.findOneAndDelete(recentOtp.otp,{new:true});

// console.log("Soldu frfrfr",deletotp);

return res.status(200).json({


    success:true,
    message:"User is registered successfully",
   user
})

}

catch(err)
{

    console.log(err)

    return res.status(500).json({


        success:false,
        message:"Error in signup"

    })



}



}

exports.login=async (req,res)=>{
    
try{

    const {email, password}=req.body

    if(!email || !password)
    {

        return res.status(403).json({

            success:false,
            message:"All the fields are required"


        })
    }


    let user=await User.findOne({email}).populate("enrolledCourses");

    console.log(".....user",user)

    if(!user)
    {

        return res.status(404).json({

            success:false,
            message:"User is not registered, plase sign up first",



        })
    }
    

    if(await bcrypt.compare(password, user.password))

    {


        const payload={

            email:user.email,
            accountType:user.accountType,   
            id:user._id
        }


        const token=jwt.sign(payload,process.env.JWT_SECRET)
        const newUser=await User.findOneAndUpdate({email},{token},{new:true});
        user.token=token,
        user.password=undefined

        const options={

            expires:new Date(Date.now()+3*24*60*60*1000)
        }

        res.cookie("token", token, options).status(200).json({

            success:true,

            token,
            user,

            message:"Logged in successfully"

        })
    }

    else{

        return res.status(401).json({

            success:false,
            message:"Password is incorrect"
        })
    }
}

catch(err)
{
    console.log(err)

    return res.status(500).json({



        success:false,
        message:"Login Failure, please try again "


    })


}

}








exports.deleteAccount=async(req,res)=>{

    try{
    
        const {userId}=req.body
    
    
        const user=await User.findById(userId)
    
        if(user.enrolledCourses.length>0 || user.presentClasses.length>0 )
        {
    
            return res.status(400).json({
    
                success:false,
                message:"User Can not deleted, because already enrolled in courses and also attends lectures"
    
            })
        }
    
    
        await User.findByIdAndDelete(userId)
    
    
        return res.status(200).json({
    
    
            success:true,
            message:"User Deleted Successfully"
        })
    
    
    }
    
    
    catch(err)
    {
    
        console.log(err)
    
    
        return res.status(500).json({
    
    
            success:false,
            message:"User is not deleted"
        })
    }
    
    
    }
    
    



