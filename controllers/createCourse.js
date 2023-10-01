const Course=require("../model/Course")
const crypto=require("crypto")

const User=require("../model/User")

exports.createCourse=async(req,res)=>{

try{



    const {courseName}=req.body

    if(!courseName)
    {
        return res.status(400).json({

            success:false,
            message:"Course Name is mandatory"


        })
    }

    const courseToken=crypto.randomUUID()


    const newCourse=await Course.create({courseName, token:courseToken})

    //newcourse 

    console.log("newcourse", newCourse)
    console.log(".....id",req.user.id)
    const updateUser=await User.findByIdAndUpdate({_id:req.user.id},{


        $push:{

            enrolledCourses:newCourse._id
        }
    }, {new:true} ).populate("enrolledCourses");

    console.log("update user after course creation",updateUser)
    
    return res.status(200).json({


        success:true,
        message:"Course Created successfully",

        newCourse,

        updateUser
    })

}

catch(err)
{

    console.log(err)


    return res.status(500).json({


        success:false,
        message:"Error in course creation"

       


    })
}



}

exports.joinCourse=async(req,res)=>{

    try{

        const{courseToken}=req.body

        const id=req.user.id
        console.log("...id", id)

        if(!courseToken)
        {
            return res.status(402).json({

                success:false,
                message:"Please provide the courseToken"


            })
        }


        const existingCourse=await Course.findOne({token:courseToken})

        if(!existingCourse)
        {
            return res.status(400).json({

                success:false,
                message:"There is no course with corresponding courseToken"


            })

        }

        //check before if student join already


        if(existingCourse.enrollStudent.includes(req.user.id))
        {

            return res.status(400).json({

                success:false,
                message:"User already enrolled the specific course"
            })
        }

        // update the student enrolled
        const updateCourse=await Course.findOneAndUpdate({token:courseToken},
            
            {

                $push:{

                    enrollStudent:id

                }
            },

            {
                new:true
            }
            
            
            )


        
        //Update the course enroll of the User also    
        


        const user=await User.findByIdAndUpdate({_id:id},{




            $push:{

                enrolledCourses:updateCourse._id
            }
        }, {new:true}).populate("enrolledCourses")



        return res.status(200).json({

            success:true,
            message:"User joined successfully",
            updateCourse,
            user



        })



    }
    catch(err){
        console.log(err)

        return res.status(500).json({

            success:false,
            message:"Course joininig error"


        })

    }



}



exports.showallCourse=async(req,res)=>{

try{

    const id=req.user.id;
    if(!id)
    {

        return res.status(400).json({

            success:false,
            message:"No user id come from authentication"
        })
    }

    const user=await User.findById(id)

    if(!user)
    {

        return res.status(403).json({


            success:false,
            message:"No valid user found with this id"
        })
    }


    return res.status(200).json({

        success:true,
        message:"Share all details of user",
        user

    })
    
   

} 

catch(err)
{

console.log(err)

return res.status(500).json({

    success:false,
    message:"Error in showing all courses"


})


}


}











exports.showallLecture=async(req,res)=>{

    try{

        const {courseId}=req.body

        const oldcourse=await Course.findById(courseId).populate('lectures')
                                                    .populate('enrollStudent');


        if(!oldcourse)
        {
            return res.json({


                success:false,
                message:"courdse not found"
            })
        }

        // console.log("Course............................",oldcourse.enrollStudent        );

        const arr=oldcourse.enrollStudent.sort((a,b)=>{return (b.rollno-a.rollno)});

        const course=await Course.findByIdAndUpdate(courseId,{

            $set:{

                enrollStudent:arr
            }
        }, {new:true}).populate('enrollStudent').populate('lectures');


        return res.status(200).json({


            success:true,
            message:"Lecture are populate",
            course
        })


    }

    catch(err)
    {
        console.log(err)

        return res.status(500).json({

        })



    }




}










exports.regenerateToken=async (req,res)=>{

    try{
    
    
        const {courseId}=req.body
        console.log("Cousrseid",courseId.id);
        var nnewToken= crypto.randomUUID();

    
        const updateCourse=await Course.findByIdAndUpdate(courseId.id, {
    
            
    
                token:nnewToken
            
        }, {new:true})
  if(!updateCourse){
    return res.status(404).json({
    
        success:false,
        message:"Error in regenerate course token",

        

})
  }
var newToken=nnewToken;

        return res.status(200).json({
    
            success:true,
            message:"Token regenerate successfully",
            newToken,
            updateCourse
        })
    
    
    }
    
    
    catch(err)
    {
    
        console.log(err)
    
        return res.status(500).json({
    
                success:false,
                message:"Error in regenerate course token",
    
                
    
        })
    }
    
    
    }



    exports.userDeletefromCourse=async (req,res)=>{


        try{
        
            const {courseId, userId}=req.body

            console.log("userId",userId);
            console.log("courseId",courseId);
        
            const updateCourse=await Course.findByIdAndUpdate(courseId, {
        
                $pull:{
        
                    enrollStudent:userId
                }
            }, {new:true})
        
        
            const updateUser=await User.findByIdAndUpdate(userId, {$pull:{
        
                    enrolledCourses:courseId
        
            }
        
        }, {new:true})
        
        
        
        return res.status(200).json({
        
            success:true,
            message:"User deleted Successfully from the course",
        
            updateCourse,
            updateUser
        })
        
        
        }
        
        catch(err)
        {
        
            console.log(err);
            console.log("Error in User deleted from the course ")
        
            return res.status(500).json({
        
                success:false,
        
                message:"Error in User deleted from the course"
            })
        }
        
        
        }