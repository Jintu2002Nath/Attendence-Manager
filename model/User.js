const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({

    firstName:{

        type:String,
        required:true,
        trim:true
    },

    lastName:{

        type:String,
        required:true,
        trim:true

    },

    email:{


        type:String,
        required:true,
        trim:true
    },


    password:
    {

        type:String,
        required:true,
    }, 


    accountType:{



        type:String,
        required:true,

        enum:["Student", "Instructor"]
    },

    resetToken:{
        type:String,
    }   
         
    ,
    resetPasswordExpires:{
        type:Number
    }

    ,

    enrolledCourses:[

        {

            type:mongoose.Schema.Types.ObjectId,

            ref:"Course"
        }


    ],


    presentClasses:[

        {

            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],


    token:{

        type:String

    },


    rollno:{
        type:Number
    }
    


},
{timestamps:true}

)



module.exports=mongoose.model("User", userSchema)