const User=require("../model/User")

const Course=require("../model/Course");

const Lecture=require("../model/Lecture")


   
exports.attendence=async(req,res)=>{

    try{
    
    
        const {courseId, userId}=req.body;
    
        const user=await User.findById(userId)
        console.log("user...",user)
    
        if(!user)
        {
    
            return res.status(400).json({
    
    
    
                success:false,
                message:"User is not find by this id"
            })
        }

        const arrayStd=user.presentClasses

        console.log("....arraystd",arrayStd)
    
       let attendancelength= arrayStd.filter((e)=>e==courseId).length
        console.log("Attendance is",attendancelength);
       const course=await Course.findById(courseId)
    
       const lectureNumber=course.lectures.length
    
       var percentage;

      if(lectureNumber==0){
        percentage=0;
      }
      else{
         percentage= Math.floor((attendancelength/lectureNumber)*100)
      }
       
    
       return res.status(200).json({
    
            success:true,
            message:"Attendence calculated successfully",
            attendancelength,
            lectureNumber,
            percentage,
            
            
    
    
       })
    
    
    
    }
    
    catch(err)
    {
    
    
        console.log(err)
    
        return res.status(500).json({
    
            success:false,
            message:"There is error in attendence calculation"
    
    
            })
       
    }
    
    
    }


exports.updateAttendence=async(req,res)=>{

try{

    const {courseId, studentArray, lectureId }=req.body

    // console.log("courseId",courseId)
    // console.log("studentArray",studentArray)
    // console.log(typeof(studentArray[0]));
    // console.log("lectureId",typeof(lectureId))

    let i=0


    // update user attendence
    for(i=0; i< studentArray.length; i++)
    {
    
        const user= await User.findByIdAndUpdate(studentArray[i],{

        $push:{
    presentClasses:courseId }
        },

    {
        new:true
    })



    // const lecture=await Lecture.findByIdAndUpdate({_id:lecture},{


    //     $push:{

    //         studentAttend:studentArray[i]
    //     }
    // })


    }



    //update lecture attendence


    const updateResult = await Lecture.updateOne(
        { _id: lectureId },
        { $set: { studentAttend: studentArray } }
      );


      if (!updateResult) {
        console.log('Lecture student attendance updated successfully.');

        return res.status(400).json({  


            success:false,
            message:"Error in update array of lecture attedence"
        })
      }


      res.status(200).json({


        success:true,
        message:"Update the attendence successfully"

      })






}

catch(err)
{
    console.log(err)

    return res.status(500).json({

        success:false,
        message:"Error in Updation of Attendence "


    })


}



}

