const Course=require("../model/Course")
const Lecture=require("../model/Lecture")

const User=require('../model/User')


exports.createLecture=async (req,res)=>{
   
try{
console.log("Solsu  de");
const {courseId,userId,creationDate,
    creationMonth,
    creationYear,
    creationHours,
    creationMinutes,
    creationDayOfWeek}=req.body;

console.log("creationMinutes",creationMinutes);


if(!courseId)
{

    return res.status(400).json({


        success:false,
        message:"Course Id is required,send it from frontend"
    })
}


var oldoldCourse=await Course.findById(courseId);

console.log(oldoldCourse);


if(oldoldCourse.enrollStudent.length==0){
    return res.status(500).json({

        success:false, 
        message:"No Student enrolled yet..."
    })
}

//create a lecture


let lecture=await Lecture.create({courseId})


lecture=await Lecture.findByIdAndUpdate(lecture._id,{

    createDate:creationDate,
    createYear:creationYear,
    createMonth:creationMonth,

    createHour:creationHours,
    createMinute:creationMinutes,

    createDay:creationDayOfWeek



}, {new:true})




//update the course with the lecture id
var oldcourse=await Course.findByIdAndUpdate(courseId, {

$push:{

    lectures:lecture._id
}
    
}, {new:true}).populate("enrollStudent");





if(!oldcourse)
{

    return res.status(400).json({

        success:false,
        message:"No course is found with the given Courseid"
    })
}
console.log("User id is",userId);
let user=await User.findById(userId).populate("enrolledCourses");

console.log("Lecture",lecture);
console.log("Course",oldcourse.enrollStudent[0].rollno);

var arr=oldcourse.enrollStudent.sort((a, b) => {return (b.rollno-a.rollno)});

console.log("arrr", arr)

var course=await Course.findByIdAndUpdate(courseId, {

$set:{


    enrollStudent:arr
}


}).populate("enrollStudent");




// console.log("new course",  course.enrollStudent)

return res.status(200).json({

    success:true,
    message:"Course Found in DB",

   course,

   lecture,

   user,

   
//    creationDate,
//    creationMonth ,

//    creationYear,

//    creationHours,

//    creationMinutes,
//    creationDayOfWeek,





})


}

catch(err)
{
    console.log(err)

    return res.status(500).json({

        success:false,
        message:"Error Occur while creating a Lecture"
    })



}




}




