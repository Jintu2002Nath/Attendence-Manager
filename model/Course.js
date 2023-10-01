const mongoose=require("mongoose");

const courseSchema=new mongoose.Schema({

    courseName:{

        type:String,
        required:true,
    },

    lectures:[

        {

         type:mongoose.Schema.Types.ObjectId,
         ref:"Lecture"

        }   

    ],


    enrollStudent:[

        {

            type:mongoose.Schema.Types.ObjectId,

            ref:"User"
            
        }


    ],



    token:{

        type:String,
        required:true,
    }


    






})


module.exports=mongoose.model("Course", courseSchema)